$(document).ready(function() {
    var randomColor = "";
    var quote = "";
    var author = "";

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
                    html += "<div class = \"row\" id=\"quote\" ><i class = \"col-md-5 col-xs-5 fa fa-quote-left fa-2x\"></i><br><div class = \"col-md-8 col-xs-8\"" + quote + "</div></div>" + "<i class = \"col-md-1 col-xs-1 offset-md-5 offset-xs-5 fa fa-quote-right fa-2x\"></i><div class = \"row\" id = \"author\" ><strong>" + author + "</strong></div>";
                });
                $(".quote").html(html);
            }
        });
    }

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

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

    updateColor();
    getJson();
    animateIn();

    $("#quoteMe").on("click", function() {
        animateOut();

    });

    $("#tweet").on("click", function() {
        quote = jQuery(quote).text();
        window.open("https://twitter.com/intent/tweet?hashtags=quotes&text=" + "\"" + quote + "\"" + " ~" + author);
    });

    $("#fb").on("click", function() {

        FB.login(function() {
            quote = jQuery(quote).text();

            FB.api('/me/feed', 'post', {
                message: quote + " ~" + author
            });
        }, {
            scope: 'publish_actions'
        });
    });
});