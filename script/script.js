let arrow_add = vector => {
  $(".hamburger span:nth-child(1)").addClass('ham_' + vector + '_topleft');
  $(".hamburger span:nth-child(2)").addClass('ham_' + vector + '_topright');
  $(".hamburger span:nth-child(3)").addClass('ham_' + vector + '_center');
  $(".hamburger span:nth-child(4)").addClass('ham_' + vector + '_bottomleft');
  $(".hamburger span:nth-child(5)").addClass('ham_' + vector + '_bottomright');
}
let arrow_remove = vector => {
  $(".hamburger span:nth-child(1)").removeClass('ham_' + vector + '_topleft');
  $(".hamburger span:nth-child(2)").removeClass('ham_' + vector + '_topright');
  $(".hamburger span:nth-child(3)").removeClass('ham_' + vector + '_center');
  $(".hamburger span:nth-child(4)").removeClass('ham_' + vector + '_bottomleft');
  $(".hamburger span:nth-child(5)").removeClass('ham_' + vector + '_bottomright');
}

let menu_anime = (opacity, z_index, transform) => {
  $("header").css({
    "opacity": opacity,
    "z-index": z_index
  });
  $(".menu").css({
    "transform": "translateX(" + transform + "px)"
  });
}
let start= 0;
let isScrolling = 0;
let timeoutId;
let down = "down";
let up = "up";
let animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

let text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

$(window).on('load', function() {
  $(".bucket .screen").on(animationEnd, function() {
    console.log("HelloWorld");
    $(".loading").addClass('trash')
  });
});

$(function() {
  $(window).scroll(function() {
    let pos = $(this).scrollTop();
    h_boundary = start - pos;
    console.log(h_boundary);
    if (1 < h_boundary) {

      arrow_remove("down");
      arrow_add("up");

    } else if (-1 > h_boundary) {
      arrow_remove("up");
      arrow_add("down");

    } else {
      arrow_remove("up");
      arrow_remove("down");
    }
    start = pos;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      arrow_remove("up");
      arrow_remove("down");
    }, 2000);

  });
  $(".hamburger").click(function() {
    opacity = 1;
    z_index = 901;
    translateX = -300;
    menu_anime(opacity, z_index, translateX);
  });
  $(".close").click(function() {
    opacity = 0;
    z_index = -1;
    translateX = 0;
    menu_anime(opacity, z_index, translateX);
  });

  $(".clouds_cloud").click(function() {
    $(".clouds_wrap").addClass('clouds_anime');
    $(".clouds_contentwrap .text p").text(text);
  });
  $(".clouds_wrap_close").click(function() {
    $(".clouds_wrap").removeClass('clouds_anime');
  });

});
