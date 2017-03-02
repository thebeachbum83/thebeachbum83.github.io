$(document).ready(function() {
    var randomColor;
    var quote;
    var author;
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var url = location.search;
    var quoteHash;
    var authorHash;

    window.fbAsyncInit = function() {
        FB.init({
            appId: '771928186289466',
            xfbml: true,
            version: 'v2.8'
        });
        FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    if (url){
      var quoteHashStart = url.indexOf('=')+1;
      var quoteHashEnd = url.indexOf('&');
      var authorHashStart = url.lastIndexOf('=')+1;
      var authorHashEnd = url.length;

      quoteHash = [];
      authorHash = [];

      for (i = quoteHashStart; i < quoteHashEnd; i++){
          quoteHash.push(url[i]);
      }

      for (j = authorHashStart; j < authorHashEnd; j++){
          authorHash.push(url[j]);
      }

      quoteHash = quoteHash.join('');
      authorHash = authorHash.join('');
    }

    function updateColor() {

        randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        $("i").css('color', randomColor);
        $("body").css('background-color', randomColor);
    }

    function getJson() {

        var url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

        $.ajax({
            cache: false,
            url: url,
            dataType: "json",
            success: function(json) {

                var html = "";

                json.forEach(function(val) {
                    var keys = Object.keys(val);
                    quote = val.content;
                    author = val.title;
                    html += "<div class = \"row\" id=\"quote\" ><i class = \"col-md-5 col-xs-5 fa fa-quote-left fa-2x\"></i><br><div class = \"col-md-8 col-xs-8\">" + quote + "</div></div>" + "<i class = \"col-md-1 col-xs-1 offset-md-5 offset-xs-5 fa fa-quote-right fa-2x\"></i><div class = \"row\" id = \"author\" ><strong>" + author + "</strong></div>";
                });
                $(".quote").html(html);
            }
        });
    }

    function animateIn() {

        $(".quote").addClass('animated flipInX').one(animationEnd, function() {
            $(".quote").removeClass('animated flipInX');
        });
    }

    function animateOut() {
        $(".quote").addClass('animated flipOutX').one(animationEnd,function() {
        $(".quote").removeClass('animated flipOutX');
        getJson();
        updateColor();
        $("#quoteRow").html("<div class = \"quote col-md-8 col-xs-8\"></div>");
        animateIn();
        });
    }

    function unescapeStr(string) {
        stringArray = [];
        plusIndex = [];

        string = string.replace(/%20/gi," ");
        string = string.replace(/%27/gi, "'");
        string = string.replace(/%21/gi, '?');
        string = string.replace(/%26/gi, '&');
        string = string.replace(/%2C/gi, ",");
        string = string.replace(/\+/gi, " ");
        return string;
    }

    if (quoteHash && authorHash) {

        quote = unescapeStr(quoteHash);
        author = unescapeStr(authorHash);

        updateColor();
        var urlQuoteHtml = "<div class = \"row\" id=\"quote\" ><i class = \"col-md-5 col-xs-5 fa fa-quote-left fa-2x\"></i><br><div class = \"col-md-8 col-xs-8\">" + quote + "</div></div>" + "<i class = \"col-md-1 col-xs-1 offset-md-5 offset-xs-5 fa fa-quote-right fa-2x\"></i><div class = \"row\" id = \"author\" ><strong>" + author + "</strong></div>";
        $('.quote').html(urlQuoteHtml);
        animateIn();

    } else {
        updateColor();
        getJson();
        animateIn();
    }

        $("#quoteMe").on("click", function() {
            animateOut();

        });

        $("#tweet").on("click", function() {
            quote = jQuery(quote).text();
            window.open("https://twitter.com/intent/tweet?hashtags=quotes&text=" + "\"" + quote + "\"" + " ~" + author);
        });

        $("#fb").on("click", function() {
            quote = jQuery(quote).text();

            function escapeRegExp(string) {
                string = string.replace(/ /gi,'%20');
                string = string.replace(/'/gi, '%27');
                string = string.replace(/!/, '%21');
                string = string.replace(/&/, '%26');
                return string;
            }
            console.log(quote);
            quote = escapeRegExp(quote);
            author = escapeRegExp(author);
            console.log(quote);
                    FB.ui({
                        method:'feed',
                        link:'https://thebeachbum83.github.io/quotes/quotes.html?quote=' + quoteHash + '&author=' + authorHash,
                        description:"\"" + quote + "\"" + "~" + author}, function(response){});
        });
});
