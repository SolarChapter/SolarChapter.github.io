function setupCompositionWheel() {
  let minTop = 0;
  let maxBottom = 0;
  $(".composition-wheel").each((i, el) => {
    $(el).find("img").each((i, el) => {
      const offset = $(el).offset();
      if (i == 0 || offset.top < minTop) {
        minTop = offset.top;
      }
      const bottom = offset.top + $(el).height();
      if (bottom > maxBottom) {
        maxBottom = bottom;
      }
    });
    const height = maxBottom - minTop;
    $(el).height(height + 50);
    $(el).css({
      "margin-top": 50
    });
  });
}

$(window).ready(() => {
  setupCompositionWheel();

  $(window).on("resize", function () {
    setupCompositionWheel();
  });
});
