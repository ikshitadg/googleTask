'use strict';

const task = require('./post');
const read = require("./get");
const readOne = require("./getById");
const update = require("./update");
const deleteById = require("./delete");
const getCompleteTask = require("./getCompleteTask");
const completeTaskCount = require("./completeTaskCount");
const reactive=require("./reactiveTask");
const finaldelete=require("./finalDelete");

module.exports = [
    {
        method: 'POST',
        path: '/create',
        handler: task.handler,
        config: {
            tags: ['api', 'task'],
            description: "create task",
            notes: "create task",
            auth: false,
            response: task.responseCode,
            validate: {
                payload: task.validator,
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/get',
        handler: read.handler,
        config: {
            tags: ['api', 'task'],
            description: "get all task",
            notes: "get all tasks",
            auth: false,
            response: read.responseCode,
            validate: {
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/getCompletedTask',
        handler: getCompleteTask.handler,
        config: {
            tags: ['api', 'task'],
            description: "get all completed task",
            notes: "get all completed tasks",
            auth: false,
            response: getCompleteTask.responseCode,
            validate: {
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/completeTaskCount',
        handler: completeTaskCount.handler,
        config: {
            tags: ['api', 'task'],
            description: "get all completed task count",
            notes: "get all completed tasks count",
            auth: false,
            response: completeTaskCount.responseCode,
            validate: {
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/getById',
        handler: readOne.handler,
        config: {
            tags: ['api', 'task'],
            description: "get one task",
            notes: "get task details tasks",
            auth: false,
            response: readOne.responseCode,
            validate: {
                query: readOne.validator,
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'PATCH',
        path: '/update',
        handler: update.handler,
        config: {
            tags: ['api', 'task'],
            description: "update one task",
            notes: "get one task tasks",
            auth: false,
            response: update.responseCode,
            validate: {
                payload: update.validator,
                query: update.query,
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'PATCH',
        path: '/deleteById',
        handler: deleteById.handler,
        config: {
            tags: ['api', 'task'],
            description: "update one task complete status",
            notes: "get one task tasks status",
            auth: false,
            response: deleteById.responseCode,
            validate: {
                payload: deleteById.validator,
                query: deleteById.query,
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'PATCH',
        path: '/reactive',
        handler: reactive.handler,
        config: {
            tags: ['api', 'task'],
            description: "reactive one completed task status",
            notes: "reactive one task by id",
            auth: false,
            response: reactive.responseCode,
            validate: {
                payload: reactive.validator,
                query: reactive.query,
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/finalDelete',
        handler: finaldelete.handler,
        config: {
            tags: ['api', 'task'],
            description: "final deletetion of completed task",
            notes: "final delete by task id",
            auth: false,
            response: finaldelete.responseCode,
            validate: {
                query: finaldelete.validator,
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    }
];
