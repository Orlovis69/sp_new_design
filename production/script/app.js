////////////////
// FAQ
const faqItems = document.querySelectorAll(".faq li");
const closeIcons = document.querySelectorAll(".icon--close-arrow");

function toggleClose(e) {
  faqItems.forEach(item => item.classList.remove("visible"));
  faqItems.forEach(item => item.classList.remove("active"));

  if (e.target.classList.contains("icon--close-arrow")) {
    const item = e.target.parentElement;
    item.classList.add("active");
    setTimeout(function() {
      item.classList.add("visible");
    }, 10);
  }
}

closeIcons.forEach(icon => icon.addEventListener("click", toggleClose));

////////////////
// SUBSCRIBE

const input = document.querySelector(".form-input");
const btn = document.querySelector(".btn--black");
const url_subscribe = "server/server.php";
// console.log(input, btn, url_subscribe);

function subscribe(e) {
  e.preventDefault();

  const subscribe_id = this.getAttribute("data-subscribe-id");
  const phone = input.value;

  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", url_subscribe, true);

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xhttp.responseType = "json";

  xhttp.onload = function() {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      console.log(json);
      document.querySelector(".error").textContent = json.error;
    }
  };

  xhttp.send(`phone=${phone}&subscribe_id=${subscribe_id}`);
}

btn.addEventListener("click", subscribe);
