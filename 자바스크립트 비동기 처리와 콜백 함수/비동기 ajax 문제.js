function getData() {
    var tableData
    $.get('데이터 가지고 올 url', function (response){
        tableData = response
    })
    return tableData
}

console.log(getData()) // undefined