import $ from 'jquery'
$(document).ready(() =>{
  let saleCount = 0;
  let saleType = 0;
  let saleAll = 0;
  let priceAll = 0;
  
  // Total Cost
  function totalResult(priceValue,saleValue){
    let totalCost = $("#total-cost");
    let sale = $("#sale");
    let saleBtn = $("#saleBtn");
    let totalCostSale = $("#total-sale");

    totalCost.html( priceValue );
    sale.html( saleValue );
    saleBtn.html( saleValue );
    
    let saleCost = priceValue*(1 - saleValue/100);
    totalCostSale.html( saleCost.toFixed(2) );
  }
  // Total Sale
  function saleTotal(){
    saleAll = 0

    let saleCountPoll = 0;
    // How many programm 
    if ( $(".poll__row").length > 2){ saleType = 5; }else{ saleType = 0; }

    // How many people
    $(".poll__row").each( function(i, elem){
      let count = $(elem).find(".poll__input").val();

      if( count >= 5 && count < 10 ){
        saleCountPoll = 10;
      }else{
        if ( count >= 10) { saleCountPoll = 15; } else{ saleCountPoll = 0; }
      }
      if ( saleCountPoll > saleCount ){ saleCount = saleCountPoll; }
    });

    saleAll = saleCount + saleType;
    console.log( saleAll );
  }
  // Total Price
  function priceTotal(){
    priceAll = 0;
    $(".poll__row").each(function(i, element){
      priceAll = priceAll + $(element).find("option:selected").val()*$(element).find(".poll__input").val();
    });
  }
  // Remove Price
  function removePrice( row ){
    // parent row
    let poll = row.closest(".poll__row");
    // select option
    let price = row.find("option:selected").val() ;
    // how many courses
    let count = poll.find(".poll__input").val();
    // remove price
    poll.find(".poll__programm-price").html( price );

    // show button
    if ( price === "0" ){
      $(".poll__btn").removeClass("active");
    }else{
      $(".poll__btn").addClass("active");
    }

    priceTotal();
    saleTotal();
    totalResult(priceAll, saleAll);
  }
  // Remove Count
  function removeCount( row ){
    let poll = row.closest(".poll__row");
    let price = poll.find("option:selected").val() ;
    let count = poll.find(".poll__input").val();

    let priceAll = 0;

    if ( $(".poll__row").length > 1){
      $(".poll__row").each(function(i, element){
        priceAll = priceAll + $(element).find("option:selected").val()*$(element).find(".poll__input").val();
      });
    }else{
      priceAll = price*count;
    }  

    priceTotal();
    saleTotal();
    totalResult(priceAll, saleAll);
  }
  // Poll Select Change
  $(".poll .poll__row .poll__select").on("change", function(){
    removePrice( $(this) );
  });
  // Poll Input Change
  $(".poll .poll__row .poll__input").on("change", function(){
    removeCount( $(this) );
  });
  // Add Programm
  var addRowId = 2;
  $("#addRow").on("click", function(){
    $("#row-1").clone().prop("id", "row-" + addRowId).insertBefore( $(this) );
    $("#row-" + addRowId).find(".poll__programm-price").html( "0" );
    $("#row-" + addRowId).find(".poll__input").val( 1 );
    $("<div class='poll__delete' data-id='row-"+ addRowId +"'>x</div>").appendTo("#row-" + addRowId);
    addRowId = addRowId + 1;
    // UpdateSale
    priceTotal();
    saleTotal();
    totalResult(priceAll, saleAll);

    // Poll Select Change
    $(".poll .poll__row .poll__select").on("change", function(){
      removePrice( $(this) );
    });
    // Poll Input Change
    $(".poll .poll__row .poll__input").on("change", function(){
      removeCount( $(this) );
    });
    // Delete Programm
    $(".poll__delete").on("click", function(){
      let rowId = $(this).data("id");
      $("#"+ rowId ).remove();
      priceTotal();
      saleTotal();
      totalResult(priceAll, saleAll);
    });
  });
  // Show Send Form
  $(".start-step .poll__btn .btn").on("click", function(){
    $(".start-step").slideToggle();
    $(".poll .poll__title").html("Сэкономить " + saleAll + "% на обучении");
    $(".form-step").slideToggle();
  });

  // Dropdown Navigation
  function DropdownNav(){
    $(".dropdown#dropdown").removeClass("active");
    $(".header .header__main .header__navbar#dropdownNav .header__link.active").removeClass("active");
    $(".dropdown#dropdown .dropdown__nav.active").removeClass("active");
  }
  // Header Nav On Desktop Screen
  var constantNav = 0;
  if ( $(window).width() > 991 ){
    constantNav = 1;
  }
  // Hide Navigation on Mobile
  $(window).resize(function(){
    if ( $(window).width() > 991 ){
      constantNav = 1;
      $(".navbar-toggler").removeClass("active");
      $(".header .header__content").removeClass("active");
      $("body").attr("style", "");
    }else{
      constantNav = 0;
    }
  });

  $(".header .header__main .header__navbar#dropdownNav .header__link").hover(function(){
    let link = $(this);
    let href = link.data("href");

    $(".header .header__main .header__navbar#dropdownNav .header__link.active").removeClass("active");
    $(".dropdown#dropdown .dropdown__nav.active").removeClass("active");

    if( href != undefined && constantNav === 1){
      link.addClass("active");
      $(".dropdown#dropdown").addClass("active");
      $(".dropdown#dropdown .dropdown__nav#" + href).addClass("active");
    }
  });
  $(".header .header__top").mousemove(function(){
    DropdownNav()
  });
  $(".dropdown#dropdown").mouseleave(function(){
    DropdownNav()
  });

  $(".navbar-toggler").on("click", function(){
    $(this).toggleClass("active");

    if( $(".header .header__content").hasClass("active") ){
      $(".header .header__content").removeClass("active");
      $("body").attr("style", "");
    }else{
      $(".header .header__content").addClass("active");
      $("body").attr("style", "position: fixed; overflow: hidden;");
    }
  });

  // Masonry
  if( $('.news__grid').length > 0 ){
    $('.news__grid').masonry({
      // options
      itemSelector: '.column',
    });
  }
  // Input mask
  if( $('.phone').length > 0 ) {
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
    } else if ($(window).scrollTop() < 50 ) {
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
  
  // Open Search
  $(".header__search").on("click", function() {
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