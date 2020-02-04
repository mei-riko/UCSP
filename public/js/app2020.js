/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
  var saleCount = 0;
  var saleType = 0;
  var saleAll = 0;
  var priceAll = 0;

  // Total Cost
  function totalResult(priceValue, saleValue) {
    var totalCost = (0, _jquery2.default)("#total-cost");
    var sale = (0, _jquery2.default)("#sale");
    var saleBtn = (0, _jquery2.default)("#saleBtn");
    var totalCostSale = (0, _jquery2.default)("#total-sale");

    totalCost.html(priceValue);
    sale.html(saleValue);
    saleBtn.html(saleValue);

    var saleCost = priceValue * (1 - saleValue / 100);
    totalCostSale.html(saleCost.toFixed(2));
  }
  // Total Sale
  function saleTotal() {
    saleAll = 0;

    var saleCountPoll = 0;
    // How many programm 
    if ((0, _jquery2.default)(".poll__row").length > 2) {
      saleType = 5;
    } else {
      saleType = 0;
    }

    // How many people
    (0, _jquery2.default)(".poll__row").each(function (i, elem) {
      var count = (0, _jquery2.default)(elem).find(".poll__input").val();

      if (count >= 5 && count < 10) {
        saleCountPoll = 10;
      } else {
        if (count >= 10) {
          saleCountPoll = 15;
        } else {
          saleCountPoll = 0;
        }
      }
      if (saleCountPoll > saleCount) {
        saleCount = saleCountPoll;
      }
    });

    saleAll = saleCount + saleType;
    console.log(saleAll);
  }
  // Total Price
  function priceTotal() {
    priceAll = 0;
    (0, _jquery2.default)(".poll__row").each(function (i, element) {
      priceAll = priceAll + (0, _jquery2.default)(element).find("option:selected").val() * (0, _jquery2.default)(element).find(".poll__input").val();
    });
  }
  // Remove Price
  function removePrice(row) {
    // parent row
    var poll = row.closest(".poll__row");
    // select option
    var price = row.find("option:selected").val();
    // how many courses
    var count = poll.find(".poll__input").val();
    // remove price
    poll.find(".poll__programm-price").html(price);

    // show a
    if (price === "0") {
      (0, _jquery2.default)(".poll__btn").removeClass("active");
    } else {
      (0, _jquery2.default)(".poll__btn").addClass("active");
    }

    priceTotal();
    saleTotal();
    totalResult(priceAll, saleAll);
  }
  // Remove Count
  function removeCount(row) {
    var poll = row.closest(".poll__row");
    var price = poll.find("option:selected").val();
    var count = poll.find(".poll__input").val();

    var priceAll = 0;

    if ((0, _jquery2.default)(".poll__row").length > 1) {
      (0, _jquery2.default)(".poll__row").each(function (i, element) {
        priceAll = priceAll + (0, _jquery2.default)(element).find("option:selected").val() * (0, _jquery2.default)(element).find(".poll__input").val();
      });
    } else {
      priceAll = price * count;
    }

    priceTotal();
    saleTotal();
    totalResult(priceAll, saleAll);
  }
  // Poll Select Change
  (0, _jquery2.default)(".poll .poll__row .poll__select").on("change", function () {
    removePrice((0, _jquery2.default)(this));
  });
  // Poll Input Change
  (0, _jquery2.default)(".poll .poll__row .poll__input").on("change", function () {
    removeCount((0, _jquery2.default)(this));
  });
  // Add Programm
  var addRowId = 2;
  (0, _jquery2.default)("#addRow").on("click", function () {
    (0, _jquery2.default)("#row-1").clone().prop("id", "row-" + addRowId).insertBefore((0, _jquery2.default)(this));
    (0, _jquery2.default)("#row-" + addRowId).find(".poll__programm-price").html("0");
    (0, _jquery2.default)("#row-" + addRowId).find(".poll__input").val(1);
    (0, _jquery2.default)("<div class='poll__delete' data-id='row-" + addRowId + "'>x</div>").appendTo("#row-" + addRowId);
    addRowId = addRowId + 1;
    // UpdateSale
    priceTotal();
    saleTotal();
    totalResult(priceAll, saleAll);

    // Poll Select Change
    (0, _jquery2.default)(".poll .poll__row .poll__select").on("change", function () {
      removePrice((0, _jquery2.default)(this));
    });
    // Poll Input Change
    (0, _jquery2.default)(".poll .poll__row .poll__input").on("change", function () {
      removeCount((0, _jquery2.default)(this));
    });
    // Delete Programm
    (0, _jquery2.default)(".poll__delete").on("click", function () {
      var rowId = (0, _jquery2.default)(this).data("id");
      (0, _jquery2.default)("#" + rowId).remove();
      priceTotal();
      saleTotal();
      totalResult(priceAll, saleAll);
    });
  });
  // Show Send Form
  (0, _jquery2.default)(".start-step .poll__btn .btn").on("click", function () {
    (0, _jquery2.default)(".start-step").slideToggle();
    (0, _jquery2.default)(".poll .poll__title").html("Сэкономить " + saleAll + "% на обучении");
    (0, _jquery2.default)(".form-step").slideToggle();
  });

  // Dropdown Navigation
  function DropdownNav() {
    (0, _jquery2.default)(".dropdown#dropdown").removeClass("active");
    (0, _jquery2.default)(".header .header__main .header__navbar#dropdownNav .header__link.active").removeClass("active");
    (0, _jquery2.default)(".dropdown#dropdown .dropdown__nav.active").removeClass("active");
  }
  // Header Nav On Desktop Screen
  var constantNav = 0;
  if ((0, _jquery2.default)(window).width() > 991) {
    constantNav = 1;
  }
  // Hide Navigation on Mobile
  (0, _jquery2.default)(window).resize(function () {
    if ((0, _jquery2.default)(window).width() > 991) {
      constantNav = 1;
      (0, _jquery2.default)(".navbar-toggler").removeClass("active");
      (0, _jquery2.default)(".header .header__content").removeClass("active");
      (0, _jquery2.default)("body").attr("style", "");
    } else {
      constantNav = 0;
    }
  });

  (0, _jquery2.default)(".header .header__main .header__navbar#dropdownNav .header__link").hover(function () {
    var link = (0, _jquery2.default)(this);
    var href = link.data("href");

    (0, _jquery2.default)(".header .header__main .header__navbar#dropdownNav .header__link.active").removeClass("active");
    (0, _jquery2.default)(".dropdown#dropdown .dropdown__nav.active").removeClass("active");

    if (href != undefined && constantNav === 1) {
      link.addClass("active");
      (0, _jquery2.default)(".dropdown#dropdown").addClass("active");
      (0, _jquery2.default)(".dropdown#dropdown .dropdown__nav#" + href).addClass("active");
    }
  });
  (0, _jquery2.default)(".header .header__top").mousemove(function () {
    DropdownNav();
  });
  (0, _jquery2.default)(".dropdown#dropdown").mouseleave(function () {
    DropdownNav();
  });

  (0, _jquery2.default)(".navbar-toggler").on("click", function () {
    (0, _jquery2.default)(this).toggleClass("active");

    if ((0, _jquery2.default)(".header .header__content").hasClass("active")) {
      (0, _jquery2.default)(".header .header__content").removeClass("active");
      (0, _jquery2.default)("body").attr("style", "");
    } else {
      (0, _jquery2.default)(".header .header__content").addClass("active");
      (0, _jquery2.default)("body").attr("style", "position: fixed; overflow: hidden;");
    }
  });

  // Masonry
  if ((0, _jquery2.default)('.news .news__grid').length > 0) {
    (0, _jquery2.default)('.news .news__grid').masonry({
      // options
      itemSelector: '.col'
    });
  }
  // Input mask
  if ((0, _jquery2.default)('.phone').length > 0) {
    (0, _jquery2.default)(".phone").inputmask({
      mask: "8 999 999 99 99",
      placeholder: " ",
      showMaskOnHover: true,
      onincomplete: function onincomplete() {
        (0, _jquery2.default)(this).closest("form").addClass('error-phone');
        (0, _jquery2.default)(this).addClass('error');
        (0, _jquery2.default)(this).siblings(".error_phone").addClass('error').html('Укажите корректный номер');
      },
      oncomplete: function oncomplete() {
        (0, _jquery2.default)(this).closest("form").removeClass('error-phone');
        (0, _jquery2.default)(this).removeClass('error');
        (0, _jquery2.default)(this).siblings(".error_phone").removeClass('error').html('');
      }
    });
  }
  (0, _jquery2.default)('input.phone').on('keydown', function (event) {
    if (event.keyCode === 13 && !(0, _jquery2.default)(this).inputmask("isComplete")) {
      event.preventDefault();
      (0, _jquery2.default)(this).blur();
      return false;
    }
  });

  // Fixed header
  if ((0, _jquery2.default)(window).scrollTop() > 300 && (0, _jquery2.default)(window).width() > 991) {
    (0, _jquery2.default)(".content_header").addClass("sticky");
    (0, _jquery2.default)(".header").addClass("sticky-menu");
    (0, _jquery2.default)(".header").fadeIn();
  }
  // Fixed header on scroll
  (0, _jquery2.default)(window).scroll(function () {
    if ((0, _jquery2.default)(window).scrollTop() > 300 && (0, _jquery2.default)(window).width() > 991) {
      (0, _jquery2.default)(".content_header").addClass("sticky");
      (0, _jquery2.default)(".header").addClass("sticky-menu");
      (0, _jquery2.default)(".header").fadeIn();
    } else if ((0, _jquery2.default)(window).scrollTop() < 50) {
      (0, _jquery2.default)(".content_header").removeClass("sticky");
      (0, _jquery2.default)(".header").css("display", "");
      (0, _jquery2.default)(".header").removeClass("sticky-menu");
    }
  });

  //IziModal
  if ((0, _jquery2.default)(".modal").length) {
    (0, _jquery2.default)(".modal").iziModal({
      closeOnEscape: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      onOpening: function onOpening() {
        (0, _jquery2.default)("input.phone").inputmask({
          mask: "8 999 999 99 99",
          placeholder: " ",
          showMaskOnHover: true,
          onincomplete: function onincomplete() {
            (0, _jquery2.default)(this).closest("form").addClass('error-phone');
            (0, _jquery2.default)(this).addClass('error');
            (0, _jquery2.default)(this).siblings(".error_phone").addClass('error').html('Укажите корректный номер');
          },
          oncomplete: function oncomplete() {
            (0, _jquery2.default)(this).closest("form").removeClass('error-phone');
            (0, _jquery2.default)(this).removeClass('error');
            (0, _jquery2.default)(this).siblings(".error_phone").removeClass('error').html('');
          }
        });
      }
    });
  }

  // Modal Programm Form
  (0, _jquery2.default)('a[data-izimodal-open="#callback1"]').on("click", function () {
    var title = (0, _jquery2.default)(this).data("title");
    console.log(title);
    (0, _jquery2.default)(".modal-callback .title").text(title);
    (0, _jquery2.default)(".modal-callback .h-title").attr("value", title);
  });

  // Form in modal
  (0, _jquery2.default)('.modal.modal_info .open-form').on("click", function () {
    var parent = (0, _jquery2.default)(this).closest('.modal_info');
    parent.find('.callback-form').addClass('active');
    parent.find('.callback-form').slideToggle();
  });
  (0, _jquery2.default)(document).on('closing', '.modal.modal_info', function (e) {
    (0, _jquery2.default)(this).find('.callback-form').removeClass('active');
    (0, _jquery2.default)(this).find('.callback-form').slideUp();
  });

  // Mobile Na
  (0, _jquery2.default)("#header__toggler").on('click', function () {
    (0, _jquery2.default)(".header__content").slideToggle();
  });
  // Toggle Tabs
  (0, _jquery2.default)('.tab-title').click(function () {
    (0, _jquery2.default)(this).toggleClass('in').next().slideToggle();
    (0, _jquery2.default)(this).parent().toggleClass('down');
    (0, _jquery2.default)('.tab-title').not(this).removeClass('in').next().slideUp();
    (0, _jquery2.default)('.tab-title').not(this).parent().removeClass('down');
    return false;
  });
  // Slider
  if ((0, _jquery2.default)(".slider").length) {
    // Slider License
    (0, _jquery2.default)('.slider.slider_license').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      prevArrow: '<a class="arrow arrow_left"></a>',
      nextArrow: '<a class="arrow arrow_right"></a>',
      dots: false,
      infinite: false,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }]
    });
    // Slider Index Page
    if ((0, _jquery2.default)("#sliderIndex").length) {
      (0, _jquery2.default)('#sliderIndex').not(".slick-initialized").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnFocus: true
      });
    }
    // Slider Review
    if ((0, _jquery2.default)(".slider.slider_reviews").length) {
      (0, _jquery2.default)(".slider_reviews").not(".slick-initialized").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: '<a class="arrow arrow_left"></a>',
        nextArrow: '<a class="arrow arrow_right"></a>',
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
    }
    // Slider Document
    (0, _jquery2.default)('.slider.slider_document').slick({
      slidesToShow: 4,
      slidesToScroll: 2,
      arrows: true,
      prevArrow: '<a class="arrow arrow_left"></a>',
      nextArrow: '<a class="arrow arrow_right"></a>',
      dots: false,
      infinite: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
  }
  // MAP
  if ((0, _jquery2.default)("#map").length > 0) {
    var init = function init() {
      var myMap = new ymaps.Map("map", {
        center: [59.893611, 30.267126],
        zoom: 17,
        controls: ["zoomControl"]
      });
      var glyphIcon = new ymaps.Placemark([59.893611, 30.267126], {
        balloonContentBody: [(0, _jquery2.default)("#map_info").html()].join(""),
        iconContent: ''
      }, {
        // Красная иконка, растягивающаяся под содержимое.
        preset: 'islands#redEducationIcon'
      });

      if ((0, _jquery2.default)(window).width() <= 799) myMap.behaviors.disable("drag");
      if ((0, _jquery2.default)(window).width() <= 799) myMap.setCenter([59.893611, 30.267126]);
      myMap.behaviors.disable("scrollZoom");
      myMap.geoObjects.add(glyphIcon);
    };

    ymaps.ready(init);
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })
/******/ ]);