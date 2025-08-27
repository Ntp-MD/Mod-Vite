/*************************************************************************/
if (AppName == "AppClient") {
  setTimeout(function () {
    window.location.replace("https://nerdinsure.my.canva.site/company-website-in-white-light-blue-clean-grids-style");
  }, 5000);
}

if (AppName == "AppClient") {
  $(document).ready(function () {
    $("body").css({
      "user-select": "none",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
    });

    $("input, textarea, select").css({
      "user-select": "text",
      "-webkit-user-select": "text",
      "-moz-user-select": "text",
      "-ms-user-select": "text",
    });

    $(document).on("contextmenu", function (event) {
      if ($(event.target).is("input, textarea, select")) {
        return;
      }
      event.preventDefault();
    });
  });
}
/*************************************************************************/

/*************************************************************************/
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
/*************************************************************************/

/*************************************************************************/
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
/*************************************************************************/
//option 1
$(document).ready(function () {
  $("##formdisplay68a6a60765082400135613a6 button").text("ส่งข้อมูล");
});

$(document).ready(function () {
  setTimeout(function () {
    $("##formdisplay68a6a60765082400135613a6 button").text("ส่งข้อมูล");
    $(".form-subscribe input").attr("placeholder", "Subscribe");
  }, 200); // 500ms delay, adjust as needed
});

//option 2
window.onhashchange = function () {
  setTimeout(function () {
    $(".form-subscribe input").placeholder("Subscribe");
  }, 200);
};

//remove text place in master page
$(".itopplus-search-shopcart-name").each(function () {
  let text = $(this).text();
  let newText = text.replace("ชื่อสินค้า ", "");
  $(this).text(newText);
});

if (window.matchMedia("(min-width: 768px)").matches) {
  ScrollReveal().reveal(".right1", {
    duration: "3000",
    distance: "500px",
    origin: "right",
  });
  ScrollReveal().reveal(".left1", {
    duration: "3000",
    distance: "500px",
    origin: "left",
  });
  ScrollReveal().reveal(".top1", {
    duration: "3000",
    distance: "500px",
  });
}
