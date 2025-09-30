const moment = require('moment');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const app = express();
const HOST = 'localhost';
const PORT = 8018;

const postsFilePath = path.join(__dirname, 'posts.json');

app.get('/posts', (req, res) => {
  fs.readFile(postsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res;
    }
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const take = req.query.take ? parseInt(req.query.take) : null;

    if ((req.query.skip && isNaN(skip)) || (req.query.take && isNaN(take))) {
      return res.status(400).json({ error: 'skip і take повинні бути числами' });
    }

    if (skip < 0 || (take !== null && take <= 0)) {
      return res.status(400).json({ error: 'skip ≥ 0, take > 0' });
    }
    posts = posts.slice(skip);

    if (take !== null) {
      posts = posts.slice(0, take);
    }

    res.json(posts);
  });
});

    
    const posts = JSON.parse(data);
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID має бути числом' });
    }

    const post = posts.find(p => p.id === id);

    if (!post) {
      return res.status(404).json({ error: 'Пост з ID не знайдено' });
    }

    res.json(post);
  });
});

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
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