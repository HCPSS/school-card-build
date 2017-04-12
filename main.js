var navToggle = function(clickElement) {
  $("#accordion-mobile h3").on('click', function(){
    //slide up all the link lists
    $("#accordion-mobile ul ul").slideUp(300);
    //slide down the link list below the h3 clicked - only if its closed  
    if(!$(this).next().is(":visible")) {
      $(this).next().slideDown(300);
    }
  })
}

navToggle('#accordion-mobile h3');

var toggleCloseAppear = function(labelClick, closeId, labelFor) {
  $(labelClick).click(function() {
    $(closeId).html('<label for="' + labelFor + '"><p style="float: right;cursor:pointer;margin-right: 1em;">Close Menu <i class="fa fa-times-circle" aria-hidden="true"></i></p></label>');
  });
}

toggleCloseAppear('#nav-main__mobile_toggle-button', '#nav-main__mobile--close', 'nav-sidebartoggler');

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

$("nav:first").accessibleMegaMenu({
    /* prefix for generated unique id attributes, which are required 
       to indicate aria-owns, aria-controls and aria-labelledby */
    uuidPrefix: "accessible-megamenu",

    /* css class used to define the megamenu styling */
    menuClass: "nav-main",

    /* css class for a top-level navigation item in the megamenu */
    topNavItemClass: "nav-main__item",

    /* css class for a megamenu panel */
    panelClass: "nav-main__sub",

    /* css class for a group of items within a megamenu panel */
    panelGroupClass: "nav-main__sub-group",

    /* css class for the hover state */
    hoverClass: "hover",

    /* css class for the focus state */
    focusClass: "focus",

    /* css class for the open state */
    openClass: "open"
});