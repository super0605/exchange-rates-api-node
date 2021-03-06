const ENVIRONMENT = process.env.NODE_ENV || 'development';

require('dotenv').config();

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => variable instanceof Object;

/*
 * Deep immutable copy of source object into tarjet object and returns a new object.
 */
const deepMerge = (target, source) => {
  if (isObject(target) && isObject(source)) {
    return Object.keys(source).reduce(
      (output, key) => ({
        ...output,
        [key]: isObject(source[key]) && key in target ? deepMerge(target[key], source[key]) : source[key]
      }),
      { ...target }
    );
  }
  return target;
};

const config = {
  common: {
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT
    },
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    fixer: {
      apiBaseUrl: process.env.FIXER_API_BASE_URL,
      apiKey: process.env.FIXER_API_KEY
    },
    auth: {
      headerName: 'api-key',
      secret: process.env.API_KEY
    }
  }
};

const customConfig = require(configFile).config;
module.exports = deepMerge(config, customConfig);
