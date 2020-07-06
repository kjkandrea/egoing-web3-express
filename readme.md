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

## Middleware 사용

### body-parser 도입

### compression 도입

### 정적 파일 제공 (images/*)

### 404, 500(err) 오류 처리

### Router로 리펙토링

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

### 라우팅 HTTP

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

## 미들웨어(Middleware)

서버는 요청에서부터 응답까지 하나의 흐름을 가지고 있다. 이 요청과 응답 사이에 여러가지 역할을 하는 함수의 집합을 '미들웨어' 라고 한다.

이름 그대로 요청과 응답 사이에 있는 것이 `Middleware`라고 보아도 틀리지 않을 것이다.

[Express : 미들웨어 사용](https://expressjs.com/ko/guide/using-middleware.html)

### body-parser 미들웨어

[Express : body-parser](http://expressjs.com/en/resources/middleware/body-parser.html)

#### Install

``` 
npm install body-parser --save
```

``` javascript 
// main.js
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
```

#### 설치하지 않아도 됩니다.

현 버전 Express에는 body parser가 포함되어 있다. 다음과 같이 쓰자.

``` javascript 
app.use(express.urlencoded({ extended: false }));
```


#### How to Use

`body-parser` 미들웨어를 도입하기 전의 body를 파싱하는 소스를 살펴보자. 아래의 코드는 `post('/create')` 요청이 들어오면 해당 요청을 해석하여 파일을 만드는 코드이다.

``` javascript
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
      res.redirect(`/page/${title}`);
    });
  });
});
```

이 중 body를 해석하는 부분을 살펴보면...

``` javascript
let body = '';
req.on('data', (data) => {
    body = body + data;
});
req.on('end', () => {
    const post = qs.parse(body);
    ... // 생략
});
```

요청을 해석하기위해 body 변수를 만드는 과정이 포함되어있는데 이 과정을 `body-parser`를 통해 대체할 수 있다. 대체된 코드는 다음과 같다.

``` javascript
app.post('/create', (req, res) => {
  const post = req.body;
  const title = post.title;
  const description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
    res.redirect(`/page/${title}`);
  });
});
```

`body-parser`에서 바디를 파싱해주는 동작을 수행해줌으로서 이처럼 코드를 한층 간결하게 만들 수 있다.

## 외부 미들웨어(Middleware)

### compression (압축)

주고받는 데이터 리소스를 줄이기위해 `gzip`을 도입하는데에 쓰인다.

#### Install 

```
npm install compression --save
```

``` javascript
// main.js
const compression = require('compression')

app.use(compression())
```

#### How to Use

이후 Chrome Browser Network 탭을 살펴보면 Content-Encoding: gzip 으로 바뀐것을 볼 수 있다.

## 미들웨어(Middleware) 직접 만들기

[Express : 미들웨어 사용](https://expressjs.com/ko/guide/using-middleware.html)

### 기본 구조

미들웨어는 함수이며 request, response, next를 인자로 받는다.

``` javascript
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
```

### 방식에 따라 동작하는 미들웨어

get방식일 경우, post방식일 경우를 나누어 다음과 같이 미들웨어를 생성할 수 있다.

``` javascript
app.get('*', (req, res, next) => {
  fs.readdir('./data', (err, filelist) => {
    req.list = filelist;
    next();
  });
})
```

위처럼 첫번째 인자에 경로를 와일드카드로 설정해주면 모든 get요청에서 res.list 로 filelist에 접근할 수 있을것이다.

### 미들웨어 res.list에 접근해보기

위 미들웨어에서 `res.list` 객체가 생성되어 홈페이지를 표시하는 코드에서 다음과 같이 접근하여 사용할 수 있다.

``` javascript
app.get('/', (req, res) => {
  const list = template.list(req.list)

  res.send(list)
});
```

### 하나의 마운트 경로에 두가지 미들웨어를 로드하는 예

Express 공식 문서에 소개된 정의 방법이다.

``` javascript
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

### if문을 삽입하여 미들웨어의 흐름을 제어하는 예

Express 공식 문서에 소개된 예시이다. 예시와 같은 경우 특정 조건에 충족할 때에(`req.params.id == 0`) `next('route')` 을 호출하는 것을 볼 수 있다. if문의 조건이 충족한다면 미들웨어는 next 미들웨어를 건너뛰며, 최하단의 미들웨어를 실행하게 된다.

``` javascript 
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```

## 정적 파일 제공하기

[Express : 정적 파일 제공](https://expressjs.com/ko/starter/static-files.html)

### express.static

기본제공 미들웨어 함수인 `express.static`을 사용한다.

``` javascript
app.use(express.static('public'));
```

'public' 은 루트 디렉토리 하위에 있는 정적 파일을 담을 디렉토리 명칭이다.

이후 'public' 경로를 root 라고 생각하고 정적 리소스들을 로드할 수 있다.

``` html
<img src="/images/elia.jpg" /> <!-- ./public/images/elia.jpg -->
```

## 오류 처리

[Express : 오류처리](https://expressjs.com/ko/guide/error-handling.html)

### 404 처리

``` javascript
app.use((req, res, next) => {
  res.status(404).send('Sorry. cant find that!')
})
```

### 오류 핸들링을 위한 미들웨어

미들웨어의 4개의 인자를 가지고 있는 콜백함수는 오류를 핸들링하기 위한 미들웨어로 사용된다.

#### 오류를 캐치하는 방법

``` javascript
if(err) next(err);
```

#### 오류를 처리하는 방법

``` javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 라우터 (express.Router)

### 모듈식 마운팅

앱의 루트역할을 하는 파일이 복잡해질 경우 모듈 마운팅으로 기능을 분리할 수 있다.

`/routes/topic.js`란 파일에 topic관련 기능을 완전이 분리하여 정리하고자 할 경우를 설명한다.

#### /routes/topic.js

모듈에서 express를 다시 로드해주고 router 상수를 다음과 같이 선언한다.
가장 마지막열에서 router를 export한다.

``` javascript
// /routes/topic.js

const express = require('express')
const router = express.Router()

router.post('/create', (req, res) => {});
router.post('/update', (req, res) => {});
router.post('/delete', (req, res) => {});
router.get('/:pageId', (req, res) => {});

module.exports = router;
```

#### main.js

다음과 같이 topicRouter를 불러들이면 `routes/topic.js`모듈의 기능들이 `main.js`에 포함된다.

``` javascript
// main.js

const topicRouter = require('./routes/topic')

app.use('/topic', topicRouter);
```