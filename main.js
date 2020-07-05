const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const qs = require('querystring')
const bodyParser = require('body-parser')
const path = require('path')
const template = require('./lib/template.js')
const sanitizeHtml = require('sanitize-html')

app.use(bodyParser.urlencoded({ extended: false }));

// route, routing
app.get('/', (req, res) => {
  fs.readdir('./data', (err, filelist) => {
    const title = 'Welcome'
    const description = 'Hello, Node.js'
    const list = template.list(filelist)
    const html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    )
    res.send(html)
  });
});

app.get('/page/:pageId', (req, res) => {
  fs.readdir('./data', (err, filelist) => {
    const filteredId = path.parse(req.params.pageId).base
    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
      const title = req.params.pageId;
      const sanitizedTitle = sanitizeHtml(title);
      const sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      const list = template.list(filelist)
      const html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      res.send(html)
    });
  });
});

app.get('/create', (req, res) => {
  fs.readdir('./data', (err, filelist) => {
    const title = 'WEB - create';
    const list = template.list(filelist);
    const html = template.HTML(title, list, `
      <form action="/create" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    res.send(html);
  });
});

app.post('/create', (req, res) => {
  const post = req.body
  const title = post.title
  const description = post.description
  fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
    res.redirect(`/page/${title}`);
  });
});

app.get('/update/:pageId', (req, res) => {
  fs.readdir('./data', function(err, filelist){
    const filteredId = path.parse(req.params.pageId).base
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      const title = req.params.pageId
      const list = template.list(filelist)
      const html = template.HTML(title, list,
        `
        <form action="/update" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );
      res.send(html);
    });
  });
});

app.post('/update', (req, res) => {
  const post = req.body
  const id = post.id
  const title = post.title
  const description = post.description
  fs.rename(`data/${id}`, `data/${title}`, function(err){
    fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
      res.redirect(`/page/${title}`);
    })
  });
});

app.post('/delete', (req, res) => {
  const post = req.body
  const id = post.id
  const filteredId = path.parse(id).base
  fs.unlink(`data/${filteredId}`, (err) => {
    res.redirect(`/`);
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

