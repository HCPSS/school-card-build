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

var clearForm = function(clickElement, inputContainer, inputName) {
  $(clickElement).on('click', function(e) {
    e.preventDefault();
    $(inputContainer + ' input[name="' + inputName + '"]:checked').prop("checked", false);
  });
}

clearForm('#clear-labels', '.sch-card__categories fieldset', 'filter');

function scrollLoad() {
  setTimeout(function() { window.scrollBy(0, 1) }, 10);
  setTimeout(function() { window.scrollBy(0, -1) }, 10);
}

var modalToggle = function(modalInner) {
  $('[data-popup-open]').on('click', function(e) {
    e.preventDefault();
    var $targeted_popup_class = $(this).attr('data-popup-open');
    $('[data-popup="' + $targeted_popup_class + '"]').css({ 'left' : '0px'}).children(modalInner).toggleClass('fade-effect').removeClass('modal-close').addClass('modal-open');
  });

  $('[data-popup-close]').on('click keypress', function(e) {
    e.preventDefault();
    var $targeted_popup_class = $(this).attr('data-popup-close');
    if (a11yClick(e) === true || e.type == 'click') {
      $('[data-popup="' + $targeted_popup_class + '"]').css({ 'left' : '-9999px'}).children(modalInner).toggleClass('fade-effect').removeClass('modal-open').addClass('modal-close');
    }
  });
};

modalToggle('.sch-card__modal--overlay');