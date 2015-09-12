module.exports = {
  development: {
    buildEnv: 'development', // Override the environment passed to the ember asset build. Defaults to 'production'
    store: {
      type: 'redis', // the default store is 'redis'
      host: 'localhost',
      port: 6379
    },
    assets: {
      type: 's3', // default asset-adapter is 's3'
      gzip: false, // if undefined or set to true, files are gziped
      gzipExtensions: ['js', 'css', 'svg'], // if undefined, js, css & svg files are gziped
      exclude: ['.DS_Store', '*-test.js'], // defaults to empty array
      accessKeyId: '<your-access-key-goes-here>',
      secretAccessKey: process.env['AWS_ACCESS_KEY'],
      bucket: '<your-bucket-name>'
    }
  },

  staging: {
    buildEnv: 'staging', // Override the environment passed to the ember asset build. Defaults to 'production'
    store: {
      host: 'staging-redis.example.com',
      port: 6379
    },
    assets: {
      accessKeyId: '<your-access-key-goes-here>',
      secretAccessKey: process.env['AWS_ACCESS_KEY'],
      bucket: '<your-bucket-name>'
    },
    manifestPrefix: 'stage-app' // optional, defaults to this.project.name()
  },

   production: {
    store: {
      type: 'redis',
      ssh: {
        type: 'redis',
        host: process.env['TAL_APP_PRODUCTION_HOST'],
        username: process.env['TAL_APP_PRODUCTION_USER'],
        port: process.env['TAL_APP_PRODUCTION_PORT'],
        privateKey: '~/.ssh/id_rsa',
        dstPort: 6379, // redis port
        dstHost: 'localhost' // redis host
      }
    },
    assets: {
      accessKeyId: process.env['TAL_S3_ACCESS_KEY_ID'],
      secretAccessKey: process.env['TAL_S3_SECRET_ACCESS_KEY'],
      bucket: 'type-and-learn-assets',
      region: 'eu-west-1'
    }
  }
};