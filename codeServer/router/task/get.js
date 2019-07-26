
'use strict';
/**
 * @description:get active task
 */
const joi = require('joi');
const logger = require('winston');
const mongoUtils = require('../../models/mongodb/utils');

var handler = (req, reply) => {
  let search = () => {

    return new Promise((resolve, reject) => {

      mongoUtils.findMany('logsData', function (err, res) {
        if (err)
          return reject({ message: err, code: 500 })
        else
          return resolve(res);
      });
    });
  }


  search()
    .then((data) => {
      return reply({ message: "success", data: data });
    })
    .catch(e => {
      logger.error("error in seraching api =>", e);
      return reply({ message: e.message, code: e.code });
    });
};

const responseCode = {
  status: {
    200: { message: joi.any().default("success"), data: joi.any() },
    500: { message: joi.any().default("Internal server Error") }
  }
}
module.exports = {
  handler,
  responseCode,
};