/*!
 * Start Bootstrap - Creative v6.0.4 (https://startbootstrap.com/theme/creative)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
 */
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 72,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 75,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Magnific popup calls
  $("#portfolio").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    },
  });
})(jQuery); // End of use strict

const upload = async (e) => {
  e.preventDefault();
  var file0 = e.target[0].files[0];
  let reader = new FileReader();
  var content = "";

  reader.readAsText(file0);
  reader.onload = function () {
    content = reader.result;
    console.log(content);
  };
  // await ipfs.files.mkdir('/'+file0.webkitRelativePath.split('/')[0]);
  const nodeId = 'ipfs-' + Math.random()
  const node = await Ipfs.create({ repo: nodeId });
  console.log("Your node: " + nodeId);
  window.node = node;
  const status = node.isOnline() ? "online" : "offline";
  console.log(`Node status: ${status}`);
  var files = [
    {
      path: file0.webkitRelativePath,
      content,
    },
  ];
  addFile(files)
  async function addFile (files) {
      for await (const result of node.add(files)) {
          console.log(result)
      }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const nodeId = "ipfs-" + Math.random();
  const node = await Ipfs.create({ repo: nodeId });
  console.log("Your node: " + nodeId);
  window.node = node;
  const status = node.isOnline() ? "online" : "offline";
  console.log(`Node status: ${status}`);
});
