---
name: shallow-split
description: >-
  Split one large React section file into a same-named folder of small files:
  composition, components, hooks, and config, without changing behavior. Use
  when the user asks for a shallow code split, a code-quality folder refactor,
  or to extract hooks, components, and config from a scene or section file.
---

# Shallow split

Turn `foo.tsx` into `foo/` so the existing import still resolves. Behavior, markup, class names, timings, and public data attributes stay the same.

## Layout

```
foo/
  index.tsx     composition, default export only
  lockup.tsx    one presentational component, named export
  use-lockup.ts one hook, named useLockup
  config.ts     shared constants
  layout.ts     existing geometry or data module, if this file owns it
```

Match `src/site/sections/hero` and `src/site/sections/scene-screen`. Add a file only when it has a single job. Leave a short map or JSX prop list in `index.tsx`.

## Steps

1. Read the file and anything only it imports.
2. Move a private sibling (for example `screen-layout.ts`) into the folder and fix its relative imports. Leave modules other files import where they are.
3. Put shared constants in `config.ts`. Put each effect in `use-*.ts`. Put each component in its own file. `index.tsx` wires them together.
4. Component files export the component. Hooks stay out of those files.
5. Delete the original `foo.tsx`. A file and a folder cannot share the name.
6. Do not edit the call site when the folder name matches the old module.

## Stop

Do not restyle, rename, add features, or wrap a few lines in a new abstraction. Copy effects and markup as they are.
