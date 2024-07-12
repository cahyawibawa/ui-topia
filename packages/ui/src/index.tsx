import * as React from 'react'
import { Registry } from './schema'

const ui: Registry = {
  globe: {
    name: 'globe',
    type: 'components:ui',
    files: ['./components/globe.tsx'],
  },
  marquee: {
    name: 'marquee',
    type: 'components:ui',
    files: ['./components/marquee.tsx'],
  },
  projectCard: {
    name: 'project-card',
    type: 'components:ui',
    files: ['./components/project-card.tsx'],
  },
}

const example: Registry = {

  'blur-hero-demo': {
    name: 'blur-hero-demo',
    type: 'components:example',
    files: ['./components/examples/blur-hero-demo.tsx'],
    component: React.lazy(() => import('./components/examples/blur-hero-demo')),
  },
  'client-logo-demo': {
    name: 'client-logo-demo',
    type: 'components:example',
    files: ['./components/examples/client-logo-demo.tsx'],
    component: React.lazy(
      () => import('./components/examples/client-logo-demo')
    ),
  },
  'globe-card-demo': {
    name: 'globe-card-demo',
    type: 'components:example',
    files: ['./components/examples/globe-card-demo.tsx'],
    component: React.lazy(
      () => import('./components/examples/globe-card-demo')
    ),
  },
  'linear-card-demo': {
    name: 'linear-card-demo',
    type: 'components:example',
    files: ['./components/examples/linear-card-demo.tsx'],
    component: React.lazy(
      () => import('./components/examples/linear-card-demo')
    ),
  },
  'marquee-logo-demo': {
    name: 'marquee-logo-demo',
    type: 'components:example',
    files: ['./components/examples/marquee-logo-demo.tsx'],
    component: React.lazy(
      () => import('./components/examples/marquee-logo-demo')
    ),
  },
  'project-card-demo': {
    name: 'project-card-demo',
    type: 'components:example',
    files: ['./components/examples/project-card-demo.tsx'],
    component: React.lazy(
      () => import('./components/examples/project-card-demo')
    ),
  },
}

const elements: Registry = {
  buttons: {
    name: 'buttons',
    type: 'components:elements',
    files: ['./elements/button.tsx'],
    component: React.lazy(() => import('./elements/button')),
  },
}
export const registry: Registry = {
  ...ui,
  ...elements,
  ...example,
}
