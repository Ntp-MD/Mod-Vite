$(document).ready(function () {
    $(window).on('hashchange', function (e) {
        let isOpened = $(".dropdown.dropdown-sub").hasClass("open");
        if (isOpened) {
            $(".dropdown.dropdown-sub").removeClass("open");
        }
    });
});

var interval = setInterval(function () {
    $("#background67248b45937a320014096e65 input").attr("placeholder", "กรอกอีเมลของคุณ");
}, 300);


var interval = setInterval(function () {
    $("#background67248b45937a320014096e65 button span").text("รับการปรึกษาฟรี");
}, 300);




$(document).ready(function () {
    setTimeout(function () {
        $('#66308b80017a6d0012f613b6')
            .removeAttr('href')
            .attr('scroll-and-prevent-default')
            .attr('target', '_self')
            .attr('value', 'target1');
    }, 500);
});

function triggerScroll() {
    const FindElement = document.getElementById('menu66308b80017a6d0012f613a9');
    if (FindElement) {
        FindElement.addEventListener('click', () => {
            const TargetElement = document.getElementById('target1');
            if (TargetElement) {
                TargetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    } else {
        setTimeout(triggerScroll, 500);
    }
}

$(document).ready(() => {
    triggerScroll();
    $(window).on('hashchange', () => setTimeout(triggerScroll, 1000));
});






$('p').html(function (i, h) {
    return h.replace(/&nbsp;/g, '');
});

window.onhashchange = function () {
    setTimeout(function () {
        $(".panel-heading").html('span>test</span>');
    }, 1000);
}

window.onhashchange = function () {
    setTimeout(function () {
        $("#relateContentTitle").text('สินค้าอื่นๆที่น่าสนใจ');
    }, 1000);
}

