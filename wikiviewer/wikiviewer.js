$(document).ready(function(){

  var wikiQuery;

  $('.random').on('click',function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  $('.searchicon').on('click',function(){
    if ($(this).hasClass('fa-search-plus')){
      $(this).fadeOut("slow",function(){
        $(this).removeClass('fa-search-plus').addClass('fa-times').fadeIn("slow");
        $('#search').css({width: "75%",opacity: "0.5", border: "1px inset white"});
      });
      $('#search').focus();
    } else {
      $(this).fadeOut("slow",function(){
        wikiQuery = "";
        $('#search').val("");
        $('.results').fadeOut('slow',function(){
          $('.results').empty();
        });
        $(this).removeClass('fa-times').addClass('fa-search-plus').fadeIn("slow");
        $('#search').css({width: "0", opacity: "0", border: "none"});
      });
    }
  });


  function getWiki(){

      wikiQuery = $('#search').val();
      wikiQuery = encodeURIComponent(wikiQuery);

      if (wikiQuery){
        var snippet;
        var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + wikiQuery;

         $.ajax ({
           cache: false,
           url: url,
           dataType: "jsonp",
           success: function(json){

              var html = "";

              for (i = 0; i < 10; i++) {
               var title = json.query.search[i].title;
               var snippet = json.query.search[i].snippet;
               var titleUrl = encodeURIComponent(title);
               html += "<div class=\"row\"><div class=\"col-xs-10 result\"><a href=\"https://en.wikipedia.org/wiki/" + titleUrl + "\" target=\"blank\"><h3>" + title + "</h3></a>" + snippet + "</div></div>";

             $('.results').html(html);
            }
          }
         });
      }
    }

  $('#search').keyup(getWiki);

  $('#search').keypress(function(event){
    if (event.which == 13) {
      event.preventDefault();
      getWiki();
    }
  });


});
