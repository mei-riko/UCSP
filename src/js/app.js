import $ from 'jquery'
$(document).ready(() =>{
  $('.real-slider').not(".slick-initialized").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {}
      },
      {
        breakpoint: 600,
        settings: {}
      }
    ]
  });

  $(".reviews-slider")
    .not(".slick-initialized")
    .slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      prevArrow: '<button class="arrow arrow-left"></button>',
      nextArrow: '<button class="arrow arrow-right"></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  // Input mask
  if ($('input#phone').length > 0) {
    $("#phone").inputmask({
      mask: "8 999 999 99 99",
      placeholder: " ",
      showMaskOnHover: true
    })
  }
  
    


  $(window).scroll(function () {
    if ($(window).scrollTop() > 500 && $(window).width() >= 1200) {
      $("header .sticky-menu").fadeIn(500);
    } else {
      $("header .sticky-menu").fadeOut(500);
    }
  });
  $("#burger").on("click", function() {
      $(".menu_list").toggle();
  });
  // search
  $("#search-global").keyup(function() {
    var search_global = $("#search-global").val();
    if (search_global.length >= 3) {
      $("#search-block-list").show();
    } else {
      $("#search-block-list").hide();
    }
  });
  $(".search_btn, .search-loop").on("click", function() {
    if ($(".search-form").css("display", "none")) {
      $(".search-form").fadeIn();
      $("#search-global").trigger("focus");
    } else {
      $("#search-global").val("");
    }
  });
  $('#search_close').on('click', function () {
    $(".search-form").fadeOut();
    $('#search-global').val('');
  });

  $(document).keydown(function (eventObject) {
    if (eventObject.which == 27) {
      $(".search-form").fadeOut();
      $('#search-global').val('');
    };
  });

  // TABS
  $('.tab-title').click(function () {
    $(this).toggleClass('in').next().slideToggle();
    $(this).parent().toggleClass('down');
    $('.tab-title').not(this).removeClass('in').next().slideUp();
    $('.tab-title').not(this).parent().removeClass('down');
    return false;
  });

  if ($(".modal-news").length) {
    $(".modal-news").iziModal({
      closeOnEscape: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      group: "news",
      navigateArrows: true,
      onClosing: function (modal_close) {
        modal_use = 0
      }
    });
  }

  var modal_use = 0;

  $('a.policy').on("click", function() {
    modal_use = 0
  });

  if ($("#callback1").length) {
    $("#callback1").iziModal({
      closeOnEscape: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      onOpening: function(modal) {
        modal_use = 1;
        $(".phone").inputmask({
          mask: "8 999 999 99 99",
          placeholder: " ",
          showMaskOnHover: true
        });
      }
    });
  }

  if ($("#terms_use").length) {
    $("#terms_use").iziModal({
      closeOnEscape: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      onClosing: function(modal_close_term) {
        if (modal_use == 1) {
          $("#callback1").iziModal("open");
        }
      }
    });
  }

  $(document).on('af_complete', function (event, response) {
    var form = response.form;
    if (response.success) {
      form.trigger("reset");
      $("#callback1").iziModal("close");
      modal_use = 0;
    } else {
    }
  });

  $('a[data-izimodal-open="#callback1"]').on("click", function() {
    // console.log("click");
    var title = $(this).data("title");
    $(".modal-callback .title").text(title);
    $(".modal-callback .h-title").attr("value", title);
  });

  // SimpleSearch ajax
  $(document).ready(function () {
    // Кнопка 
    $(".sisea-search-form").submit(function () {
      // раскоментировать если нужна кнопка
      // $("#site-search-results").load("/search-results/",$(".sisea-search-form").serialize()).slideDown("fast"); 
      return false;
    });
    // Живой поиск
    $(".sisea-search-form input").keyup(function () {
      if (this.value.length > 2) { // Пользователь набирает больше 2 символов в строке поиска
        // скрывает/отображает с результаты за пределами окна
        $(document).click(function (event) { // скрываем
          if ($(event.target).closest(".site-search-results").length) return;
          $(".site-search-results").slideUp("fast");
          //event.stopPropagation();
        });
        $('#search').click(function () { // отображаем
          $(".site-search-results").slideDown("fast");
          return false;
        });
        // ajax запрос загрузка результатов поиска от страницы и показ контейнера
        $("#site-search-results")
          .load("/search-results/", $(".sisea-search-form").serialize())
          .slideDown("fast");
      }
      else {
        // Если набрано меньше 2 символов, скрыть контейнер (CSS display:none;)
        $("#site-search-results").slideUp("fast");
      }
    });
  });

  $("section.service-main h1, h2.educational, h2.lic").on('click', function(){
    $("html, body").animate({ scrollTop: $("#plan_service").offset().top - 100 }, 1500);
  });

});