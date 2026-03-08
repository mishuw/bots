module.exports = {
  apps: [
    {
      name: 'paranoia',
      cwd: './apps/Paranoia',
      script: 'node',
      args: 'dist/index.js',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'voice',
      cwd: './apps/Voice',
      script: 'node',
      args: 'dist/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
