## Promise
프로미스는 자바스크립트 비동기 처리에 사용되는 객체다. 자바스크립트는
api 요청등 webapi가 관여하는 부분에서는 비동기 처리가 일어나는데 콜백 함수로만 해결하려다보면 콜백지옥의 늪에 빠지게 된다.
프로미스를 해결하면 콜백 함수로 이루어진 코드보다는 좀 더 가독성이 좋은 코드를 짤 수 있고, 에러처리도 가능하다.

    function getData(callbackFunc) {
        $.get('데이터 가지고 올 url', function (response){
            callbackFunc(response)
        })
    }

    getData(function (tableData){
        console.log(tableData)
    })

위 코드를 아래와 같이 변경 가능하다.

    function getData(callbackFunc) {    
        return new Promise(function (resolve, reject) {
            $.get('데이터 가지고 올 url', function (response){
                // 데이터를 받으면 resolve 호출
                resolve(response)
            })
        })
    }

    // getData()의 실행이 끝나면 then() 호출
    getData().then(function (response) {
        // resolve에서 받은 결과 값이 전달
        console.log(response)
    })


Promise로 객체를 만들고, 처리가 끝나면 resolve에 데이터를 인자로 넣고,
then에서 결과를 받아 처리할 수 있다.


## 프로미스의 3가지 상태
프로미스는 3가지 상태를 가지고 있다.
- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(완료) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

3가지 상태는 코드로 다음과 같다.
- Pending   = Promise
- Fulfilled = resolve
- Rejected  = reject



### Pending (대기)
프로미스 객체를 호출하면 대기 상태가 된다. 인자로는  resolve, reject를 받는다.

    new Promise(function(resolve, reject) {
        // ...
    });


### Fulfilled (완료, 이행)
<code>resolve</code> 를 콜백에서 호출하면 완료/이행 상태가 되고 ,
<code>then</code>에서 받을 수 있다.

    function getData() {
        return new Promise(function(resolve, reject) {
            var data = 100;
            // resolve 호출 시 이행상태 진입
            resolve(data);
        });
    }
        
    // resolve()의 결과 값 data를 resolvedData로 받음
    getData().then(function(resolvedData) {
        console.log(resolvedData); // 100
    });


### Rejected (실패)
<code>reject</code> 를 콜백에서 호출하면 실패 상태가 되고 ,
<code>catch</code> 를 사용해서 에러처리를 할 수 있다.


    function getData() {
        return new Promise(function(resolve, reject) {
            reject(new Error("Request is failed"));
        });
    }
    
    // reject()의 결과 값 Error를 err에 받음
    getData().then().catch(function(err) {
        console.log(err); // Error: Request is failed
    });


### 완료 상태와 실패 시 에러처리 예제
<code>resolve, reject</code> 는 자동으로 결정되는게 아니고 개발자가 분기 처리를 해줘야한다.

    function getData() {
        return new Promise(function(resolve, reject) {
            $.get('데이터 가지고 올 url', function(response) {
                // 서버로부터 결과 받았을 시 이행 상태로
                if (response) {
                    resolve(response);
                }
                // 결과를 받지 못 했다면 실패 상태로
                reject(new Error("Request is failed"));
            });
        });
    }
    
    // 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
    getData().then(function(data) {
        console.log(data); // response 값 출력
    }).catch(function(err) {
        console.error(err); // Error 출력
    });                                                                       
                                                                        
                                                                        


### 콜백 지옥 잡기
프로미스를 사용하면 콜백지옥을 잡을 수 있는데 만약 다음코드 처럼 여러 뎁스를 타고 들어가야하는 코드를 깔끔하게 정리 할 수 있다.

    // 콜백으로만 이뤄진 코드를
    $.get('url', function(response) {
        parseValue(response, function(id) {
            auth(id, function(result) {
                display(result, function(text) {
                    console.log(text);
                });
            });
        });
    });


    // 프로미스로 로직 정리할 수 있다.
    getData(userInfo)
    .then(parseValue)
    .then(auth)
    .then(diaplay);                                               
                                                                        
                                                                        



출처

https://joshua1988.github.io/web-development/javascript/promise-for-beginners/