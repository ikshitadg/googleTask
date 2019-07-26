'use strict'

const configuration = require('../../configuration');
const logger = require('winston');
const mongodb = require('mongodb');

let state = { db: null };

exports.connect = (callback) => {
    if (state.db)
        return callback();
    mongodb.connect(configuration.MONGODB_URL, (err, connection) => {
        if (err) {
            logger.error(`MongoDB error connecting to ${configuration.MONGODB_UR}`, err.message);

            process.exit(0);
            return callback(err);
        }
        state.db = connection;
        logger.info(`MongoDB connected successfully -------------`);
        return callback();
    });
}

exports.get = () => { return state.db }

exports.close = (callback) => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            return callback(err);
        })
    }
}