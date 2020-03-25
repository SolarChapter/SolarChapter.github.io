$("a[data-toggle='tab']").on('shown.bs.tab', function (e) {
  const iframe = $(e.relatedTarget.hash).find("iframe");
  const src = iframe.attr("src");
  iframe.attr("src", "");
  iframe.attr("src", src);
});