////////////////
// FAQ
const faqItems = document.querySelectorAll(".faq li");
// const closeIcons = document.querySelectorAll(".icon--close-arrow");

function toggleClose(e) {
  // faqItems.forEach(item => item.classList.remove("visible"));
  // faqItems.forEach(item => item.classList.remove("active"));

  // if (!e.target.classList.contains("active")) {
  const item = this;
  this.classList.toggle("active");
  setTimeout(function() {
    item.classList.toggle("visible");
  }, 10);
  // } else {
  // }
  // if (
  //   e.target.classList.contains("icon--close-arrow") ||
  //   e.target.classList.contains("faq-title")
  // ) {
  //   const item = e.target.parentElement;
  //   item.classList.add("active");
  //   setTimeout(function() {
  //     item.classList.add("visible");
  //   }, 10);
  // }
}

// closeIcons.forEach(icon => icon.addEventListener("click", toggleClose));
faqItems.forEach(item => item.addEventListener("click", toggleClose));

////////////////
// SUBSCRIBE

const input = document.querySelector(".form-input");
const btn = document.querySelector(".btn--black");
const url_subscribe = "server/server.php";
const form = document.querySelector(".form");
const messageBlock = document.querySelector(".error");
// console.log(input, btn, url_subscribe);

function subscribe(e) {
  e.preventDefault();
  input.classList.remove("__error");

  const subscribe_id = this.getAttribute("data-subscribe-id");
  const phone = parseInt(input.value.match(/[0-9]/g).join(""));
  console.log(phone);

  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", url_subscribe, true);

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xhttp.responseType = "json";

  xhttp.onload = function() {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      console.log(json);
      messageBlock.textContent = json.error;
      messageBlock.style.display = "block";
      input.classList.add("__error");
    }
    // // success message
    // if (this.readyState == 4 && this.status == 200) {
    //   // when completed we can move away
    //   form.innerHTML = `
    //       <p class="paragraph">${this.status}</p>
    //     `;
    // }
  };

  xhttp.send(`phone=${phone}&subscribe_id=${subscribe_id}`);
}

btn.addEventListener("click", subscribe);
