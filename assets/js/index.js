$(document).ready(function() {
  // Prepare waves
  $(".waves-container").height($(".waves").height());
  $(window).on(
    'resize',
    function() { $('.waves-container').height($('.waves').height()); });

  const controller = new ScrollMagic.Controller();

  // Waves
  const waveXes = [ '-20%', '-3%', '-8%' ];
  $('.waves').each(function(index) {
    const tween =
      TweenMax.to($(this), 0.5, {x : waveXes[index], ease : Linear.easeIn});

    new ScrollMagic
      .Scene({
        triggerElement : '.waves-dyn-height',
        reverse : true,
        duration : '100%'
      })
      .triggerHook('onEnter')
      .setTween(tween)
      .addTo(controller);
  });

  const windowWidth = $(window).width();
  // This is to cap the number of clone times because jQuery may not always be
  // ready to calculate width and get the correct number of clones
  const cloneTimes = 2;
  // Impacts gallery
  for (let a = 0; a < cloneTimes; a++) {
    $(".impacts-background-gallery .slide")
      .clone()
      .appendTo(".impacts-background-gallery");
  }

  // Sponsors
  for (let sponsor_carousel of document.getElementsByClassName(
    "sponsors-carousel")) {
    for (let i = 0; i < cloneTimes; i++) {
      sponsor_carousel.innerHTML += sponsor_carousel.innerHTML;
    }
  }

  // Ambassadors
  $(".ambassadors-container").css({
    "min-height" : $(".ambassadors-background").height()
  });

  $(".modal").on('hidden.bs.modal', function(e) {
    $(this).find("iframe").attr("src", $(this).find("iframe").attr("src"));
  });
});

$("#chapters-carousel").on('slide.bs.carousel', function(event) {
  const slide_index = $(event.relatedTarget).index();
  const chapter_cards = $(".chapter-card");

  for (let chapter_card of chapter_cards) {
    chapter_card.hidden = true;
  }
  chapter_cards[slide_index].hidden = false;
});
