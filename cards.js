$("#sch-carddata").searcher({
    itemSelector: ".sch-card",
    textSelector: ".sch-card__name",
    inputSelector: "#cardsearchinput",
    toggle: function(item, containsText) {
      if (containsText)
          $(item).fadeIn();
      else
          $(item).fadeOut();
    }
});

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
  setTimeout(function() { window.scrollBy(0, 1) }, 200);
  setTimeout(function() { window.scrollBy(0, -1) }, 200);
}

var modalToggle = function(modalContainer, modalInner) {
  $('[data-popup-open]').on('click', function(e) {
    e.preventDefault();
    var $targeted_popup_class = $(this).attr('data-popup-open');
    $('[data-popup="' + $targeted_popup_class + '"]').css({ 'left' : '0px'}).children(modalInner).toggleClass('fade-effect').removeClass('modal-close').addClass('modal-open');
  });

  $('[data-popup-close]').on('click', function(e) {
    e.preventDefault();
    var $targeted_popup_class = $(this).attr('data-popup-close');
    $('[data-popup="' + $targeted_popup_class + '"]').css({ 'left' : '-9999px'}).children(modalInner).toggleClass('fade-effect').removeClass('modal-open').addClass('modal-close');
  });
};

modalToggle('.sch-card__modal', '.sch-card__modal--overlay');

