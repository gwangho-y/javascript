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