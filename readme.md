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

### delete 기능 구현

## 라우팅(Routing)

라우팅 이란? [위키피디아에 정의된 라우팅](https://ko.wikipedia.org/wiki/%EB%9D%BC%EC%9A%B0%ED%8C%85)은 네트워크 안에서 통신 데이터를 보낼 때 최적의 경로를 선택하는 과정이다.

내가 생각하는 Express의 라우팅은 path나 querystring을 올바르게 할당하여 각 경로 별 네이게이터 역할을 하는 path를 만들고, 경로 별로 동작을 정의하여 요청-응답을 보내는 과정이다.

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
req.params.pageId // something
```

### 라우팅 정의

`app.get()` 말고도 자주쓰는 HTTP요청에 대입하여 다음과 같은 메소드를 사용할 수 있다.

* `app.post()`
* `app.get()`
* `app.put()`
* `app.delete()`

### 라우팅 패러미터

아래의 코드를 보며 http 메소드(get, post...)가 어떤 패러미터를 받는지 열거해보자.

``` javascript
app.get('/something', function (request, response) {
  // Something
})
```

* `/something` : 첫번째 패러미터에는 서버자원을 가리키는 URI 문자열을 지정한다.
* `function (){}` : 두번째 패러미터에는 콜백형태로 라우팅 로직함수를 넣는다.

### 콜백함수 살펴보기

위의 http 메소드 내부의 콜백함수도 살펴보자.

``` javascript
function (request, response) {
  // Something
})
```

* `request` : **요청**. 첫번째 패러미터에는 객체로서 클라이언트의 정보를 담고 있다.
* `response` : **응답**. 두번째 패러미터는 클라이언트 응답을 위한 객체이다.

### 응답 종류

이번엔 http 콜백의 첫번째 인자 `response`를 해부해보겠다. response 객체는 다음의 메소드들을 품고 있다.

* `response.send()` : 문자열로 응답한다.
* `response.redirect ()` : 요청을 리다이렉션 한다.
* `response.json()` : Json 객체로 응답한다.
* `response.render()` : Jade같은 템플릿을 렌더링한다.
* `response.sendfile()` : 파일 다운로드로 응답한다.
* `res.end()` : 응답을 종료한다.
* `response.set()` : 헤더 값을 세팅한다. 세팅 후 res.send()를 호출하면 바디없이 헤더만 보낼 수 있다.

