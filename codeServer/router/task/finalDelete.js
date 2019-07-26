
'use strict';
/**
 * @description:final delete completed task
 */
const joi = require('joi');
const logger = require('winston');
const mongoUtils = require('../../models/mongodb/utils');
const ObjectId = require("mongodb").ObjectID;

let validator = joi.object({
  id: joi.string().required().description("task id").error(new Error('task  id is missing')),
});

var handler = (req, reply) => {
  var id = new ObjectId(req.query.id);
  var condition = { _id: id };

  let deleteById = () => {

    return new Promise((resolve, reject) => {

      mongoUtils.deleteOne('logsData', condition, function (err, res) {
        if (err)
          return reject({ message: err, code: 500 })
        else
          return resolve(res);
      });
    });
  }


  deleteById()
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
  validator,
  responseCode,
};
