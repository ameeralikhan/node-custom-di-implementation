import config from '../../config/index';

export const bootstrap = async (): Promise<boolean> => {
  try {
    // TODO: redis connection here

    if (config.env !== 'local') {
      console.info('Clearing cache');
    }
  } catch (err) {
    console.error('Error while connecting database', err);
    throw err;
  }
  return Promise.resolve(true);
};
