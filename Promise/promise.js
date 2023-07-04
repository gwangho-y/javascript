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