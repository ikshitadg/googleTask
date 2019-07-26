
'use strict';
/**
 * @description:edit a active task
 */

const joi = require('joi');
const logger = require('winston');
const ObjectId = require("mongodb").ObjectID;
const mongoUtils = require('../../models/mongodb/utils');
let validator = joi.object({
  task: joi.string().required().description("task").error(new Error('task is missing')),
  taskDetail: joi.string().allow("").description("task descrption")
});
let query = joi.object({
  id: joi.string().required().description("task id").error(new Error('task  id is missing')),
});
var handler = (req, reply) => {
  var id = new ObjectId(req.query.id);
  var condition = { _id: id };
  var data = {
    task: req.payload.task,
    taskDetail: req.payload.taskDetail,
    updated: new Date()
  }
  let update = () => {

    return new Promise((resolve, reject) => {

      mongoUtils.updateOne('logsData', condition, data, function (err, res) {
        if (err)
          return reject({ message: err, code: 500 })
        else
          return resolve(res);
      });
    });
  }


  update()
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
  query,
  responseCode,
};
