# Contributing to UI/TOPIA

Thank you for your interest in contributing to ui/topia! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to ui/topia.

**You only need to change 4 files to add a new component or effect** and it only takes around 10 minutes of work!

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/cahyawibawa/ui-topia/compare).

## Getting Started

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
   pnpm i
   ```

6. **Run the project**
   ```bash
   cd apps/web
   pnpm dev
   ```

## Adding a New Component

To add a new component to ui/topia, you will need to modify several files. Follow these steps:

### 1. Create the Component

Navigate to the packages folder:

```bash
cd packages/ui
pnpm dev
```

Create the base component in `packages/src/components/example-component.tsx`

```typescript
import React from 'react'

export default function ExampleComponent() {
  return (
    <div>
      This is your component.
    </div>
  )
}
```

### 2. Create Component Demo

Provide a basic example to showcase your component in `packages/src/components/examples/example-component.tsx`

```typescript
import ExampleComponent from '@/registry/components/magicui/example-component'

export default function ExampleComponentDemo() {
  return (
    <div className="relative justify-center">
    <ExampleComponent />
  </div>
  )
}
```

### 3. Update Registry

Export your component and example in the registry in `packages/src/index.tsx`

```typescript
const ui: Registry = {
  'example-component': {
    name: 'example-component',
    type: 'components:ui',
    files: ['registry/components/magicui/example-component.tsx'],
  },
}

const example: Registry = {
  'example-component-demo': {
    name: 'example-component',
    type: 'components:example',
    files: ['registry/components/example/example-component-demo.tsx'],
    component: React.lazy(
      () => import('@/registry/components/example/example-component-demo')
    ),
  },
}
```

### 4. Create docs

Create an MDX file for documenting your component in `content/docs/components/example-component.mdx`

````md
---
title: Example Component
description: Example component for uitopia
---

<ComponentPreview name="example-component-demo" />

## Installation

<Steps>
<Step>

### Install dependencies

<InstallTabs items={['npm', 'pnpm', 'yarn', 'bun']}>

```bash tab="npm"
npx shadcn-ui@latest add card badge
```

```bash tab="pnpm"
pnpm dlx shadcn-ui@latest add card badge
```

```bash tab="yarn"
npx shadcn-ui@latest add card badge
```

```bash tab="bun"
bunx --bun shadcn-ui@latest add card badge
```

</InstallTabs>

</Step>

<Step>
### Copy the source code

<ComponentBase name="project-card" />

</Step>
</Steps>

## Props

<TypeTable
type={{
    title: {
      description: 'The title of the project card',
      type: 'string',
      required: true,
    },
    href: {
      description: 'Optional hyperlink reference for the project card',
      type: 'string',
      required: false,
    },
    description: {
      description: 'A brief description of the project',
      type: 'string',
      required: true,
    },
    className: {
      description: 'Additional CSS classes to apply to the project card',
      type: 'string',
      required: false,
    },
  }}  
/>
````

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

## Ask for Help

For any help or questions, please open a new GitHub issue or reach out to my social media [X](https://x.com/kyuotaka) and [Discord](https://discord.com/users/sinisterkids).

```

```
