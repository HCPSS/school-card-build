$('.slider').each(function() {              // For every slider
  var $this   = $(this);                    // Current slider
  var $group  = $this.find('.slide-group'); // Get the slide-group (container)
  var $slides = $this.find('.slide');       // Create jQuery object to hold all slides
  var buttonArray  = [];                    // Create array to hold navigation buttons
  var currentIndex = 0;                     // Hold index number of the current slide
  var timeout;                              // Sets gap between auto-sliding

  function move(newIndex) {          // Creates the slide from old to new one
    var animateLeft, slideLeft;      // Declare variables

    advance();                       // When slide moves, call advance() again

    // If it is the current slide / animating do nothing
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }

    buttonArray[currentIndex].removeClass('active'); // Remove class from item
    buttonArray[newIndex].addClass('active');        // Add class to new item

    if (newIndex > currentIndex) {   // If new item > current
      slideLeft = '100%';            // Sit the new slide to the right
      animateLeft = '-100%';         // Animate the current group to the left
    } else {                         // Otherwise
      slideLeft = '-100%';           // Sit the new slide to the left
      animateLeft = '100%';          // Animate the current group to the right
    }
    // Position new slide to left (if less) or right (if more) of current
    $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

    $group.animate( {left: animateLeft}, function() {    // Animate slides and
      $slides.eq(currentIndex).css( {display: 'none'} ); // Hide previous slide
      $slides.eq(newIndex).css( {left: 0} ); // Set position of the new item
      $group.css( {left: 0} );               // Set position of group of slides
      currentIndex = newIndex;               // Set currentIndex to the new image
    });
  }

  function advance() {                     // Used to set
    clearTimeout(timeout);                 // Clear previous timeout
    timeout = setTimeout(function() {      // Set new timer
      if (currentIndex < ($slides.length - 1)) { // If slide < total slides
        move(currentIndex + 1);            // Move to next slide
      } else {                             // Otherwise
        move(0);                           // Move to the first slide
      }
    }, 9000);                              // Milliseconds timer will wait
  }

  $.each($slides, function(index) {
    // Create a button element for the button
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === currentIndex) {    // If index is the current item
      $button.addClass('active');    // Add the active class
    }
    $button.on('click', function() { // Create event handler for the button
      move(index);                   // It calls the move() function
    }).appendTo('.slide-buttons');   // Add to the buttons holder
    buttonArray.push($button);       // Add it to the button array
  });

  advance();                          // Script is set up, advance() to move it


});

var main__navigationAddClose = function(menu, menuHeading, menuName) {
  if (window.matchMedia("(max-width: 450px)").matches) {
      $(menuHeading).remove();
      $(menu).prepend('<label style="float:left;margin-left:40px;width:100%;font-size: 1.17em;" class="main__navigation--close closeNav--added" for="close-main-nav">' + menuName + '<i class="fa fa-times-circle"></i></label>');
  }
}

main__navigationAddClose(".main__navigation--about", ".main__navigation--about h3", "About");
main__navigationAddClose(".main__navigation--schools", ".main__navigation--schools h3", "Schools");
main__navigationAddClose(".main__navigation--academics", ".main__navigation--academics h3", "Academics");

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

var blockToggle = function (clickElement, toggleElement) {
// great for button elements (not text) that toggle the visibility of a block
  $(clickElement).on('click keypress', function(event){
  if(a11yClick(event) === true){
    if($(toggleElement).hasClass('hide')) {
        $(toggleElement).slideToggle(0,function(){
          $(toggleElement).removeClass('hide').slideDown(300);
        });
      } else {
        $(toggleElement).slideToggle(300,function(){
          $(toggleElement).addClass('hide').removeAttr('style');
        });
      }
    }
  });
}
blockToggle('#sch-card-filter__button', '.sch-card__categories');

$("#sch-carddata").searcher({
    itemSelector: ".sch-card",
    textSelector: ".sch-card__name",
    inputSelector: "#cardsearchinput",
    toggle: function(item, containsText) {
        // use a typically jQuery effect instead of simply showing/hiding the item element
        if (containsText)
            $(item).fadeIn();
        else
            $(item).fadeOut();
    }
});

var filterItems = function() {
  var dataType = $(".sch-card__categories-container-labels input:checked").map(function(){ return this.value; }).get();
  var dataGroup = dataType.join("");
  if ($(".sch-card").is(dataGroup)) {
    $(".sch-card").hide().filter(dataGroup).fadeIn();
    var dataAmount = $(".sch-card:visible").length;
        if (dataAmount === 1) {
          $("#result-count").empty().append("<p><strong>"+ dataAmount +" school matches the criteria.</strong></p>");
        } else {
          $("#result-count").empty().append("<p><strong>"+ dataAmount +" schools match the criteria.</strong></p>");
        }
  } else {
    $("#result-count").empty().append("<p><strong>No results found.</strong></p>").fadeIn();
    $(".sch-card").hide();
  }
}

$(".sch-card__categories-container-labels input:checkbox").change(filterItems);
$(".sch-card__categories-container-labels input:radio").change(filterItems);

// displays "no results found" during search event on school cards page

var searcherResults = function() {
  var dataAmount = $(".sch-card:visible").length;
  if (dataAmount < 1) {
    $("#result-count").empty().append("<p><strong>No results found.</strong></p>");
  } else {
    $("#result-count").empty();
  }
}
$("#cardsearchinput").keyup(searcherResults);

// switches result placement on school cards page. This is based on when the sidebar with filters is shown

var filterResultPlacement = function() {
  if (window.matchMedia("(max-width: 600px)").matches) {
      if (!($('input#sidebartoggler').is(':checked'))) {
        $("#result-count").remove();
        $("#container__filter-button").after('<div style="font-size: 24px;" id="result-count"></div>'); 
      } else {
        $("#result-count").remove();
        $(".sch-card__categories #cardsearchinput").after('<div style="" id="result-count"></div>');
      }
  } else if (window.matchMedia("(min-width: 601px)").matches) {
    $(".sch-card__categories #cardsearchinput #result-count").remove();
  }
}
$('input#sidebartoggler').change(filterResultPlacement);

function scrollLoad() {
  setTimeout(function() { window.scrollBy(0, 1) }, 500);
  setTimeout(function() { window.scrollBy(0, -1) }, 500);
}

$(function() {
  $('.es-lazy, .ms-lazy, .hs-lazy, .ec-lazy, img.sch-card__modal--overlay-map-lazy').show().lazyload({ });
  $('.label-change').on('change', function() {
    if($('.sch-card__hs') || ('.sch-card__es') || ('.sch-card__ms') || ('.sch-card__ec').prop('style').display == 'block') {
      $('.hs-lazy, .es-lazy, .ms-lazy, .ec-lazy').show().lazyload({
          event: "change"
      });
    }
  });
  $("#cardsearchinput").keyup(function() {
    if($('.sch-card__hs') || ('.sch-card__es') || ('.sch-card__ms') || ('.sch-card__ec').prop('style').display == 'block') {
      $('.hs-lazy, .es-lazy, .ms-lazy, .ec-lazy').show().lazyload({
          event: "keyup"
      });
    }
  });
     
});

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

