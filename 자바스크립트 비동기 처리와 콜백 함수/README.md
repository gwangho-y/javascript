promise와 asnc/await를 이해하기 위해 먼저 콜백함수와 콜백 지옥을 이해하기 위한 내용을 정리.

## 비동기 처리
알다시피 자바스크립트는 Ajax요청이나 setTimeout, 이벤트 핸들러 같은 웹 브라우져 
즉, WebApi 같은 요청들은 자바스크립트 엔진 쓰레드가 아닌 다른 쓰레드에서 동작한다.
<br/>
이런 특징으로 인해 setTimeout이나 통신 요청 같은 코드들은 실행이 완료되지 않았음에도
다음코드를 실행한다.
이러한 특징을 비동기 처리라고한다.



## 비동기 처리  사례

    function getData() {
        var tableData    
        $.get('데이터 가지고 올 url', function (response){
            tableData = response
        })
        return tableData
    }
    
    console.log(getData()) // undefined


여기서 개발자는 getData라는 함수로부터 api 통신을 요청해서 데이터가 로그로 찍히길 원했을 것이다.
하지만 undefined가 출력됐다. <br/>
<code>$.get</code> 을 만나는 순간 API 요청하는 ajax 코드는 webApi에 맡기고, <code>return tableData</code>를 먼저 실행해버리기 때문이다.
<code>tableData = response</code>가 실행되는 순간은 로그가 모두 출력되고 난 후가 된다.<br/>
결과적으로 위 코드로는 내가 원하는 코드를 돌려 받을 수 없다.


## 콜백 함수로 비동기 문제점 해결
 webApi에 맡긴 요청이 완료됐을 때 콜백함수를 호출한다면 문제를 해결할 수 있다.

    function getData(callbackFunc) {
        $.get('데이터 가지고 올 url', function (response){
            callbackFunc(response)
        })
    }
    
    getData(function (tableData){
        console.log(tableData)
    })

getData를 호출 시에 익명 콜백 함수를 인자로 전달하고  ajax의 api 요청이 끝나면 전달한 콜백함수를 호출한다.
콜백 함수를 전달함으로써 문제를 간단하게 해결 가능하다.

## 콜백 지옥
    $.get('url', function(response) {
        parseValue(response, function(id) {
            auth(id, function(result) {
                display(result, function(text) {
                    console.log(text);
                });
            });
        });
    });

특정 api 호출 후 다른 동작들을 이어서 실행시켜야한다면, 위 코드처럼 코드가 깊어지고 복잡해진다.
코드의 복잡도와 가독성이 떨어지므로 좋은 코드라고는 보기 힘든거 같다.



출처


https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/