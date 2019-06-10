import $ from 'jquery'
$(document).ready(() =>{

  // Input mask
  if ($('input#phone').length > 0) {
    $("#phone").inputmask({
      mask: "8 999 999 99 99",
      placeholder: " ",
      showMaskOnHover: true
    })
  }

  if ($(window).scrollTop() > 300 ) {
    $(".content_header").addClass("sticky");
    $(".header").addClass("sticky-menu");
    $(".header").fadeIn();
  }
  
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300 ) {
      $(".content_header").addClass("sticky");
      $(".header").addClass("sticky-menu");
      $(".header").fadeIn();
    } else if ($(window).scrollTop() < 200 ) {
      $(".content_header").removeClass("sticky");
      $(".header").css("display", "");
      $(".header").removeClass("sticky-menu");
    }
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