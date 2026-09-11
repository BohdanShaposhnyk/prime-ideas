# Free React Bits catalog

Local index for agents. **Free `@react-bits` only** — never Pro (`@reactbits-pro`, `@reactbits-starter`, `pro.reactbits.dev`).

Prefer GSAP-aligned Bits; new deps need a README note. Install:

```bash
pnpm dlx shadcn@latest add @react-bits/<Name>-TS-TW --path src/shared/bits
```

Do not fetch remote `llms.txt` / `registry.json` by default. Refresh: keep remote content before `## React Bits Pro`, rewrite this file. Items marked _(heavy)_ often pull WebGL / three / ogl — confirm before installing.

## Text Animations

- `ASCIIText` — Renders text with an animated ASCII background for a retro feel
- `BlurText` — Text starts blurred then crisply resolves for a soft-focus reveal effect
- `CircularText` — Layouts characters around a circle with optional rotation animation
- `CountUp` — Animated number counter supporting formatting and decimals
- `CurvedLoop` — Flowing looping text path along a customizable curve with drag interaction
- `DecryptedText` — Hacker-style decryption cycling random glyphs until resolving to real text
- `DepthText` — Layered extruded type with parallax that shifts against the pointer
- `EchoText` — Ghosted copies trail behind the text and settle into a single word
- `FallingText` — Characters fall with gravity + bounce creating a playful entrance
- `FoldText` — Lines unfold into place like creased paper opening flat
- `FuzzyText` — Vibrating fuzzy text with controllable hover intensity
- `GlitchText` — RGB split and distortion glitch effect with jitter effects
- `GradientText` — Animated gradient sweep across live text with speed and color control
- `MaskedHeading` — A large headline with a drifting colour mesh or image showing through the glyphs, revealed word by word
- `ParticleText` — Text assembles from drifting particles that scatter and reform on demand
- `RotatingText` — Cycles through multiple phrases with 3D rotate / flip transitions
- `ScrambledText` — Detects cursor position and applies a distortion effect to text
- `ScrollFloat` — Text gently floats / parallax shifts on scroll
- `ScrollReveal` — Text gently unblurs and reveals on scroll
- `ScrollVelocity` — Text marquee animatio - speed and distortion scale with user's scroll velocity
- `ShinyText` — Metallic sheen sweeps across text producing a reflective highlight
- `Shuffle` — Animated text reveal where characters shuffle before settling
- `SplitFlapText` — Mechanical split-flap departure board that clacks through to each new phrase
- `SplitText` — Splits text into characters / words for staggered entrance animation
- `StrokeText` — Outlined letterforms draw themselves on, then flood with fill
- `TextCursor` — Make any text element follow your cursor, leaving a trail of copies behind it
- `TextLoop` — A seamless text marquee that flows along curved SVG paths
- `TextPressure` — Characters scale / warp interactively based on pointer pressure zone
- `TextType` — Typewriter effect with blinking cursor and adjustable typing cadence
- `TrueFocus` — Applies dynamic blur / clarity based over a series of words in order
- `VariableProximity` — Letter styling changes continuously with pointer distance mapping
- `WarpText` — WebGL warp that bends and refracts the text around the pointer _(heavy)_

## Animations

- `AnimatedContent` — Wrapper that animates any children on scroll or mount with configurable direction, distance, duration, easing and disappear options
- `Antigravity` — 3D antigravity particle field that repels from the cursor with smooth motion
- `BlobCursor` — Organic blob cursor that smoothly follows the pointer with inertia and elastic morphing
- `ClickSpark` — Creates particle spark bursts at click position
- `Crosshair` — Custom crosshair cursor with tracking, and link hover effects
- `Cubes` — 3D rotating cube cluster. Supports auto-rotation or hover interaction
- `CursorGrid` — Canvas grid whose cells light up around the cursor with configurable radius, falloff and click pulses
- `ElasticMesh` — Spring-mesh surface that stretches under the pointer and settles back with damped physics
- `ElectricBorder` — Jittery electric energy border with animated arcs, glow and adjustable intensity
- `FadeContent` — Simple directional fade / slide entrance / exit wrapper with threshold-based activation
- `GhostCursor` — Semi-transparent ghost cursor that smoothly follows the real cursor with a trailing effect
- `GlareHover` — Adds a realistic moving glare highlight on hover over any element
- `GlowCursor` — Shader-powered light trail that smoothly follows the pointer with customizable glow, color, taper and pulse
- `GradualBlur` — Progressively un-blurs content based on scroll or trigger creating a cinematic reveal
- `HalftoneReveal` — Print-style halftone dot matrix that resolves into sharp content around the cursor
- `ImageTrail` — Cursor-based image trail with several built-in variants
- `LaserFlow` — Dynamic laser light that flows onto a surface, customizable effect
- `LogoLoop` — Continuously looping marquee of brand or tech logos with seamless repeat and hover pause
- `MagicRings` — Interactive magic rings effect with customizable parameters
- `Magnet` — Elements magnetically ease toward the cursor then settle back with spring physics
- `MagnetLines` — Animated field lines bend toward the cursor
- `MetaBalls` — Liquid metaball blobs that merge and separate with smooth implicit surface animation
- `MetallicPaint` — Liquid metallic paint shader which can be applied to SVG elements
- `Noise` — Animated film grain / noise overlay adding subtle texture and motion
- `OrbitImages` — SVG Path customizable orbiting images effect
- `PixelSwap` — Pixel fragments assemble into a full cover, swap arbitrary content, then dissolve away with reversible colors and triggers
- `PixelTrail` — Pixelated cursor trail emitting fading squares with retro digital feel
- `PixelTransition` — Pixel dissolve transition for content reveal on hover
- `Ribbons` — Flowing responsive ribbons/cursor trail driven by physics and pointer motion
- `RippleDistortion` — Pointer-driven water displacement that warps content and leaves a decaying wake
- `ScrollExpand` — A rounded media frame that grows to full bleed as it scrolls through the viewport
- `ShapeBlur` — Morphing blurred geometric shape. The effect occurs on hover
- `SplashCursor` — Liquid splash burst at cursor with curling ripples and waves
- `StarBorder` — Animated star / sparkle border orbiting content with twinkle pulses
- `StickerPeel` — Sticker corner lift + peel interaction using 3D transform and shadow depth
- `Strands` — Glowing ribbon-like strands that ripple and weave across a transparent canvas
- `SwarmCursor` — Flocking particle swarm that chases the pointer, jostles for space and drifts apart at rest
- `TargetCursor` — A cursor follow animation with 4 corners that lock onto targets

