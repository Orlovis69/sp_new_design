import "babel-polyfill";
import $ from "jquery";
import "./TweenMax.min";

$(function() {
  $(".head__title").slideDown(500, function() {
    $(".station__ray-1").animate({ opacity: 1 }, 200, function() {
      $(".station__ray-2").animate({ opacity: 1 }, 200, function() {
        $(".station__ray-3").animate({ opacity: 1 }, 200, function() {
          $(".station__ray-4").animate({ opacity: 1 }, 200, function() {
            $(".station__bubble").animate({ opacity: 1 }, 200);
          });
        });
      });
    });
  });

  $(".questions__item").click(function() {
    var answer = $(this).find(".questions__answer");
    if (answer.is(":hidden")) {
      answer.slideDown(300);
      $(this).addClass("_open");
    } else {
      answer.slideUp(300, function() {
        $(this).removeAttr("style");
      });
      $(this).removeClass("_open");
    }
  });

  var $parallaxContainer = $(".parallax-container"); //our container
  var $parallaxItems = $parallaxContainer.find(".parallax"); //elements

  $(document).on("mousemove", function(event) {
    var pageX = event.pageX - $parallaxContainer.width() * 0.5;
    var pageY = event.pageY - $parallaxContainer.height() * 0.5;

    $parallaxItems.each(function() {
      var item = $(this);
      var speedX = item.data("speed-x");
      var speedY = item.data("speed-y");

      var isLayer1 = item.hasClass("layer1");

      var o = 20;

      var i = pageX / o;
      var n = pageY / o;

      if (isLayer1) {
        TweenLite.to(item, 1.0, {
          x: i,
          y: -n
        });
      } else {
        TweenLite.to(item, 2.0, {
          x: -i,
          y: n
        });
      }
    });
  });

  window.setInterval(function() {
    $parallaxItems.each(function() {
      var item = $(this);
      var speedX = item.data("speed-x");
      var speedY = item.data("speed-y");

      var isLayer1 = item.hasClass("layer1");

      var offset_rand_x = random_get(-250, 250);
      var offset_rand_y = random_get(-250, 250);

      var o = 14;

      var i = (0 + offset_rand_x) / o;
      var n = (0 + offset_rand_y) / o;

      if (isLayer1) {
        TweenLite.to(item, 3.0, {
          ease: Power0.easeNone,
          x: i,
          y: -n
        });
      } else {
        TweenLite.to(item, 3.0, {
          ease: Power0.easeNone,
          x: -i,
          y: n
        });
      }
    });
  }, 2000);
});

function random_get(min, max) {
  return Math.random() * (max - min) + min;
}
