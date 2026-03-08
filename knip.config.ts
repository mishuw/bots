import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignoreDependencies: [
    'drizzle-kit',
    'discord.js',
    '@paralleldrive/cuid2',
    'consola',
    'execa',
    'tsup',
    'ts-node',
    'tsc-alias',
    'tsx'
  ],
  ignoreBinaries: [
    'drizzle-kit',
    'tsup',
    'ts-node',
    'tsc-alias',
    'tsx',
    'nodemon',
    '___________DEVELOPMENT_______',
    '___________PRODUCTION_______'
  ],
  ignore: ['ecosystem.config.cjs'],
  workspaces: {
    'apps/*': {
      ignore: ['src/commands/**/*', 'src/events/**/*', 'tsup.config.ts']
    },
    'packages/db': {
      ignore: ['drizzle.config.ts', 'src/reset.ts']
    }
  }
}

export default config
