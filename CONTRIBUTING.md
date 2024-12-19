# Contributing to UI/TOPIA

Welcome, and thank you for your interest in contributing to **ui/topia**! 🎉  
This guide will walk you through the structure of the project and provide clear, step-by-step instructions to help you add a new component to the library.

Adding a component is quick and easy—you only need to update **3-4 files**, which takes about **10 minutes**!

If you have any questions or need assistance, don’t hesitate to reach out to [@kyuotaka](https://twitter.com/kyuotaka).

---

## About the Repository

This is a **monorepo** powered by:  
- **[bun](https://bun.sh/)** for development.  
- **[Turborepo](https://turbo.build/repo)** for efficient builds.

We use a **registry system** for organizing and exporting components. The source code for components is located in `packages/ui/registry/index.ts`, and they are categorized by type. All components are **ESM-only** and distributed via the registry.


## Structure

This repository is structured as follows:

```
apps
└── web
    ├── app
    ├── components
    ├── content
        └── docs

packages
└── ui
    ├── src
    ├── components
    ├── registry
        └── index.ts

```


| Path                  | Description                              |
| --------------------- | ---------------------------------------- |
| `apps/web/app`        | The Next.js application for the website. |
| `apps/web/content/docs`    | The content for the website.             |
| `packages/ui/components` | The React components for the website.    |
| `packages/ui/registry`   | The registry for the components.         |

## Development

### Fork and Clone the Repository

1. **Fork this repository**  
   Click [here](https://github.com/cahyawibawa/ui-topia/fork) to fork the repository.

2. **Clone your forked repository to your local machine**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/uitopia.git
   ```

3. **Navigate to the project directory**

   ```bash
   cd uitopia
   ```

4. **Create a new branch for your changes**

   ```bash
   git checkout -b my-new-branch
   ```

5. **Install dependencies**

   ```bash
   bun i
   ```

6. **Run the project**
   ```bash
   bun run dev
   ```


To add a new component to ui/topia, you will need to modify several files. Follow these steps:


### 1. Create the Component

Create your components in `packages/src/components/showcases/your-component.tsx`

```typescript
import { Button, Stack } from '@/components/shadcn-ui';
import type { JSX } from 'react';

export default function Component(): JSX.Element { //make sure set to default
  return (
    <Stack
      align="start"
      direction={{ sm: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
    >
      <Button size="small">Upload</Button>
      <Button>Upload</Button>
      <Button size="large">Upload</Button>
    </Stack>
  );
}
```

### 2. Update Registry

Export your component in the registry in `packages/src/ui/registry`

```typescript

const example: Registry = {
  'example-component-demo': {
    name: 'example-component',
    type: 'components:example',
   files: ["./components/examples/example-component.tsx"],
    component: React.lazy(() => import("./components/examples/example-component"))-
  },
}
```

### 3. Create docs

Create an MDX file for documenting your component in `content/docs/components/your-component.mdx`


That's it! You have successfully added a new component.

## Commit Convention

`category(scope or module): message` in your commit message while using one of
the following categories:
- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes (or additions) concerning the continuous integration configuration (i.e. github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

Example:
feat(components): add new button component

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/.


That's it! 
Thank you for contributing to ui/topia and helping us create amazing components.
