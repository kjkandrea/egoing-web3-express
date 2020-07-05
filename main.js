const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const qs = require('querystring')
const path = require('path')
const template = require('./lib/template.js')
const sanitizeHtml = require('sanitize-html')

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
          <a href="/update?id=${sanitizedTitle}">update</a>
          <form action="delete_process" method="post">
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
  let body = '';
    req.on('data', (data) => {
        body = body + data;
    });
    req.on('end', () => {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
        res.writeHead(302, {Location: `/?id=${title}`});
        res.end();
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

/*
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');

const app = http.createServer(function(req,res){
    const _url = req.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
       else {
        
      }
    } else if(pathname === '/create'){
      
    } else if(pathname === '/create_process'){
      const body = '';
      req.on('data', function(data){
          body = body + data;
      });
      req.on('end', function(){
          const post = qs.parse(body);
          const title = post.title;
          const description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            res.writeHead(302, {Location: `/?id=${title}`});
            res.end();
          })
      });
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        const filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          const title = queryData.id;
          const list = template.list(filelist);
          const html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
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
          res.writeHead(200);
          res.end(html);
        });
      });
    } else if(pathname === '/update_process'){
      const body = '';
      req.on('data', function(data){
          body = body + data;
      });
      req.on('end', function(){
          const post = qs.parse(body);
          const id = post.id;
          const title = post.title;
          const description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              res.writeHead(302, {Location: `/?id=${title}`});
              res.end();
            })
          });
      });
    } else if(pathname === '/delete_process'){
      const body = '';
      req.on('data', function(data){
          body = body + data;
      });
      req.on('end', function(){
          const post = qs.parse(body);
          const id = post.id;
          const filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){
            res.writeHead(302, {Location: `/`});
            res.end();
          })
      });
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
});
app.listen(3000);
*/