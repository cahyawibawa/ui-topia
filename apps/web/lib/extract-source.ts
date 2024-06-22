import fs from 'fs'
import path from 'path'

export function extractSourceCode(componentName: string): string {
  const basePath = path.join(
    process.cwd(),
    '..',
    '..',
    'packages',
    'ui',
    'src',
    'components'
  )

  // Paths to check
  const paths = [
    path.join(basePath, `${componentName}.tsx`),
    path.join(basePath, 'examples', `${componentName}.tsx`),
    path.join(basePath, componentName, 'index.tsx'),
    path.join(basePath, 'examples', componentName, 'index.tsx'),
  ]

  for (const componentPath of paths) {
    try {
      return fs.readFileSync(componentPath, 'utf8')
    } catch (error) {
      // File not found, continue to next path
    }
  }

  // If we've exhausted all paths, log an error and return the not found message
  console.error(`Failed to read component file for: ${componentName}`)
  return '// Component source code not found'
}
