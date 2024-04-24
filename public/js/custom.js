$(function () {
  // MENU
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // AOS ANIMATION
  AOS.init({
    disable: "mobile",
    duration: 800,
    anchorPlacement: "center-bottom",
  });

  // SMOOTHSCROLL NAVBAR
  $(function () {
    $(".navbar a, .hero-text a").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });
});

// // Form Submit Feature (in progress)
// const form = $("#contactForm");
// form.submit(async (event) => {
//   /* prevents default reloading of page */
//   event.preventDefault();

//   /* retrieves form data */
//   let elements = event.target.elements;
//   const data = {
//     name: elements.cfName.value,
//     email: elements.cfEmail.value,
//     message: elements.cfMessage.value,
//   };

//   const url = `${window.location.href}contact`;
//   const options = {
//     method: "POST",
//     body: data,
//     headers: new Headers(),
//   };

//   /* resets form values to blank */
//   elements.cfName.value = "";
//   elements.cfEmail.value = "";
//   elements.cfMessage.value = "";

//   /* use fetch API to send form to server */
//   const response = await fetch(url, options);
//   const status = await response.status;
//   if (status === 200) {
//     let div = document.createElement("div", { id: "form-msg" }); // this will create a div element with id = form-msg
//     div.innerHTML = "Your response has been submitted succesfullly"; // the message that will display
//     document.body.appendChild(div);
//   }
// });



