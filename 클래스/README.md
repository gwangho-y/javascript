# Class
함수의 한 종류, 프로토타입 기반 객체 생성 패턴의 새로운 매커니즘


### 클래스는 어떻게 동작하나?

    class User {
        constructor(name) { this.name = name; }
        sayHi() { alert(this.name); }
    }
    
    // User가 함수라는 증거
    alert(typeof User); // function


`class User {...}` 의 문법이 하는 일
1. `User`라는 이름을 가진 함수를 만든다. 함수의 본문은 `constructor`에서 가지고 온다.
    생성자 메서드가 없으면 본문이 비워진채로 함수가 만들어 진다.
2. `sayHi` 같은 클래스 안에 정의된 메서드를 `User.prototype`에 저장한다.

`new User`로 객체를 만들고, 객체의 메서드를 호출하면 `생성자함수.prototype`에서 가지고 오는것 처럼 메서드에 접근할 수 잇다.

### 생성자 함수와 클래스의 유사성
생성자 함수를 사용해서 객체를 만드는 코드와 클래스의 코드가 상당히 유사하다.
1. 클래스의 `constructor`와 생성자 함수는 인스턴스를 생성하는데 곧 `constructor` === 생성자 함수를 의미한다.
2. 클래스의 메서드는 프로토타입에 저장되므로 클래스 메서드 === 생성자 함수를 의미한다.
3. 정적 메서드 === static 메서드도 서로 동일하다.


    const Person = (function (){
        // 생성자 함수
        function Person(name) {
            this.name = name
        }
    
        // 프로토타입 메서드
        Person.prototype.sayHi = function () {
            console.log(`Hi ${this.name}`)
        };
        
        // 정적 메서드
        Person.sayHello = function () {
            console.log('Hello!')
        };
        
        // 생성자 함수 반환
        return Person
    }())
    
    class Person {
        // 생성자
        constructor(name) {
            this.name = name        
        }
        // 프로토 타입에 저장된다.
        sayHi() {
            console.log(`Hi ${this.name}`)
        }
    
        static sayHello() {
            console.log('hello!')
        }
    }

### 클래스의 constructor 와 프로토타입의 constructor 프로퍼티
클래스의 constructor와 프로토타입의 constructor 프로퍼티는 이름이 같아서 혼동할 수 있지만 직접적인 관련이 없다.<br>
클래스를 console.dir 로 찍어보면 `constructor` 메서드는 보이지 않는데

- 클래스 `constructor` : 클래스 정의가 평가되면 기술된 동작을 하는 함수 객체 코드가 생성된다.
- 프로토타입 `constructor` 프로퍼티 : 모든 포로토타입이 가지고 있는 프로퍼티, 생성자 함수를 가리킨다. 