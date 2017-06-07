$(document).ready(function(){
  var streamers = ["comster404","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var html = "";
  var live = "";
  var id;

function currentlyStreaming (id,streaming,bio) {
  $(id).hover(function(){
  $(id+' .card-block').html(streaming);
  $(id+' .card-block').addClass('card-inverse card-success text-center');
},function(){
  $(id+' .card-block').html(bio);
  $(id+' .card-block').removeClass('card-inverse card-success text-center');
});
}

function liveStreaming (id,streaming,bio){
  $('#live '+id).hover(function(){
  $('#live '+id+' .card-block').html(streaming);
  $('#live '+id+' .card-block').addClass('card-inverse card-success text-center');
},function(){
  $('#live '+id+' .card-block').html(bio);
  $('#live '+id+' .card-block').removeClass('card-inverse card-success text-center');
});
}

function errorHover(){
    $('#all .error').hover(function(){
      $('#all .error .card-block').addClass('card-inverse card-danger text-center');
    },function(){
      $('#all .error .card-block').removeClass('card-inverse card-danger');
    });

    $('#offline .error').hover(function(){
      $('#offline .error .card-block').addClass('card-inverse card-danger text-center');
    },function(){
      $('#offline .error .card-block').removeClass('card-inverse card-danger');
    });
  }

  function getJson(){
    streamers.forEach(function(streamer){
      function channelUrl(type,name){
        return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
      }

      $.getJSON(channelUrl("users",streamer),
        function(data){
          var bio,name;
          name = data.display_name;
          bio = data.bio;
          id = data._id;

          if (data.error) {
            html += "<div class='card card-outline-danger error'><h2 class='card-header'>" + streamer + "</h2><div class='card-block'>This streamer has either closed their account or does not exist</div><div class='card-footer'><div class='btn btn-danger'>Invalid Streamer</div></div></div>";
          } else if (bio){
            html += "<div class='card card-outline-warning' id=" + id + "><h2 class='card-header'>" + name + "</h2><div class='card-block'>" + bio + "</div><div class='card-footer'></div></div>";
          } else {
            html += "<div class='card card-outline-warning' id=" + id + "><h2 class='card-header'>" + name + "</h2><div class='card-block'></div><div class='card-footer'></div></div>";
          }
          $("#all .card-deck").html(html);
          $('#offline .card-deck').html(html);

          $.getJSON(channelUrl("streams",streamer),
            function(data) {
              var game,status,streaming;

              if (data.stream) {
                id = "#" + data.stream.channel._id;
                var footerId = "#" + data.stream.channel._id + " .card-footer";
                game = data.stream.game;
                status = "online";
                streaming = "Currently Streaming: " + game + "<br>" + data.stream.channel.status;

                $(id).removeClass('card-outline-warning');
                $(id).addClass("card-outline-success");
                $('#offline '+id).remove();
                $(id).clone().appendTo('#live .card-deck');

                liveStreaming(id,streaming,bio);
                currentlyStreaming(id,streaming,bio);
              }
            }
          );

          errorHover();

          $.getJSON(channelUrl("channels",streamer),
            function(data){
              var url = data.url;
              var idFooter = "#" + data._id + " .card-footer";
              var channelLink = "<a href='" + url + "' target='_blank' class='btn btn-primary'>Go to Channel</a>";
              $(idFooter).prepend(channelLink);
              $('#live '+idFooter).prepend(channelLink);
              $('#offline '+idFooter).prepend(channelLink);
            });
        });
    });
  }

  getJson();
});
