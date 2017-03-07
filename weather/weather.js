$(document).ready(function(){
  var tempC,tempF;

  $("#welcome").addClass("animated slideInDown");

  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position){

    var myLat = position.coords.latitude;
    var  myLon = position.coords.longitude;
    url= "https://api.apixu.com/v1/current.json?key=efb8d96e2ee047ab8ff120854170203&q=" + myLat + "," + myLon;


     $.getJSON(url,function(json){

        var city = json.location.name;
        var region = json.location.region;
        var condition = json.current.condition.text;
        tempC = json.current.temp_c;
        tempF = json.current.temp_f;
        var cond = json.current.condition.code;
        var isDay = json.current.is_day;

        function setScheme (selector, color){
          $(selector).css("color",color);
        }

        if (isDay === 0) {
          $("body").removeClass("dayGrad").addClass("nightGrad");
          $(".container").css("background-color","rgba(0,13,26, 0.5)");
          setScheme ("#welcome","#d16534");
          $("#welcome").css("text-shadow","2px 2px 2px #5f1e00");
          setScheme ("#condition","#d16534");
          $("#condition").css("text-shadow","2px 2px 2px #5f1e00");
          setScheme ("#location","#4b6e8e");
          $("#location").css("text-shadow","1px 1px 1px #000");
          setScheme("i","#4b6e8e");
          setScheme("#temp","#948516");
          $("#temp").css("text-shadow","2px 2px 2px #ffc200")
        }


    function addIcon(iconClass){
      $("#icon").addClass(iconClass);
    }

        switch(cond){
          case 1000:
            if(isDay == 1){
              addIcon("wi-day-sunny");
            } else {
              addIcon("wi-night-clear");
            }
            break;
          case 1003:
            if(isDay == 1) {
              addIcon("wi-day-sunny-overcast");
            } else {
              addIcon("wi-night-partly-cloudy");
            }
            break;
          case 1006:
          case 1009:
            if(isDay == 1) {
              addIcon("wi-day-cloudy");
            } else {
              addIcon("wi-night-alt-cloudy");
            }
            break;
          case 1030:
          case 1135:
          case 1147:
            if(isDay == 1) {
              addIcon("wi-day-fog");
            } else {
              addIcon("wi-night-fog");
            }
            break;
          case 1063:
          case 1150:
          case 1153:
            if(isDay == 1) {
              addIcon("wi-day-sprinkle");
            } else {
              addIcon("wi-night-alt-sprinkle");
            }
            break;
          case 1066:
          case 1210:
          case 1213:
          case 1216:
          case 1219:
          case 1222:
          case 1225:
          case 1255:
          case 1258:
            if(isDay == 1) {
              addIcon("wi-day-snow");
            } else {
              addIcon("wi-night-alt-snow");
            }
            break;
          case 1069:
          case 1072:
          case 1168:
          case 1171:
          case 1198:
          case 1201:
          case 1204:
          case 1207:
          case 1237:
          case 1249:
          case 1252:
            if(isDay == 1) {
              addIcon("wi-day-sleet");
            } else {
              addIcon("wi-night-alt-sleet");
            }
            break;
          case 1261:
          case 1264:
            if(isDay == 1) {
              addIcon("wi-day-hail");
            } else {
              addIcon("wi-night-alt-hail");
            }
            break;
          case 1087:
          case 1273:
          case 1276:
          case 1282:
            if(isDay == 1) {
              addIcon("wi-day-thunderstorm");
            } else {
              addIcon("wi-night-alt-thunderstorm");
            }
            break;
          case 1114:
          case 1117:
            if(isDay == 1) {
              addIcon("wi-day-snow-wind");
            } else {
              addIcon("wi-night-alt-snow-wind");
            }
            break;
          case 1180:
          case 1183:
          case 1186:
          case 1189:
          case 1192:
          case 1195:
          case 1240:
          case 1243:
          case 1246:
            if(isDay == 1) {
              addIcon("wi-day-rain");
            } else {
              addIcon("wi-night-alt-rain");
            }
            break;
          case 1279:
          case 1282:
            if(isDay == 1) {
              addIcon("wi-day-snow-thunderstorm");
            } else {
              addIcon("wi-night-alt-snow-thunderstorm");
            }
            break;
          }

        $("#location").html("<h3>" + city + ", " + region + "</h3>");
        $("#temp").html(tempF + "&degF");
        $("#condition").html("<h4>" + condition + "</h4>");

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        $("#location").addClass("animated flipInY");
        $("#temp").addClass("animated slideInRight");
        $("#icon").addClass("animated slideInLeft").one(animationEnd,function(){
          $("#icon").removeClass('animated slideInLeft');
          if (isDay == 1 && cond == 1000){
            $("#icon").addClass('spinning');
          }
        });
        $("#condition").addClass("animated zoomInUp");

        $("#tempToggle").click(function(){
          if($(this).hasClass("btn-warning")){
            $(this).removeClass("btn-warning").addClass("btn-info").html("&degC");
            $("#temp").html(tempC + "&degC");
          } else {
            $(this).removeClass("btn-info").addClass("btn-warning").html("&degF");
            $("#temp").html(tempF + "&degF");
          }
        });
     });
   });
  } else {
    alert("Location not found");
  }
});
