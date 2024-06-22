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
  bentogrid: {
    name: 'bento-grid',
    type: 'components:ui',
    files: ['./components/bento-grid.tsx'],
  },
  projectcard: {
    name: 'project-card',
    type: 'components:ui',
    files: ['./components/project-card.tsx'],
  },
}

const example: Registry = {
  'bento-demo': {
    name: 'bento-demo',
    type: 'components:example',
    files: ['./components/examples/bento-demo.tsx'],
    component: React.lazy(() => import('./components/examples/bento-demo')),
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
