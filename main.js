const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const compression = require('compression')
const indexRouter = require('./routes/index')
const topicRouter = require('./routes/topic')
const helmet = require('helmet')
app.use(helmet())

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(compression())

// middleware
app.get('*', (req, res, next) => {
  fs.readdir('./data', (err, filelist) => {
    req.list = filelist;
    next();
  });
})

// route, routing

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use((req, res, next) => {
  res.status(404).send('Sorry. cant find that!')
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

