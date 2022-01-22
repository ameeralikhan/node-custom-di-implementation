import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

import config from '../config';

import { bootstrap } from './bootstrap/index';

// middlewares
import routeMiddleware from './routes/index';
import errorMiddleware from './middlewares/error';
import responseMiddleware from './middlewares/response';

bootstrap()
  .then(() => {
    // setup swagger
    const swaggerOptions = {
      definition: {
        info: {
          title: 'Node Customer DI',
          version: '1.0.0',
          servers: ['http://localhost:4001']
        },
      },
      apis: ['./src/routes/*.ts'],
    };
    const swaggerDocs = swaggerJsDoc(swaggerOptions);

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    // swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use(errorMiddleware());
    app.use(routeMiddleware());
    app.use(responseMiddleware());

    const server = app.listen(config.server.port, () => {
      console.info('server started on port %d', config.server.port);
    });

    server.setTimeout(config.server.requestTimeout);
    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 65 * 1000;

    app.on('error', (err) => {
      console.error('server error', err);
    });
  })
  .catch((err) => {
    console.error('Error starting app', err);
  });
