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
        string = decodeURIComponent(string);
        string = string.replace(/\+/gi, " ");
        string = string.replace(/%C3%81/gi, "Á");
        string = string.replace(/%C3%89/gi, "É");
        string = string.replace(/%C3%8D/gi, "Í");
        string = string.replace(/%C3%93/gi, "Ó");
        string = string.replace(/%C3%9A/gi, "Ú");
        string = string.replace(/%C3%A1/gi, "á");
        string = string.replace(/%C3%A9/gi, "é");
        string = string.replace(/%C3%AD/gi, "í");
        string = string.replace(/%C3%B3/gi, "ó");
        string = string.replace(/%C3%BA/gi, "ú");
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
               string = encodeURIComponent(string);
               string = string.replace(/Á/gi,"%C3%81");
               string = string.replace(/É/gi,"%C3%89");
               string = string.replace(/Í/gi,"%C3%8D");
               string = string.replace(/Ó/gi,"%C3%93");
               string = string.replace(/Ú/gi,"%C3%9A");
               string = string.replace(/á/gi,"%C3%A1");
               string = string.replace(/é/gi,"%C3%A9");
               string = string.replace(/í/gi,"%C3%AD");
               string = string.replace(/ó/gi,"%C3%B3");
               string = string.replace(/ú/gi,"%C3%BA");

               return string;
            }

           var urlQuote = escapeRegExp(quote);
           var urlAuthor = escapeRegExp(author);

                    FB.ui({
                        method:'feed',
                        link:'https://thebeachbum83.github.io/quotes/quotes.html?quote=' + urlQuote + '&author=' + urlAuthor,
                        description:"\"" + quote + "\"" + "~" + author}, function(response){});
        });
});
