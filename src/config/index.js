const dotenv = require('dotenv');
const { AccessEnv } = require('../common/utility');
const packageJSON = require('../../package.json');

const PACKAGE_VERSION = packageJSON.version;
dotenv.config({ silent: process.env.NODE_ENV === 'test' });

const ENV = AccessEnv('ENV'); // Configuration.isTest = process['env']['NODE_ENV'] === 'test'
const BUILD_NUMBER = AccessEnv('BUILD_NUMBER');

const HOST = AccessEnv('HOST');
const HOST_PORT = AccessEnv('HOST_PORT');
const HOST_SERVICE_NAME = AccessEnv('HOST_SERVICE_NAME');

const MONGO_URL = AccessEnv('MONGO_URL');

const HS256_TOKEN_SECRET = AccessEnv('HS256_TOKEN_SECRET');
const ACCESS_TOKEN_EXPIRESIN = AccessEnv('ACCESS_TOKEN_EXPIRESIN');
const REFRESH_TOKEN_EXPIRESIN = AccessEnv('REFRESH_TOKEN_EXPIRESIN');

const LOAD_BALANCER = AccessEnv('LOAD_BALANCER');

const SYSTEM_TOKEN = AccessEnv('SYSTEM_TOKEN');

// const QUEUE_URL = AccessEnv('QUEUE_URL');
const SESSION_NAME = AccessEnv('SESSION_NAME', 'logger_session');

module.exports = {
  packageVersion: PACKAGE_VERSION,
  isTest: ENV === 'test',
  env: ENV, // ['production'].includes(process['env']['NODE_ENV'])
  // apm: 'false', // const apmConfiguration = Configuration.apm;
  node: {
    url: `${HOST}:${HOST_PORT}`,
    pathPrefix: `/${HOST_SERVICE_NAME}/apis`,
    host: HOST,
    port: HOST_PORT,
    serviceName: HOST_SERVICE_NAME,
    buildNumber: BUILD_NUMBER,
    loadBalancer: LOAD_BALANCER,
  },

  mongodb: {
    url: MONGO_URL,
  },
  jwt: {
    HS256_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRESIN,
    REFRESH_TOKEN_EXPIRESIN,
  },

  systemToken: SYSTEM_TOKEN,
  loadBalancer: LOAD_BALANCER,
  sessionName: SESSION_NAME,
};
