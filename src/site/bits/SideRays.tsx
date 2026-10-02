import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

type Origin = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface SideRaysProps {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  intensity?: number;
  spread?: number;
  origin?: Origin;
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const originToFlip = (origin: Origin): [number, number] => {
  switch (origin) {
    case 'top-left': return [1, 0];
    case 'bottom-right': return [0, 1];
    case 'bottom-left': return [1, 1];
    default: return [0, 0];
  }
};

const SideRays = ({
  speed = 2.5,
  rayColor1 = '#EAB308',
  rayColor2 = '#96c8ff',
  intensity = 2,
  spread = 2,
  origin = 'top-right',
  tilt = 0,
  saturation = 1.5,
  blend = 0.75,
  falloff = 1.6,
  opacity = 1.0,
  className = ''
}: SideRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: number | number[] }> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      premultipliedAlpha: false,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';
    // Hide until first paint so an empty buffer never flashes black.
    gl.canvas.style.opacity = '0';
    container.appendChild(gl.canvas);

    const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`;

    const [flipX, flipY] = originToFlip(origin);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] as number[] },
      iSpeed: { value: speed },
      iRayColor1: { value: hexToRgb(rayColor1) as number[] },
      iRayColor2: { value: hexToRgb(rayColor2) as number[] },
      iIntensity: { value: intensity },
      iSpread: { value: spread },
      iFlipX: { value: flipX },
      iFlipY: { value: flipY },
      iTilt: { value: tilt },
      iSaturation: { value: saturation },
      iBlend: { value: blend },
      iFalloff: { value: falloff },
      iOpacity: { value: opacity },
    };
    uniformsRef.current = uniforms;

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    const updateSize = () => {
      renderer.dpr = Math.min(window.devicePixelRatio, 2);
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
    };

    let raf = 0;
    let contextLost = false;
    let inView = false;
    let tabVisible = document.visibilityState !== 'hidden';
    let painted = false;

    const paint = (t: number) => {
      uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      if (!painted) {
        painted = true;
        gl.canvas.style.opacity = '1';
      }
    };

    const loop = (t: number) => {
      if (contextLost || !inView || !tabVisible) return;
      try {
        paint(t);
        raf = requestAnimationFrame(loop);
      } catch {
        return;
      }
    };

    const kick = () => {
      if (contextLost || !inView || !tabVisible || prefersReducedMotion) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(raf);
    };
    const onContextRestored = () => {
      contextLost = false;
      painted = false;
      gl.canvas.style.opacity = '0';
      updateSize();
      if (prefersReducedMotion) {
        paint(0);
      } else {
        kick();
      }
    };

    gl.canvas.addEventListener('webglcontextlost', onContextLost);
    gl.canvas.addEventListener('webglcontextrestored', onContextRestored);
    window.addEventListener('resize', updateSize);

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasInView = inView;
        inView = Boolean(entry?.isIntersecting);
        if (inView && !wasInView) {
          updateSize();
          if (prefersReducedMotion) {
            paint(performance.now());
          } else {
            kick();
          }
        } else if (!inView) {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      tabVisible = document.visibilityState !== 'hidden';
      if (tabVisible) kick();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener('visibilitychange', onVisibility);

    updateSize();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', updateSize);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.canvas.removeEventListener('webglcontextlost', onContextLost);
      gl.canvas.removeEventListener('webglcontextrestored', onContextRestored);
      uniformsRef.current = null;
      try {
        if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      } catch {
        /* already detached */
      }
      try {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      } catch {
        /* ignore teardown errors */
      }
    };
    // Init once; prop updates flow through the uniforms effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!uniformsRef.current) return;
    const u = uniformsRef.current;
    u.iSpeed.value = speed;
    u.iRayColor1.value = hexToRgb(rayColor1);
    u.iRayColor2.value = hexToRgb(rayColor2);
    u.iIntensity.value = intensity;
    u.iSpread.value = spread;
    const [flipX, flipY] = originToFlip(origin);
    u.iFlipX.value = flipX;
    u.iFlipY.value = flipY;
    u.iTilt.value = tilt;
    u.iSaturation.value = saturation;
    u.iBlend.value = blend;
    u.iFalloff.value = falloff;
    u.iOpacity.value = opacity;
  }, [speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none z-[3] ${className}`.trim()}
    />
  );
};

export default SideRays;
