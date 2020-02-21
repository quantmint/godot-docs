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
    $navbar.scroll(function () {
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

$(document).ready(() => {
  const mediaQuery = window.matchMedia('only screen and (min-width: 768px)');
  registerOnScrollEvent(mediaQuery);
  mediaQuery.addListener(registerOnScrollEvent);

  // Load instant.page to prefetch pages upon hovering. This makes navigation feel
  // snappier. The script is dynamically appended as Read the Docs doesn't have
  // a way to add scripts with a "module" attribute.

  const instantPageScript = document.createElement('script');
  instantPageScript.toggleAttribute('module');
  /*! instant.page v3.0.0 - (C) 2019 Alexandre Dieulot - https://instant.page/license */
  instantPageScript.innerText = 'let t,e;const n=new Set,o=document.createElement("link"),s=o.relList&&o.relList.supports&&o.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,i="instantAllowQueryString"in document.body.dataset,r="instantAllowExternalLinks"in document.body.dataset,a="instantWhitelist"in document.body.dataset;let c=65,d=!1,l=!1,u=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if("mousedown"==t.substr(0,"mousedown".length))d=!0,"mousedown-only"==t&&(l=!0);else if("viewport"==t.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType.includes("2g"))||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(u=!0):"viewport-all"==t&&(u=!0));else{const e=parseInt(t);isNaN(e)||(c=e)}}if(s){const n={capture:!0,passive:!0};if(l||document.addEventListener("touchstart",function(t){e=performance.now();const n=t.target.closest("a");if(!f(n))return;h(n.href)},n),d?document.addEventListener("mousedown",function(t){const e=t.target.closest("a");if(!f(e))return;h(e.href)},n):document.addEventListener("mouseover",function(n){if(performance.now()-e<1100)return;const o=n.target.closest("a");if(!f(o))return;o.addEventListener("mouseout",m,{passive:!0}),t=setTimeout(()=>{h(o.href),t=void 0},c)},n),u){let t;(t=window.requestIdleCallback?t=>{requestIdleCallback(t,{timeout:1500})}:t=>{t()})(()=>{const t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),h(n.href)}})});document.querySelectorAll("a").forEach(e=>{f(e)&&t.observe(e)})})}}function m(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||t&&(clearTimeout(t),t=void 0)}function f(t){if(t&&t.href&&(!a||"instant"in t.dataset)&&(r||t.origin==location.origin||"instant"in t.dataset)&&["http:","https:"].includes(t.protocol)&&("http:"!=t.protocol||"https:"!=location.protocol)&&(i||!t.search||"instant"in t.dataset)&&!(t.hash&&t.pathname+t.search==location.pathname+location.search||"noInstant"in t.dataset))return!0}function h(t){if(n.has(t))return;const e=document.createElement("link");e.rel="prefetch",e.href=t,document.head.appendChild(e),n.add(t)}';
  document.head.appendChild(instantPageScript);
});
