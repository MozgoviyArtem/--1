const moment = require('moment');
const express = require('express');
const app = express();
const HOST = 'localhost';
const PORT = 8018;

function getCurrentTimestamp(){
    return new Date(). toISOString();
}

app.get('/timestamp', (req,res) =>{
    res.json({ timestamp : getCurrentTimestamp()})
})

app.listen(PORT,HOST, ()=>{
    console.log("Сервер запущено на http://localhost:8018")
})

function getCurrentDay(){
    console.log(moment().format('dddd'))
}
function getCurrentMonth(){
    console.log(moment().format('mmm'))
}
function getCurrentYear(){
    console.log(moment().format('yyy'))
}
function getDate () {
    const now = moment();
    console.log(now.format("YYYY/MM/DD HH:mm:ss"));
}
function getCurrentWeekday() {
    const days = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];
    const today = new Date();
    console.log("Today is" , days[today.getDate()])
}
getCurrentWeekday()
getDate();
getCurrentDay();
getCurrentMonth();
getCurrentYear();