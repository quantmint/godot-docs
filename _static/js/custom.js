// The number of pixels the user must scroll by before the logo is hidden.
const scrollTopPixels = 234;

// The margin to apply to the menu when the search bar is made fixed.
// Should roughly match the logo's height as to not hide the top menu items
// behind it.
const menuTopMargin = '330px';

// Hide the navigation bar logo when scrolling down on desktop platforms.
// The logo is quite tall, so this helps make the rest of the navigation bar
// more readable.
function registerOnScrollEvent(mediaQuery) {
  // The navigation bar that contains the logo.
  const $navbar = $('.wy-side-scroll');
  const $menu = $('.wy-menu-vertical');
  const $search = $('.wy-side-nav-search');

  // The anchor that contains the logo. This element will be hidden
  // (instead of hiding just the logo), otherwise, a small clickable area
  // would remain visible.
  const $logo = $('.wy-side-nav-search > a');

  if (mediaQuery.matches) {
    // We're on desktop; register the scroll event.
    $navbar.scroll(function() {
      if ($(this).scrollTop() >= scrollTopPixels) {
        $logo.hide();
        $search.addClass('fixed');
        $menu.css('margin-top', menuTopMargin);
      } else {
        $logo.show();
        $search.removeClass('fixed');
        $menu.css('margin-top', 0);
      }
    });
  } else {
    // We're on mobile; unregister the scroll event so the logo isn't hidden
    // when scrolling.
    $logo.show();
    $navbar.unbind('scroll');
  }
}

// Adds the light/dark theme switcher to the top of the documentation page.
function addThemeSwitcher() {
  const switcher = document.createElement('button');
  switcher.appendChild(document.createTextNode('Toggle docs theme'));
  // Disable the button's built-in interactivity
  switcher.type = 'button';

  document.getElementsByClassName('version')[0].parentElement.appendChild(switcher);
}

// If `enabled` is `true`, enables the documentation's dark theme.
function setDarkTheme(enabled) {
  document.body.classList.toggle('dark', enabled);
}

$(document).ready(() => {
  const mediaQuery = window.matchMedia('only screen and (min-width: 768px)');
  registerOnScrollEvent(mediaQuery);
  mediaQuery.addListener(registerOnScrollEvent);

  // Use matchMedia to check the user preference.
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  setDarkTheme(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query.
  prefersDark.addListener((mediaQuery) => setDarkTheme(mediaQuery.matches));

  addThemeSwitcher();
});
