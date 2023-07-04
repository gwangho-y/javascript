function getData(callbackFunc) {
    $.get('데이터 가지고 올 url', function (response){
        callbackFunc(response)
    })
}

getData(function (tableData){
    console.log(tableData)
})