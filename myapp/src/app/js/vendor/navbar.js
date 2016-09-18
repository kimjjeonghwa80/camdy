$(function(){
    $('.navbar-toggle, .navMobile').click(function(){
        $('.navbar-toggle').toggleClass('navbar-on');
        $('.navMobile').fadeToggle();
        $('.navMobile').removeClass('nav-hide');
    });
});