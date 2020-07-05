# Node.js Express

Express는 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크입니다.

## Install 

```
npm install express --save
```

## Tutorial

Express에서 제공하는 메뉴얼을 토대로 root페이지와 about페이지를 라우팅 해보겠다.

``` javascript
const express = require('express')
const app = express()
const port = 3000

// route, routing
app.get('/', (req, res) => {
  res.send('Hello, Root!')
});

app.get('/about', (req, res) => {
  res.send('Hello, About!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
```

작성 후 http://localhost:3000 로 접속하면 root 에서는 *Hello, Root!* 가 출력되고 /about으로 접속하면 *Hello, about!* 이 정상적으로 표기된다.

### express를 도입하며 나아진 점

Node.js 만 사용할 때에는 createServer, pathname 파싱 등 몇가지 처리를 해주어야한다. 
express 프레임워크를 도입함으로서 코드가 간결해져 가독성이 좋아지고, 능률적으로 작업할 수 있게 되었다.

## Pure Node.js코드 Express로 변경하기

### root 페이지 구현 

### page/* 서브페이지 구현 

### create 기능 구현

### update 기능 구현 

## 라우팅(Routing)

### 동적 라우팅

[Express - Routing](http://expressjs.com/en/guide/routing.html) 문서를 참고하여 동적 라우팅을 다음 코드로 테스트 하여보자.

``` javascript 
app.get('/page/:pageId', (req, res) => {
  res.send(req.params)
});
```

실행 후 `http://localhost:3000/page/something` 로 접속해보면 객체가 반환되는것을 볼 수 있다.

``` json
{
  "pageId": "something"
}
```

이 말인 즉슨 `pageId`에 다음과 같이 접근 할 수 있는 것이다.

``` javascript
request.params.pageId // something
```