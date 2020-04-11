$(window).ready(() => {
  $(".logo-container").addClass("fade-in");

  const cloneTimes = 2;
  for (let a = 0; a < cloneTimes; a++) {
    $(".landing-full-width-gallery .slide").clone().appendTo(".landing-full-width-gallery");
  }
});