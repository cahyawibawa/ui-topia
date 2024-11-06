# Contributing to UI/TOPIA

Thank you for your interest in contributing to ui/topia! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to ui/topia.

**You only need to change 3 files to add a new component** and it only takes around 10 minutes of work!

If you need any help, feel free to reach out to [@kyuotaka](https://twitter.com/kyuotaka).

## About this repository

This repository is a monorepo.

- [bun](https://bun.sh/) and [`workspaces`](https://bun.sh/docs/install/workspaces) for development.
- [Turborepo](https://turbo.build/repo) for build system.


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
    ├── elements
    └── index.tsx

```

| Path                  | Description                              |
| --------------------- | ---------------------------------------- |
| `apps/web/app`        | The Next.js application for the website. |
| `apps/web/content/docs`    | The content for the website.             |
| `packages/ui/components` | The React components for the website.    |
| `packages/ui/elements` | Collection of elements such as buttons and text variants.    |
| `packages/ui/index.tsx`   | The registry for the components.         |

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

## Adding a New Component

We use a registry system for developing components. You can find the source code for the components under `packages/ui/index.tsx`. The components are organized by type of components.

To add a new component to ui/topia, you will need to modify several files. Follow these steps:


### 1. Create a Component Demo

Create your components in `packages/src/components/examples/example-component.tsx`

```typescript
import ExampleComponent from '@/components/example-component'

export default function ExampleComponentDemo() {
  return (
    <div className="relative justify-center">
    <ExampleComponent />
  </div>
  )
}
```

### 2. Update Registry

Export your component in the registry in `packages/src/index.tsx`

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

Create an MDX file for documenting your component in `content/docs/components/example-component.mdx`


That's it! You have successfully added a new component.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
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

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/.


```

```
