import * as convict from 'convict';

export interface IConfig {
  env: string;
  server: {
    port: number;
    requestTimeout: number;
  };
  api: {
    host: string;
    baseURL: string;
  };
}

const config = convict<IConfig>({
  env: {
    format: ['local', 'production', 'development'],
    env: 'NODE_ENV',
    arg: 'node-env',
    default: 'local',
  },
  server: {
    port: {
      format: 'port',
      env: 'NODE_PORT',
      default: +(process.env.PORT || 4001),
    },
    requestTimeout: {
      format: Number,
      env: 'NODE_REQUEST_TIMEOUT',
      default: 180000,
    },
  },
  api: {
    host: {
      format: String,
      env: 'API_HOST',
      default: 'http://localhost',
    },
    baseURL: {
      format: String,
      env: 'API_BASEURL',
      default: '/api/v1',
    },
  },
});

config.validate({ allowed: 'strict' });

export default config.getProperties();
