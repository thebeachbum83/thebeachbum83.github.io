$(document).ready(function() {
  $(document).on("scroll",onScroll);

  $(".nav li").click(function() {
    $(".nav li").removeClass("active");
    $(this).addClass("active");
  });

  $(".nav a").click(function() {
    $(document).off("scroll");

    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash;
      });
    }
  });
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
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
