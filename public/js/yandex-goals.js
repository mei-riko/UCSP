
//YANDEXREALGOAL SUBMIT SUCCESS
$(document).on('af_complete', function (event, response) {
  var form = response.form;
  
  //Главная_Оставить_заявку gl_ost_zaya
  if (form.hasClass("form-1")) {
    form.attr('data-yareach', 'gl_ost_zaya');
  }
  //Главная_Перезвонить gl_perezvon
  if (form.hasClass("form-footer-1")) {
    form.attr('data-yareach', 'gl_perezvon');
  }
  
  //Услуги_Оставить_заявку ysl_ost_zaya
  if (form.hasClass("form-7")) {
    form.attr('data-yareach', 'ysl_ost_zaya');
  }
  //Услуги_Перезвонить ysl_perezvon
  if (form.hasClass("form-footer-7")) {
    form.attr('data-yareach', 'ysl_perezvon');
  }
  
  
  if (form.hasClass("form-20")||form.hasClass("form-footer-20")) {
    form.attr('data-yareach', 'per_pomoshh');
  }  
  if (form.hasClass("form-18")||form.hasClass("form-footer-18")) {
    form.attr('data-yareach', 'prom_bez');
  }
  if (form.hasClass("form-14")||form.hasClass("form-footer-14")) {
    form.attr('data-yareach', 'pov_kvalifik');
  }
  if (form.hasClass("form-21")||form.hasClass("form-footer-21")) {
    form.attr('data-yareach', 'profperep');
  }
  if (form.hasClass("form-27")||form.hasClass("form-footer-27")) {
    form.attr('data-yareach', 'oxrana_tr');
  }
  if (form.hasClass("form-19")||form.hasClass("form-footer-19")) {
    form.attr('data-yareach', 'oxrana_tr_vyis');
  }
  if (form.hasClass("form-12")||form.hasClass("form-footer-12")) {
    form.attr('data-yareach', 'poz_tex_min');
  }
  if (form.hasClass("form-26")||form.hasClass("form-footer-26")) {
    form.attr('data-yareach', 'elektrobez');
  }
  if (form.hasClass("form-22")||form.hasClass("form-footer-22")) {
    form.attr('data-yareach', 'rab_spec');
  }
  if (form.hasClass("form-29")||form.hasClass("form-footer-29")) {
    form.attr('data-yareach', 'pom_sro');
  }
  // Разработка документов по охране труда
  if (form.hasClass("form-23")||form.hasClass("form-footer-23")) {
    form.attr('data-yareach', 'oxrana_tr');
  }
  // Судебное представительство и правовой анализ документов
  if (form.hasClass("form-30")||form.hasClass("form-footer-30")) {
    form.attr('data-yareach', 'prom_bez');
  }
  if (form.hasClass("form-25")||form.hasClass("form-footer-25")) {
    form.attr('data-yareach', 'celevoe_obych');
  }
    //   Рабочи специальности
  if (
      form.hasClass("form-22")||form.hasClass("form-footer-22")||
      form.hasClass("form-31")||form.hasClass("form-footer-31")||
      form.hasClass("form-70")||form.hasClass("form-footer-70")||
      form.hasClass("form-32")||form.hasClass("form-footer-32")||
      form.hasClass("form-49")||form.hasClass("form-footer-49")||
      form.hasClass("form-50")||form.hasClass("form-footer-50")||
      form.hasClass("form-72")||form.hasClass("form-footer-72")||
      form.hasClass("form-73")||form.hasClass("form-footer-73")||
      form.hasClass("form-74")||form.hasClass("form-footer-74")
      ) {
    form.attr('data-yareach', 'rab_spec');
  }

  if (response.success) {
    if (form.data('yareach') && typeof yaCounter49976215 != 'undefined') {
    //   console.log(form.data('yareach'));
      yaCounter49976215.reachGoal(form.data('yareach'));
    }
    function gtag_report_conversion(url) {
      var callback = function () {
        if (typeof (url) != 'undefined') {
          window.location = url;
        }
      };
      gtag('event', 'conversion', {
        'send_to': 'AW-792295293/CWglCPCJ9YgBEP3u5fkC',
        'transaction_id': '',
        'event_callback': callback
      });
      return false;
    }
  }
});