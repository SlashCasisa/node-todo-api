module.exports = {
  apps: [{
    name: 'todo_api',
    script: 'src/app.js',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};