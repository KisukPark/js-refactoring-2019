

# 1. 설치 작업

- EDIT TOOL

  - WebStorm
    - 다수의 리팩토링 기능 지원
    - IntelliJ IDEA Ultimate 에서도 지원
  - visual studio code : 
    - 주로 수작업 리팩토링

- node 10.15.1 설치

  - nvm

    - https://github.com/creationix/nvm

    - install script

    - ```bash
      curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
      ```

    - bash 

    - ```bash
      $ vi ~/.bashrc
      #export NVM_DIR="$HOME/.nvm"
      #[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
      #[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
      
      $ vi ~/.bash_profile
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
      [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
      ```

  - Node 10.15.1

    - ```
      $ nvm
      $ nvm install 10.15.1
      $ nvm use 10.15.1
      $ nvm alias default 10.15.1
      $ which node
      $ which npm
      ```

- 테스트 코드 다운로드

  - zip 파일 형태





# 2. 프로젝트 생성



Mocha 등 global 설치

```bash
$ which npm
$ npm -g install mocha
$ npm -g install eslint
$ npm -g install nyc
```



Project 생성

```bash
$ mkdir chapter1
$ cd chapter1

$ vi .gitingore
$ git init
$ git add .
$ git commit -m "init project"

$ npm init
$ vi package.json

```



package scripts : npm run test 형태로 실행.

example1:

```json
  "scripts": {
    "test": "mocha test/**/*.js",
    "coverage": "nyc --reporter=text mocha test/**/*.js",
    "test1": "mocha './test/example.test.js' -w",
    "test-spec": "mocha --reporter spec test/**/*.js"
  },
```



example2: mocha 등을 global 로 설치하지 않고 프로젝트 내에 설치하는 경우

```json
  "scripts": {
    "test": "./node_modules/.bin/mocha test/**/*.js",
    "coverage": "./node_modules/.bin/nyc --reporter=text mocha test/**/*.js",
    "test1": "./node_modules/.bin/mocha './test/example.test.js' -w",
    "test-spec": "./node_modules/.bin/mocha --reporter spec test/**/*.js"
  },
```



example js and test code:

```
$ mkdir src
$ mkdir test
$ vi src/example.js

function example(n) {
    return n;
}

module.exports = example;
$ vi test/example.test.js
var example = require('../src/example.js');
var assert = require('assert');

describe('example', async function() {

    it('should return same value', async function() {
        let result = example(1);
        assert.equal(1, result);
    });

});

$ npm install --save-dev mocha
$ npm install --save-dev chai

$ npm run coverage

```



src/example.js

```javascript

function example(n) {
    return n;
}

module.exports = example;
```



test/example.test.js

```
var example = require('../src/example.js');
var assert = require('assert');

describe('example', async function() {

    it('should return same value', async function() {
        let result = example(1);
        assert.equal(1, result);
    });

});
```





# 3. WebStorm Coverage 보기



최초 한번은 Nyc 를 실행해 주어야 WebStorm UI 에서 coverage 정보가 표시된다.

```bash
$ npm run coverage
```



throw test code :

```javascript
it('unknown play type throw test', async function() {
        let plays = {
            "leo": {"name": "Who is leo", "type": "leo"}
        };

        let invoice =
            {
                "customer": "BigCo",
                "performances" : [
                    {
                        "playID": "leo",
                        "audience": 21
                    }
                ]
            };

        assert.throws(
            function(){
                statement(invoice, plays)
            },
            Error, "Error: unknown type: null");
    });
```





# 4. What is refactoring ?



https://martinfowler.com/books/refactoring.html

#### Refactoring

Improving the Design of Existing Code

by Martin Fowler (with Kent Beck)

**Refactoring is a controlled technique for improving the design of an existing code base**. Its essence is applying a series of small behavior-preserving transformations, each of which "too small to be worth doing". However the cumulative effect of each of these transformations is quite significant. By doing them in small steps you reduce the risk of introducing errors. You also avoid having the system broken while you are carrying out the restructuring - which allows you to gradually refactor a system over an extended period of time.



https://www.techopedia.com/definition/3865/refactoring

#### Definition - What does *Refactoring* mean?

**Refactoring is the process of altering an application’s source code without changing its external behavior**. The purpose of code refactoring is to improve some of the nonfunctional properties of the code, such as readability, complexity, maintainability and extensibility.

Refactoring can extend the life of source code, preventing it from becoming legacy code. The refactoring process makes future enhancements to such code a more pleasant experience.

Refactoring is also known as reengineering.



![Image](https://learning.oreilly.com/library/view/refactoring-improving-the/9780134757681/graphics/9780134757704.jpg)



DZone - what is refactoring

https://dzone.com/articles/what-is-refactoring



