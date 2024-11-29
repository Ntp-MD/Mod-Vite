$(document).ready(function () {
	$(document).on('click', function (e) {
		if ($(e.target).closest('#itpMenuSideBar').length) {
			$('#ItopplusMainSidebar').toggleClass('active');
		} else {
			$('#ItopplusMainSidebar').removeClass('active');
		}
	});
});

$(document).ready(function () {
	// Execute the function immediately on page load
	$(".Template-J-PriceMember .sale-member p").html('<span>-10%</span>');

	// Re-attach the function to the hash change event
	window.onhashchange = function () {
		$(".Template-J-PriceMember  .sale-member p").html('<span>-10%</span>');
	};
});

/******/
$(document).ready(() => {
	triggerScroll();
	$(window).on('hashchange', () => setTimeout(triggerScroll, 1000));
});



if (AppName == 'AppClient') {
	$(document).ready(function () {

		$("body").css({
			"user-select": "none",
			"-webkit-user-select": "none",
			"-moz-user-select": "none",
			"-ms-user-select": "none"
		});


		$("input, textarea, select").css({
			"user-select": "text",
			"-webkit-user-select": "text",
			"-moz-user-select": "text",
			"-ms-user-select": "text"
		});


		$(document).on("contextmenu", function (event) {
			if ($(event.target).is("input, textarea, select")) {
				return;
			}
			event.preventDefault();
		});
	});

}




/******/
$(document).ready(() => {
	const modqueeContainer = document.querySelector('.modquee-contanier');
	const modqueeBox = document.querySelector('.modquee-box');
	const cloneCount = 3;
	for (let i = 0; i < cloneCount; i++) {
		const clonedContent = modqueeBox.cloneNode(true);
		modqueeContainer.appendChild(clonedContent);
	}
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
/******/



/******/
$(document).ready(function () {
	var links = document.querySelectorAll("#Contentmanager article a");
	links.forEach(function (link) {
		link.setAttribute("target", "_blank");
	});
});
/******/

/******/
$(document).ready(function () {
	$(document).on('click', function (e) {
		if ($(e.target).closest('.jelwery_cate_filter').length) {
			$('.jelwery_cate_filter').toggleClass('open');
		} else {
			$('.jelwery_cate_filter').removeClass('open');
		}
	});
});
/******/

//option 1
$(document).ready(function () {
	const Target = ['.jelwery_cate_filter', '.jelwery_style_filter', '.jelwery_metal_filter'];

	$(document).on('click', function (e) {
		Target.forEach(function (filter) {
			if ($(e.target).closest(filter).length) {
				$(filter).toggleClass('open');
			} else {
				$(filter).removeClass('open');
			}
		});
	});
});

//option 2
$(document).ready(function () {
	$(document).on('click', function (e) {
		// Handling .jelwery_cate_filter
		if ($(e.target).closest('.jelwery_cate_filter').length) {
			$('.jelwery_cate_filter').toggleClass('open');
		} else {
			$('.jelwery_cate_filter').removeClass('open');
		}

		// Handling .jelwery_cate_filter2
		if ($(e.target).closest('.jelwery_cate_filter2').length) {
			$('.jelwery_cate_filter2').toggleClass('open');
		} else {
			$('.jelwery_cate_filter2').removeClass('open');
		}

		// Handling .jelwery_cate_filter3
		if ($(e.target).closest('.jelwery_cate_filter3').length) {
			$('.jelwery_cate_filter3').toggleClass('open');
		} else {
			$('.jelwery_cate_filter3').removeClass('open');
		}
	});
});


$(function () {
	$('.test2').click(function () {
		$('.test1').css('visibility', 'visible')
	})

})


window.onhashchange = function () {
	setTimeout(function () {
		$("#title-checkout").text('การสั่งซื้อรอการชำระเงิน');
	}, 500);
}
