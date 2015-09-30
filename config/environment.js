/* jshint node: true */

var contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self'",
  'font-src': "'self'",
  'connect-src': "'self' localhost:* api.type-and-learn.kalina.tech:* api.type-and-learn-api.dev:*",
  'img-src': "'self'",
  'style-src': "'self' 'unsafe-inline'",
  'media-src': "'self'"
};

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'type-and-learn-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    'simple-auth': {
      authorizer: 'simple-auth-authorizer:devise'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.apiHost = 'http://type-and-learn-api.dev';
    ENV.contentSecurityPolicy = contentSecurityPolicy;
    ENV.contentSecurityPolicy['script-src'] = "'self' 'unsafe-eval'";

    ENV['simple-auth'].crossOriginWhitelist = [ENV.apiHost];
    ENV.websocketHost = 'ws://localhost:9292';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.apiHost = 'http://localhost:4200';
    ENV['simple-auth'].crossOriginWhitelist = [ENV.apiHost];

    ENV['simple-auth'].store = 'simple-auth-session-store:ephemeral';
  }

  if (environment === 'production') {
    ENV.apiHost = 'http://api.type-and-learn.kalina.tech';

    ENV['simple-auth'].crossOriginWhitelist = [ENV.apiHost];
    ENV.websocketHost = 'ws://websockets.type-and-learn.kalina.tech';
  }

  ENV['simple-auth-devise'] = {
    tokenAttributeName: 'token',
    identificationAttributeName: 'email',
    serverTokenEndpoint: ENV.apiHost + '/sessions'
  };

  return ENV;
};
