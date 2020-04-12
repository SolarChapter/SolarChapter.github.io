$(document).ready(function() {
  // Prepare waves
  $(".waves-container").height($(".waves").height());
  $(window).on('resize', function() {
    $('.waves-container').height($('.waves').height());
  });
  
  const controller = new ScrollMagic.Controller();
  
  // Waves
  const waveXes = ['-20%', '-3%', '-8%'];
  $('.waves').each(function (index) {
    const tween = TweenMax.to(
      $(this), 0.5, {
        x: waveXes[index],
        ease: Linear.easeIn
      }
      );
      
    new ScrollMagic.Scene({
      triggerElement: '.waves-dyn-height',
      reverse: true,
      duration: '100%'
    })
    .triggerHook('onEnter')
    .setTween(tween)
    .addTo(controller);
  });
    
  const windowWidth = $(window).width();
  // This is to cap the number of clone times because jQuery may not always be ready to calculate width and get the correct number of clones
  const cloneTimes = 2;
  // Impacts gallery
  for (let a = 0; a < cloneTimes; a++) {
    $(".impacts-background-gallery .slide").clone().appendTo(".impacts-background-gallery");
  }
  
  // Sponsors
  for (let a = 0; a < cloneTimes; a++) {
    $(".sponsors-carousel .slide").clone().appendTo(".sponsors-carousel");
  }
  
  // Ambassadors
  $(".ambassadors-container").css({
    "min-height": $(".ambassadors-background").height()
  });
  
  $(".modal").on('hidden.bs.modal', function (e) {
    $(this).find("iframe").attr("src", $(this).find("iframe").attr("src"));
  });
});