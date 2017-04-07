var navToggle = function(clickElement) {
  $("#accordion-mobile h3").click(function(){
    //slide up all the link lists
    $("#accordion-mobile ul ul").slideUp(300);
    //slide down the link list below the h3 clicked - only if its closed  
    if(!$(this).next().is(":visible")) {
      $(this).next().slideDown(300);
    }
  })
}

navToggle('#accordion-mobile h3');

var toggleAppear = function(labelClick) {
  $(labelClick).click(function() {
    $('.nav-main__mobile-close').html('<label for="nav-sidebartoggler"><p style="float: right;cursor:pointer;margin-right: 1em;">Close Main Menu <i class="fa fa-times-circle" aria-hidden="true"></i></p></label>');
  });
}

toggleAppear('#nav-main__mobile_toggle-button');

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