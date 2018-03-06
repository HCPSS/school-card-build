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

var clearChecked = function(clickElement, inputContainer, inputName) {
  $(clickElement).on('click', function(e) {
    e.preventDefault();
    var $uncheckedItems = $(inputContainer + ' input[name="' + inputName + '"]:checked').prop("checked", false).val();
    filterItems($uncheckedItems);
  });
}
clearChecked('#clear-labels', '.sch-card__categories fieldset', 'filter');

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

function scrollLoad() {
  setTimeout(function() { window.scrollBy(0, 1) }, 10);
  setTimeout(function() { window.scrollBy(0, -1) }, 10);
}

var filterPopout = function(clickElement, openElement, closeElement) {
  $(clickElement).on('click', function() {
    $(openElement).addClass('sch-card__categories--effect');
    if (window.matchMedia("(max-width: 600px)").matches) {
      $("#result-count").remove();
      $(".sch-card__categories #cardsearchinput").after('<div style="" id="result-count"></div>');
    }
  });
  $(closeElement).on('click', function() {
    $(openElement).removeClass('sch-card__categories--effect');
    if (window.matchMedia("(max-width: 600px)").matches) {
      $("#result-count").remove();
      $("#sch-container__filter-button").after('<div class="result-main" style="font-size: 24px;" id="result-count"></div>');
    }
  });
}
filterPopout('#sch-container__filter-button', '.sch-card__categories', '#sch-card__categories--close');

$(function() {
  $('.es-lazy, .ms-lazy, .hs-lazy, .ec-lazy, img.sch-card__modal--overlay-map-lazy').show().lazyload({ effect : "fadeIn" });

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

