// Prepare waves
$('.waves-container').height($('.waves').height());
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
// Impacts gallery
const impactsGallerySlides = $(".impacts-background-gallery");
const impactsGallerySlidesWidthTimes = Math.ceil(windowWidth / impactsGallerySlides.width());
for (let a = 0; a < impactsGallerySlidesWidthTimes; a++) {
  $(".impacts-background-gallery .slide").clone().appendTo(".impacts-background-gallery");
}
$.keyframe.define([{
  name: 'impacts-background-carousel',
  '0%': { transform: `translate(0, -50%)` },
  '100%': { transform: `translate(-50%, -50%)` }
}]);
impactsGallerySlides.playKeyframe({
  name: 'impacts-background-carousel',
  duration: '120s',
  timingFunction: 'linear',
  iterationCount: 'infinite',
});

// Sponsors
const sponsorsCarousel = $(".sponsors-carousel");
const sponsorsCarouselWidthTimes = Math.ceil(windowWidth / sponsorsCarousel.width());
for (let a = 0; a < sponsorsCarouselWidthTimes; a++) {
  $(".sponsors-carousel .slide").clone().appendTo(".sponsors-carousel");
}
$.keyframe.define([{
  name: 'sponsors-carousel',
  '0%': { transform: `translate(0, -50%)` },
  '100%': { transform: `translate(-50%, -50%)` }
}]);
sponsorsCarousel.playKeyframe({
  name: 'sponsors-carousel',
  duration: '120s',
  timingFunction: 'linear',
  iterationCount: 'infinite',
});
