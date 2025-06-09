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