## Components

- `AccordionGallery` — Panels expand on hover or focus, revealing parallax imagery and captions
- `AnimatedList` — List items enter with staggered motion variants for polished reveals
- `BorderGlow` — Glowing mesh-gradient border that follows cursor direction and intensifies near edges
- `BounceCards` — Cards bounce that bounce in on mount
- `BubbleMenu` — Floating circular expanding menu with staggered item reveal
- `CardNav` — Expandable navigation bar with card panels revealing nested links
- `CardSwap` — Cards animate position swapping with smooth layout transitions
- `Carousel` — Responsive carousel with touch gestures, looping and transitions
- `ChromaGrid` — A responsive grid of grayscale tiles. Hovering the grid reaveals their colors
- `CircularGallery` — Circular orbit gallery rotating images
- `Counter` — Flexible animated counter supporting increments + easing
- `CurvedInput` — Arc-bent input bar with text, caret and submit button all following the curve
- `DecayCard` — Hover parallax effect that disintegrates the content of a card
- `DepthCarousel` — Cards recede into depth on a 3D rail, with drag, keyboard and auto-advance
- `Dock` — macOS style magnifying dock with proximity scaling of icons
- `DomeGallery` — Immersive 3D dome gallery projecting images on a hemispheric surface _(heavy)_
- `DriftWall` — An endless perspective wall of tiles drifting past, lifting on hover
- `ElasticSlider` — Slider handle stretches elastically then snaps with spring physics
- `FlowingMenu` — Liquid flowing active indicator glides between menu items
- `FluidGlass` — Glassmorphism container with animated liquid distortion refraction
- `FlyingPosters` — 3D posters rotate on scroll infinitely _(heavy)_
- `Folder` — Interactive folder opens to reveal nested content smooth motion
- `GlassIcons` — Icon set styled with frosted glass blur
- `GlassSurface` — Advanced Apple-style glass surface with real-time distortion + lighting
- `GooeyNav` — Navigation indicator morphs with gooey blob transitions between items
- `InfiniteMenu` — Horizontally looping menu effect that scrolls endlessly with seamless wrap
- `InfiniteSpiral` — An endlessly looping 3D helix of images with customizable motion, depth, spacing and interaction
- `Lanyard` — Swinging 3D lanyard / badge card with realistic inertial motion _(heavy)_
- `LineSidebar` — Static list navigation with a cursor-proximity effect that shifts and highlights nearby items
- `MagicBento` — Interactive bento grid tiles expand + animate with various options
- `Masonry` — Responsive masonry layout with animated reflow + gaps optimization
- `ModelViewer` — Three.js model viewer with orbit controls and lighting presets _(heavy)_
- `MorphSlider` — WebGL slider that melts between images with a displacement transition _(heavy)_
- `OptionWheel` — Curved option picker that spins via scroll, drag, or arrow keys, fading and tilting items away from the selection
- `PillNav` — Minimal pill nav with sliding active highlight + smooth easing
- `PixelCard` — Card content revealed through pixel expansion transition
- `ProfileCard` — Animated profile card glare with 3D hover effect
- `ReflectiveCard` — Card with dynamic webcam reflection and glare effects that respond to cursor movement
- `ScrollStack` — Overlapping card stack reveals on scroll with depth layering
- `SpecularButton` — Glass button with a shader-driven specular rim light that sweeps around the edge and follows the cursor
- `SpotlightCard` — Dynamic spotlight follows cursor casting gradient illumination
- `Stack` — Layered stack with swipe animations, autoplay and smooth transitions
- `StaggeredMenu` — Menu with staggered item animations and smooth transitions on open/close
- `Stepper` — Animated multi-step progress indicator with active state transitions
- `TiltedCard` — 3D perspective tilt card reacting to pointer

