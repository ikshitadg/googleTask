'use strict'

var db = require('./');

const insert = (tablename, data, callback) => {
    db.get().collection(tablename).insert(data,((err, result) => {
        return callback(err, result);
    }));
}
const findOne = (tablename, data, callback) => {
    db.get().collection(tablename).find(data).toArray((err, result) => {
        return callback(err, result);
    }); 
}
const findMany = (tablename, callback) => {
    db.get().collection(tablename).find({status:"active",statusCode:1},{status:0,statusCode:0}).sort({created:-1}).toArray((err, result) => {
        return callback(err, result);
    }); 
}
const updateOne=(tablename,condition,data, callback) => {
    db.get().collection(tablename).update(condition,{$set:data},((err, result) => {
        return callback(err, result);
    })); 
}
const readCompleteTask = (tablename, callback) => {
    db.get().collection(tablename).find({status:"deactive",statusCode:0}).toArray((err, result) => {
        return callback(err, result);
    }); 
}
const completeTaskCount = (tablename, callback) => {
    db.get().collection(tablename).find({status:"deactive",statusCode:0}).toArray((err, result) => {
        return callback(err, result);
    }); 
}
const deleteOne=(tablename,condition, callback) => {
    db.get().collection(tablename).remove(condition,((err, result) => {
        return callback(err, result);
    })); 
}
module.exports = {insert,findOne,findMany,updateOne,readCompleteTask,completeTaskCount,deleteOne}
