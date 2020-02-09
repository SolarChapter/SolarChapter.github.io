const controller = new ScrollMagic.Controller();

// Waves
new ScrollMagic.Scene({
  triggerElement: ".chapter-one",
  duration: $(".chapter-one .card").height()
})
  .setTween(".wave-one", {
    x: '0%',
    ease: Linear.easeNone
  })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: ".chapter-one",
  duration: '100%'
})
  .setTween(".wave-two", {
    x: '-10%',
    ease: Sine.easeIn
  })
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: ".chapter-one",
  duration: '100%'
})
  .setTween(".wave-three", {
    x: '-40%',
    ease: Linear.easeIn
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
  duration: '60s',
  timingFunction: 'linear',
  iterationCount: 'infinite',
});