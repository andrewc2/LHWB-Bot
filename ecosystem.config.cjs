module.exports = {
  apps: [
    {
      name: 'utility-bot',
      cwd: './packages/utility-bot',
      script: 'npm',
      args: 'start',
      interpreter: 'node',
      namespace: 'lhwb',
      max_restarts: 5,
      restart_delay: 5000,
      min_uptime: 10000,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'music-bot',
      cwd: './packages/music-bot',
      script: 'npm',
      args: 'start',
      interpreter: 'node',
      namespace: 'lhwb',
      max_restarts: 5,
      restart_delay: 5000,
      min_uptime: 10000,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'merch-bot',
      cwd: './packages/merch-bot',
      script: 'npm',
      args: 'start',
      interpreter: 'node',
      namespace: 'lhwb',
      max_restarts: 5,
      restart_delay: 5000,
      min_uptime: 10000,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
