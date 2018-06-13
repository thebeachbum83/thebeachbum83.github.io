var submitted=false;

$(document).ready(function() {

  $("#intro1").delay(500).fadeIn('slow').addClass('animated fadeInLeft');
  $("#intro2").delay(2000).fadeIn('slow').addClass('animated fadeInUp');
  $("#intro").delay(3500).fadeOut(1500);
  $("#body").delay(4500).fadeIn(2000);

  $(document).on("scroll",onScroll);

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

  $(".nav li:not(:first-child)").click(function() {
    $(".nav li").removeClass("active");
    $(this).addClass("active");
  });

  $(".nav a").click(function() {
  //  $(document).off("scroll");

    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash;
      });

      $('.nav-bar').css({"position":"fixed","top":0});
      $('#logo').css({"visibility":"visible"}).fadeIn('slow');

    }
  });

  $('#contact-form').on('submit',function(){
    $('#contact-form *').fadeOut(2000);
    $('#contact-form').prepend('<strong>Your message has been sent!</strong> I will contact you shortly.');
  });

  $('#logo').on('click',function(){
    window.scrollTo(0,0);
    $('#logo').css({"visibility":"hidden"});
    $('.nav-bar').css({"position":"relative"});
  });

});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    var navPos = $('.nav-bar').scrollTop();
    var jumboHeight = $('.jumbotron').outerHeight();

    console.log(scrollPos);

    if(scrollPos > jumboHeight){
      $('.nav-bar').css({"position":"fixed","top":0});
      $('#logo').css({"visibility":"visible"}).fadeIn('slow');
    } else {
      $('#logo').css({"visibility":"hidden"});
      $('.nav-bar').css({"position":"relative"});
    }
    $('.nav a').each(function() {
      var currNav = $(this);
      var refElement = $(currNav.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.nav li').removeClass("active");
        $(currNav.parent()).addClass("active");
      } else {
        $(currNav.parent()).removeClass("active");
      }
    });
  }
