const tabContentPaddingTop = parseInt($(".tab-content").css("padding-top"));
const projectTabHeight = $("#project-tab").height();

$("a[data-toggle='tab']").on('shown.bs.tab', function (e) {
  const iframe = $(e.relatedTarget.hash).find("iframe");
  const src = iframe.attr("src");
  iframe.attr("src", "");
  iframe.attr("src", src);

  // Scroll tab content to top
  $(window).scrollTop(
    $(".tab-content").offset().top - projectTabHeight - tabContentPaddingTop
  );
});