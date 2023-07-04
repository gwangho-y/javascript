function getData() {
    return new Promise(function(resolve, reject) {
        reject(new Error("Request is failed"));
    });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function(err) {
    console.log(err); // Error: Request is failed
});