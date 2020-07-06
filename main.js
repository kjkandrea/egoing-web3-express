const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const compression = require('compression')
const template = require('./lib/template.js')
const topicRouter = require('./routes/topic')

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
app.get('/', (req, res) => {
  const title = 'Welcome'
  const description = 'Hello, Node.js'
  const list = template.list(req.list)
  const html = template.HTML(title, list,
    `
      <h2>${title}</h2>${description}
      <img style="display:block;max-width:370px;margin-top:25px;" src="/images/elia.jpg" />
    `,
    `<a href="/topic/create">create</a>`
  )
  res.send(html)
});

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