## Backgrounds

- `AcidSquares` — A crystalline corridor of stacked squares receding into depth
- `AeroShards` — A GPU-driven wind sculpture of folded foil shards with crisp detail, content-safe placements, and responsive pointer interactions _(heavy)_
- `Aurora` — Flowing aurora gradient background
- `Balatro` — The balatro shader, fully customizalbe and interactive
- `Ballpit` — Physics ball pit simulation with bouncing colorful spheres _(heavy)_
- `Beams` — Crossing animated ribbons with customizable properties _(heavy)_
- `ColorBends` — Vibrant color bends with smooth flowing animation
- `CRTWarp` — Full-canvas CRT plasma with curved distortion, scanlines, bloom and pointer interaction _(heavy)_
- `DarkVeil` — Subtle dark background with a smooth animation and postprocessing
- `Dither` — Retro dithered noise shader background
- `DotField` — Interactive dot grid with cursor bulge, glow, sparkle, and wave effects
- `DotGrid` — Animated dot grid with cursor interactions
- `EvilEye` — Procedural evil eye shader with animated iris, slit pupil, and fiery outer glow
- `FaultyTerminal` — Terminal CRT scanline squares effect with flicker + noise
- `Ferrofluid` — A churning magnetic fluid traced by glowing contour lines, with a cursor magnet _(heavy)_
- `FloatingLines` — 3D floating lines that react to cursor movement
- `Galaxy` — Parallax realistic starfield with pointer interactions _(heavy)_
- `GhostFibers` — A deep-blue recursive fiber field with luminous bands, radial twisting and soft atmospheric glow _(heavy)_
- `GradientBlinds` — Layered gradient blinds with spotlight and noise distortion
- `GradientWaves` — Raymarched sine waves rolling toward a soft, hazy horizon _(heavy)_
- `Grainient` — Grainy gradient swirls with soft wave distortion
- `GridDistortion` — Warped grid mesh distorts smoothly reacting to cursor
- `GridMotion` — Perspective moving grid lines based on cusror position
- `GridScan` — Animated grid room 3D scan effect and cool interactions _(heavy)_
- `Hyperspeed` — Animated lines continuously moving to simulate hyperspace travel on click hold _(heavy)_
- `Iridescence` — Slick iridescent shader with shifting waves _(heavy)_
- `LetterGlitch` — Matrix style letter animation
- `Lightfall` — Colorful light streaks raining down a glowing tunnel with a cursor light _(heavy)_
- `Lightning` — Procedural lightning bolts with branching and glow flicker
- `LightPillar` — Vertical pillar of light with glow effects
- `LightRays` — Volumetric light rays/beams with customizable direction
- `LightTunnel` — A radial fibre-optic tunnel with light pulses racing into depth _(heavy)_
- `LineWaves` — Animated line wave pattern with colorful warped distortion
- `LiquidChrome` — Liquid metallic chrome shader with flowing reflective surface _(heavy)_
- `LiquidEther` — Interactive liquid shader with flowing distortion and customizable colors _(heavy)_
- `MoltenMetal` — Swirling caustic plasma filaments with molten, white-hot cores _(heavy)_
- `Orb` — Floating energy orb with customizable hover effect
- `Particles` — Configurable particle system
- `PixelBlast` — Exploding pixel particle bursts with optional liquid postprocessing
- `PixelSnow` — Falling pixelated snow effect with customizable density and speed
- `Plasma` — Organic plasma gradients swirl + morph with smooth turbulence
- `PlasmaWave` — Raymarched plasma waves with dual-wave interference and OGL _(heavy)_
- `Prism` — Rotating prism with configurable intensity, size, and colors _(heavy)_
- `PrismaticBurst` — Burst of light rays with controllable color, distortion, amount _(heavy)_
- `Radar` — Radar sweep effect with concentric rings, radial spokes, and a rotating beam
- `RippleGrid` — A grid that continuously animates with a ripple effect
- `Scanner` — Calm interference bands sweeping across the screen like an oscilloscope
- `ShapeGrid` — Animated grid with shape variants (square, hexagon, circle, triangle) + direction customization
- `SideRays` — Animated light rays emanating from the side with customizable colors and speed
- `Silk` — Smooth waves background with soft lighting
- `SlicedWaves` — A grid of soft glowing bars rippling like a slatted equalizer
- `SoftAurora` — Soft aurora borealis shader with 3D Perlin noise and cosine gradient palettes
- `Threads` — Animated pattern of lines forming a fabric-like motion
- `Topography` — A living contour map with glowing, elevation-tinted lines
- `Waves` — Layered lines that form smooth wave patterns with animation
- `WebThreads` — Glowing sine threads woven through a luminous convergence point
