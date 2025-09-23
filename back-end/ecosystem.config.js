module.exports = {
  apps: [{
    name: 'my-app',
    script: 'dist/server.js',
    cwd: '/home/ubuntu/D5-project/back-end',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};