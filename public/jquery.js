$(document).ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    var footer = $('footer').height();
    var cityHeight = windowHeight - footer;
    $('.test-1').css('margin-top', '80px'); //Cites and Results divs
    $('.home-section').css('min-height', (windowHeight - 250));
    //$('#cities').css('min-height', cityHeight);

  };
  setHeight();

  $(window).resize(function() {
    setHeight();
  });

  var imageBanner = windowHeight - 650;
  $('#washType1').on('click' , function() {
    $('.home-section-1').css('min-height', imageBanner);
    //$('.navbar').addClass('nav-back')
    $('.home-section').css('display', 'none');
    $('.navbar').css('background-color', 'rgba(7, 7, 7, 0.8)!important');

  })
  $('#washType2').on('click' , function() {
    $('.home-section-1').css('min-height', imageBanner);
    $('.navbar').addClass('nav-back')
  })
  $('#washType3').on('click' , function() {
    $('.home-section-1').css('min-height', imageBanner);
    $('.navbar').addClass('nav-back');
  })

  $('.selectedcity').on('click' , function() {
    $('.results-last').css('display', 'block');
  });

  $(window).scroll (function () {
    var sT = $(this).scrollTop();
    if (sT >= 145) {
      $('.navbar').addClass('nav-back')
    }else {
      $('.navbar').removeClass('nav-back')
    }
  })



});