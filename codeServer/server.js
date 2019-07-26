'use strict';

const Hapi = require('hapi');
const Server = new Hapi.Server();
const logger = require('winston');
const db = require('./models/mongodb');
const middleware = require('./middleware');
const configuration = require('./configuration');

Server.connection({
    port: configuration.PORT,
    host: '0.0.0.0',
    routes: {
 cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with',]
        },
    }
});

Server.register(
    [
        middleware.good,
        middleware.swagger.inert,
        middleware.swagger.vision,
        middleware.swagger.swagger,
    ], function (err) {
        if (err) {
            Server.log(['error'], 'Hapi Plugins load error: ' + err);
        }
        else
            Server.log(['start'], 'Hapi Plugins loaded')
    });

Server.route(require('./router'));
Server.start(() => {
    logger.info(`Server is listening on port ${Server.info.uri} : `)
    db.connect(() => {   //create a mongodb connection
    });
});
