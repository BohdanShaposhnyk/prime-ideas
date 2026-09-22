/**
 * Builds web-ready c20 assets from the full-quality originals in assets-src/c20.
 * Outputs are committed and imported by the page; originals are never modified.
 *
 *   pnpm assets:c20
 *
 * Re-running always re-encodes from the originals, so tweaking quality here never
 * stacks compression on top of compression.
 */
import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'

const run = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcRoot = path.join(root, 'assets-src/c20')

const TARGETS = [
  { from: 'page', to: 'src/visions/candidates/c20-charge-split/assets' },
  { from: 'shared', to: 'src/assets/c20' },
]
const VIDEOS = [{ from: 'video/night-reel.mp4', to: 'src/assets/c20/night-reel.mp4' }]

/** Photos: WebP with full-res chroma so neon reds/blues keep crisp edges. */
const PHOTO = { quality: 82, effort: 6, smartSubsample: true }
/** Transparent PNG mockups: higher quality, lossless alpha so device edges stay clean. */
const ALPHA = { quality: 90, alphaQuality: 100, effort: 6, smartSubsample: true }
/** Per-file overrides (path relative to assets-src/c20) if banding shows up on a dark shot. */
const OVERRIDES = {}

/** Tiny files aren't worth a lossy pass. */
const COPY_BELOW_BYTES = 20 * 1024

/** H.264 for universal autoplay; CRF 23 is visually transparent for full-bleed background video. */
const VIDEO_ARGS = [
  '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '23',
  '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-an', '-movflags', '+faststart',
]

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  )
  return nested.flat()
}

const kb = (n) => `${Math.round(n / 1024)}KB`.padStart(7)
let totalIn = 0
let totalOut = 0

function report(rel, inBytes, outBytes, note = '') {
  totalIn += inBytes
  totalOut += outBytes
  const pct = Math.round((1 - outBytes / inBytes) * 100)
  console.log(`${rel.padEnd(70)} ${kb(inBytes)} -> ${kb(outBytes)}  ${String(pct).padStart(3)}% ${note}`)
}

async function processImage(file, outDir, srcDir) {
  const rel = path.relative(srcDir, file)
  const relFromRoot = path.relative(srcRoot, file).replaceAll('\\', '/')
  const ext = path.extname(file).toLowerCase()
  const { size } = await fs.stat(file)

  if (ext === '.svg' || (ext === '.png' && size < COPY_BELOW_BYTES)) {
    const out = path.join(outDir, rel)
    await fs.mkdir(path.dirname(out), { recursive: true })
    await fs.copyFile(file, out)
    report(relFromRoot, size, size, '(copied)')
    return
  }
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return

  const out = path.join(outDir, rel.slice(0, -ext.length) + '.webp')
  await fs.mkdir(path.dirname(out), { recursive: true })
  const options = { ...(ext === '.png' ? ALPHA : PHOTO), ...OVERRIDES[relFromRoot] }
  const info = await sharp(file).rotate().webp(options).toFile(out)
  report(relFromRoot, size, info.size)
}

async function processVideo({ from, to }) {
  const input = path.join(srcRoot, from)
  const output = path.join(root, to)
  await fs.mkdir(path.dirname(output), { recursive: true })
  await run(ffmpegPath, ['-y', '-loglevel', 'error', '-i', input, ...VIDEO_ARGS, output])
  const [a, b] = await Promise.all([fs.stat(input), fs.stat(output)])
  report(from, a.size, b.size)
}

for (const { from, to } of TARGETS) {
  const srcDir = path.join(srcRoot, from)
  const outDir = path.join(root, to)
  for (const file of await walk(srcDir)) await processImage(file, outDir, srcDir)
}
for (const video of VIDEOS) await processVideo(video)

console.log(`\nTotal ${kb(totalIn)} -> ${kb(totalOut)}  (${Math.round((1 - totalOut / totalIn) * 100)}% smaller)`)
