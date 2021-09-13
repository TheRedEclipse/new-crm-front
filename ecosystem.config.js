module.exports = {
  apps: [
    {
      name: 'nuxt', // TODO: Rename for identification
      exec_mode: 'cluster',
      port: 3000,
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: '/home/site/list/ModernCitiGroup/modernciti.group', // TODO: Change path
      args: 'start',
      instances: 2,
      // watch: ['package-lock.json'],
      watch: true,
      ignore_watch: ['node_modules', 'static', '.git', '.nuxt'],
      max_memory_restart: '512M',
    },
  ],
}
