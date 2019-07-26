
'use strict';
/**
 * @description:create a task
 */
const joi = require('joi');
const logger = require('winston');
const mongoUtils = require('../../models/mongodb/utils');

let validator = joi.object({
  task: joi.string().required().description("task").error(new Error('task is missing')),
  taskDetail: joi.string().allow("").description("task descrption")
});


let handler = (req, reply) => {

  const insertTask = function (data) {
    return new Promise((resolve, reject) => {
      var data = {
        task: req.payload.task,
        taskDetail: req.payload.taskDetail,
        statusCode: 1,
        status: "active",
        created: new Date(),
        reactive:false
      }
      mongoUtils.insert('logsData', data, function (err, res) {
        if (err)
          return reject({ message: "Database Error", code: 500 });
        else
          return resolve({ message: "success" });
      });
    });
  }

  insertTask()
    .then((data) => {
      return reply({ message: "success" }).code(200);
    })

    .catch(e => {
      logger.error("error in seraching api =>", e);
      return reply({ message: e.message }).code(e.code);
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
  validator
};
