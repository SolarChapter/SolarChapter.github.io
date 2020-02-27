const controller = new ScrollMagic.Controller();

// Waves
new ScrollMagic.Scene({
  triggerElement: ".chapter-one",
  duration: '100%'
})
  .triggerHook('onEnter')
  .setTween(".wave-one", {
    x: '0%',
    ease: Linear.easeNone
  })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: ".chapter-one",
  duration: '100%'
})
  .triggerHook('onEnter')
  .setTween(".wave-two", {
    x: '-10%',
    ease: Sine.easeIn
  })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: ".chapter-one",
  duration: '100%'
})
  .triggerHook('onEnter')
  .setTween(".wave-three", {
    x: '-40%',
    ease: Linear.easeIn
  })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: ".chapter-one",
  duration: '100%'
})
  .triggerHook('onEnter')
  .setTween(".waves", {
    height: '50%',
    ease: Sine.easeIn
  })
  .addTo(controller);

// Education gallery
const educationGallerySlides = $(".education-background-gallery");
const educationGallerySlidesWidth = educationGallerySlides.width() / 2;
$(".education-background-gallery .slide").clone().appendTo(".education-background-gallery");
$.keyframe.define([{
  name: 'education-background-carousel',
  '0%': { transform: `translate(0, -50%)` },
  '100%': { transform: `translate(-50%, -50%)` }
}]);
educationGallerySlides.playKeyframe({
  name: 'education-background-carousel',
  duration: '120s',
  timingFunction: 'linear',
  iterationCount: 'infinite',
});