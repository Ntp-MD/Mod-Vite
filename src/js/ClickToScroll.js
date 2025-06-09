$(document).ready(() => {
  triggerScroll();
  $(window).on("hashchange", () => setTimeout(triggerScroll, 1000));
});

function triggerScroll() {
  const $findElement = $("#section1"); //link
  if ($findElement.length) {
    $findElement.on("click", () => {
      const $targetElement = $("#itopplus-footer"); //target
      if ($targetElement.length) {
        $("html, body").animate(
          {
            scrollTop: $targetElement.offset().top,
          },
          1000
        );
      }
    });
  } else {
    setTimeout(triggerScroll, 500);
  }
}

$(document).ready(() => {
  triggerScroll();
  $(window).on("hashchange", () => setTimeout(triggerScroll, 1000));
});

function triggerScroll() {
  const $findElement = $("#section1");
  if ($findElement.length) {
    $findElement.on("click", () => {
      const scrollPercentage = 55;
      const documentHeight = $(document).height();
      const targetScrollPosition = (documentHeight * scrollPercentage) / 100;
      $("html, body").animate(
        {
          scrollTop: targetScrollPosition,
        },
        1000
      );
    });
  } else {
    setTimeout(triggerScroll, 1000);
  }
}
