const schedule = require('node-schedule')


function setSchedule(name,date,callback) {
    schedule.scheduleJob(name,date,callback)
}

function cancelSchedule(name) {
    let myJob = schedule.scheduledJobs[name];
    myJob.cancel()
}

module.exports ={
   setSchedule,cancelSchedule
}

