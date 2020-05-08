const jwt = require('jsonwebtoken')
const timeStamp = Date.now()
const config = require('../../config/database')
const create_user = require('../../model/user')
const create_task = require('../../model/task')

const addtask = async(req, res, next) => {
    try {
        const {token} = req.headers;
        const {email, _id} = token_decode(token)
        const { title, start_date, start_time, type, timer } = req.body
        const fetch_user = await create_user.findOne({_id:_id, verified: true})
        if(!fetch_user) return res.status(404).json({status:false, msg:'user not exists!'})
        if(!title) return res.status(404).json({status:false, msg:'Please provide title'})
        if(!start_date) return res.status(404).json({status:false, msg:'Please provide start date'})
        if(!start_time) return res.status(404).json({status:false, msg:'Please provide start time'})
        if(!type) return res.status(404).json({status:false, msg:'Please provide type'})
        if(!timer) return res.status(404).json({status:false, msg:'Please provide timer'})
        const addTask = new create_task({
            title: title,
            start_date: start_date,
            start_time:start_time,
            type: type,
            timer: timer,
            createdById: _id,
            createdAt: timeStamp,
            updatedAt: timeStamp
        })
        await addTask.save();
        return res.status(200).json({status:true, msg:'successfully created', data: addTask})
    } catch (e) {
        console.log(e)
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}

const deletetask = async(req, res, next) => {
    try {
        const {token} = req.headers
        const {email, _id} = token_decode(token)
        const { task_id } = req.body
        const fetch_user = await create_user.findOne({_id:_id, verified: true})
        if(!fetch_user) return res.status(404).json({status:false, msg:'user not exists!'})
        if(!task_id) return res.status(404).json({status:false, msg:'Please provide task id'})
        const fetch_task = await create_task.findByIdAndDelete({_id:task_id, createdById:_id})
        if(!fetch_task) return res.status(404).json({status:false, msg:'task is not exists'})
        return res.status(200).json({status:true, msg:'task deleted successfully'})

    } catch (e) {
        console.log(e)
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}

const alltask = async(req, res, next) => {
    try {
        const { token } = req.headers;
        const {email, _id} = token_decode(token);
        const fetch_user = await create_user.findOne({_id:_id, verified: true})
        if(!fetch_user) return res.status(404).json({status:false, msg:'user not exists!'})
        const fetch_task = await create_task.find({createdById: _id})
        if(!fetch_task) return res.status(404).json({status:false, msg:'tasks not found'})
        return res.status(200).json({status:true, msg:'successfully getting tasks', data: fetch_task})

    } catch (e) {
        console.log(e)
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}

const taskview = async(req, res, next) => {
    try {
        const {token} = req.headers;
        const {email, _id} = token_decode(token)
        const { task_id } = req.body
        const fetch_user = await create_user.findOne({_id:_id, verified: true})
        if(!fetch_user) return res.status(404).json({status:false, msg:'user not exists!'})
        if(!task_id) return res.status(404).json({status:false, msg:'Please provide task id.'})
        const fetch_task = await create_task.findOne({_id:task_id, createdById: _id})
        if(!fetch_task) return res.status(404).json({status:false, msg:'task not found'})
        return res.status(200).json({status:true, msg:'sucessfully getting task', data: fetch_task})

    } catch (e) {
        console.log(e)
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}




module.exports = {
    addtask:addtask,
    deletetask: deletetask,
    alltask: alltask,
    taskview:taskview
}
