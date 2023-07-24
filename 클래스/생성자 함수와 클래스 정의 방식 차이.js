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
})
console.log(Person)
class Person2 {
    // 생성자
    constructor(name) {
        this.name = name
    }
    // 프로토타입에 저장된다.
    sayHi() {
        console.log(`Hi ${this.name}`)
    }

    static sayHello() {
        console.log('hello!')
    }
}

console.log(Person2)