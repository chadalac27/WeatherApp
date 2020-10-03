$(document).ready(function () {
    $("#SearchBtn").on("click", function () {
        var searchValue = $("#search-value").val();

        // clear input box
        $("#search-value").val("");


        searchWeather(searchValue);

    });
    var history = JSON.parse(localStorage.getItem("history"))
    for (let index = 0; index < history.length; index++) {
        const element = history[index];
        $("#historyList").append("<li class = 'historyitem'>" + element + "</li>")
    }
    $(".historyitem").on("click", function () {
        searchWeather($(this).text());
    })
});
function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
}
function searchWeather(searchValue) {

    $.get(
        "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=7b128e8b987a0a3980244a4ea8d9e162&units=imperial", function (data, status) {
            //console.log(data, status)
            //info = { title: data.name, temp: data.main.temp, humidity: data.main.humidity, windspeed: data.wind.speed }

            // console.log(info)
            var date = new Date()
            var d = date.getDate()
            var m = date.getMonth() + 1
            var y = date.getFullYear()

            $("#title").html(data.name + "(" + m + "/" + d + "/" + y + ")")
            $("#temp").html("Temp " + data.main.temp + " °F")
            $("#humidity").html("Humidity " + data.main.humidity + "%")
            $("#windSpeed").html("WindSpeed " + data.wind.speed + " MPH")

        })
    $.get(
        "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=7b128e8b987a0a3980244a4ea8d9e162&units=imperial", function (data, status) {
            console.log(data, status)
            for (var index = 1; index < 6; index++) {
                var date = new Date(data.list[index].dt_txt)
                var d = date.getDate()
                var m = date.getMonth() + 1
                var y = date.getFullYear()

                $("#date" + index).html("" + m + "/" + d + "/" + y + "")
                $("#temp" + index).html("Temp " + data.list[index].main.temp + " °F")
                $("#humid" + index).html("Humidity " + data.list[index].main.humidity + "%")
                $("#img" + index).attr("src", "http://openweathermap.org/img/w/" + data.list[index].weather[0].icon + ".png");
            }
            $("#forecast").removeClass("d-none")
        }
    )
    //push history to local storage then pull from local storage 
    var history = JSON.parse(localStorage.getItem("history"))
    if (!history) {
        history = []
    }
    history.push(searchValue)
    localStorage.setItem("history", JSON.stringify(history))
    $("#historyList").append("<li class = ' '>" + searchValue + "</li>")



};
function clearWeather() {
    localStorage.clear()
    console.log("somthing")
};






// var info = {title:"",temp:0, humidity:0, windspeed:0}