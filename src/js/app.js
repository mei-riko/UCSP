import $ from 'jquery'
$(document).ready(() =>{

  // Input mask
  if ($('.phone').length > 0) {
    $(".phone").inputmask({
      mask: "8 999 999 99 99",
      placeholder: " ",
      showMaskOnHover: true
    })
  }
  // Fixed header
  if ($(window).scrollTop() > 300 && $(window).width() > 991 ) {
    $(".content_header").addClass("sticky");
    $(".header").addClass("sticky-menu");
    $(".header").fadeIn();
  }
  // Fixed header on scroll
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300 && $(window).width() > 991 ) {
      $(".content_header").addClass("sticky");
      $(".header").addClass("sticky-menu");
      $(".header").fadeIn();
    } else if ($(window).scrollTop() < 200 ) {
      $(".content_header").removeClass("sticky");
      $(".header").css("display", "");
      $(".header").removeClass("sticky-menu");
    }
  });

  //IziModal
  if ($(".modal").length) {
    $(".modal").iziModal({
      closeOnEscape: true,
      overlayColor: "rgba(0, 0, 0, 0.7)",
      onOpening: function() {
        $("input.phone").inputmask({
          mask: "8 999 999 99 99",
          placeholder: " ",
          showMaskOnHover: true
        });
      }
    });
  }
  
  // Form in modal
  $('.modal.modal_info .open-form').on("click",function(){
    var parent = $(this).closest('.modal_info');
    parent.find('.callback-form').addClass('active');
    parent.find('.callback-form').slideToggle();
  });
  $(document).on('closing', '.modal.modal_info', function (e) {
      $(this).find('.callback-form').removeClass('active');
      $(this).find('.callback-form').slideUp();
  });

  // Search
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

  // Success Response Form
  $(document).on('af_complete', function (event, response) {
    var form = response.form;
    if (response.success) {}
    else {}
  });

  // Mobile Na
  $("#header__toggler").on('click', function (){
    $(".header__content").slideToggle();
  })
  

});