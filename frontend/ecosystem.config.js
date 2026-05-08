module.exports = {
  apps: [
    {
      name: 'zhbl',
      exec_mode: 'cluster',
      instances: 1,
      script: 'npm',
      args: 'start',
      autorestart: true,
      watch: false,
    },
  ],
}
