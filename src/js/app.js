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
  if( $('.news .news__grid').length > 0 ){
    $('.news .news__grid').masonry({
      // options
      itemSelector: '.col',
    });
  }
  // Input mask
  if( $('.phone').length > 0 ) {
    $(".phone").inputmask({
      mask: "8 999 999 99 99",
      placeholder: " ",
      showMaskOnHover: true,
      onincomplete: function(){ 
          $(this).closest("form").addClass('error-phone'); 
          $(this).addClass('error'); 
          $(this).siblings(".error_phone").addClass('error').html('Укажите корректный номер'); 
      }, 
      oncomplete: function(){ 
          $(this).closest("form").removeClass('error-phone'); 
          $(this).removeClass('error'); 
          $(this).siblings(".error_phone").removeClass('error').html(''); 
      },
    })
  }
  $('input.phone').on('keydown', function(event) {
    if (event.keyCode === 13 && !$(this).inputmask("isComplete") ) {
        event.preventDefault();
        $(this).blur();
        return false;
    }
  });

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
          showMaskOnHover: true,
          onincomplete: function(){ 
              $(this).closest("form").addClass('error-phone'); 
              $(this).addClass('error'); 
              $(this).siblings(".error_phone").addClass('error').html('Укажите корректный номер'); 
          }, 
          oncomplete: function(){ 
              $(this).closest("form").removeClass('error-phone'); 
              $(this).removeClass('error'); 
              $(this).siblings(".error_phone").removeClass('error').html(''); 
          },
        });
      }
    });
  }

  // Modal Programm Form
  $('a[data-izimodal-open="#callback1"]').on("click", function() {
    var title = $(this).data("title");
    console.log(title)
    $(".modal-callback .title").text(title);
    $(".modal-callback .h-title").attr("value", title);
  });
  
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

  // Mobile Na
  $("#header__toggler").on('click', function (){
    $(".header__content").slideToggle();
  })
  // Toggle Tabs
  $('.tab-title').click(function () {
    $(this).toggleClass('in').next().slideToggle();
    $(this).parent().toggleClass('down');
    $('.tab-title').not(this).removeClass('in').next().slideUp();
    $('.tab-title').not(this).parent().removeClass('down');
    return false;
  });
  // Slider
  if( $(".slider").length ){
    // Slider License
    $('.slider.license-slider').slick({
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
      dots: false, 
      infinite: false,
      responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
      ]
    });
    // Slider Index Page
    if( $("#sliderIndex").length ){
      $('#sliderIndex').not(".slick-initialized").slick({
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
    }
    // Slider Review
    if( $(".reviews-slider").length ){
      $(".reviews-slider").not(".slick-initialized").slick({
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
    }
  }
  // MAP
  if ($("#map").length > 0) {
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [ 59.893611, 30.267126 ],
            zoom: 17,
            controls: ["zoomControl"]
        });
        var glyphIcon = new ymaps.Placemark([ 59.893611, 30.267126 ], {
            balloonContentBody: [$("#map_info").html()].join(""),
            iconContent: ''
        }, {
            // Красная иконка, растягивающаяся под содержимое.
            preset: 'islands#redEducationIcon'
        });

        if ($(window).width() <= 799) myMap.behaviors.disable("drag");
        if ($(window).width() <= 799) myMap.setCenter([ 59.893611, 30.267126 ]);
        myMap.behaviors.disable("scrollZoom");
        myMap.geoObjects.add(glyphIcon); 
    }
  }
});