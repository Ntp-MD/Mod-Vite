//option 1
$(document).ready(function () {
  $(".test").html("<span>-10%</span>");
  window.onhashchange = function () {
    $(".test").html("<span>-10%</span>");
  };
});

//option 2
window.onhashchange = function () {
  setTimeout(function () {
    $("#test").placeholder("Please enter your telephone number");
  }, 200);
};

//remove text place in master page
$(".itopplus-search-shopcart-name").each(function () {
  let text = $(this).text();
  let newText = text.replace("ชื่อสินค้า ", "");
  $(this).text(newText);
});
