function a11yClick(event){
  // ensures that click elements in dropdown toggles can be accessed via tab, and toggled with the enter key. Thanks Karl Groves! http://www.karlgroves.com/2014/11/24/ridiculously-easy-trick-for-keyboard-accessibility/
    if(event.type === 'click'){
        return true;
    }
    else if(event.type === 'keypress'){
        var code = event.charCode || event.keyCode;
        if((code === 32)|| (code === 13)){
            return true;
        }
    }
    else{
        return false;
    }
}

var sectionArrowToggle = function(clickElement) {
  $(clickElement).on('click keypress', function(event){
  if(a11yClick(event) === true){
    if($(this).next().hasClass('hide')) {
        $(this).next().slideToggle(0,function(){
          $(this).removeClass('hide').slideDown(300);
        });
      $(this).find('.fa-angle-right').removeClass('fa-angle-right').addClass('fa-angle-down');
    } else {
        $(this).next().slideToggle(300,function(){
          $(this).addClass('hide').removeAttr('style');
        });
      $(this).find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-right');
      }
    }
  });
}
sectionArrowToggle('#list h3');
sectionArrowToggle('#list h2');
sectionArrowToggle('#sch-card__data-toggle h3');
sectionArrowToggle('#gmap--view h3');

$(function() {
    // run test on initial page load
    checkSize();
    // run test on resize of the window
    $(window).resize(checkSize); 
});

function checkSize() {
  if ($('.arrow').css('display') == 'block') {  
    $('.arrow').removeClass('fa-arrow-right').addClass('fa-arrow-down');
  } else {
    $('.arrow').removeClass('fa-arrow-down').addClass('fa-arrow-right');    
  }
};
