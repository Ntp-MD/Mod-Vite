$(document).ready(function () {
  $(document).on("click", function (e) {
    if ($(e.target).closest(".test").length) {
      $(".test").toggleClass("active");
    } else {
      $(".test").removeClass("active");
    }
  });
});

$(document).ready(function () {
  const Target = [".test", ".test", ".test"];
  $(document).on("click", function (e) {
    Target.forEach(function (filter) {
      if ($(e.target).closest(filter).length) {
        $(filter).toggleClass("open");
      } else {
        $(filter).removeClass("open");
      }
    });
  });
});

$(document).ready(function () {
  $(document).on("click", function (e) {
    if ($(e.target).closest(".test").length) {
      $(".jelwery_cate_filter").toggleClass("open");
    } else {
      $(".jelwery_cate_filter").removeClass("open");
    }

    if ($(e.target).closest(".test2").length) {
      $(".jelwery_cate_filter2").toggleClass("open2");
    } else {
      $(".jelwery_cate_filter2").removeClass("open2");
    }
  });
});
