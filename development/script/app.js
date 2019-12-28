////////////////
// FAQ
const faqItems = document.querySelectorAll(".faq li");

function toggleClose(e) {
  const item = this;
  this.classList.toggle("active");
  setTimeout(function() {
    item.classList.toggle("visible");
  }, 10);
}

faqItems.forEach(item => item.addEventListener("click", toggleClose));

////////////////
// SUBSCRIBE
const input = document.querySelector(".form-input");
const btn = document.querySelector(".btn--black");
const url_subscribe = "server/server.php";
const form = document.querySelector(".form");
const messageBlock = document.querySelector(".error");

function subscribe(e) {
  e.preventDefault();
  input.classList.remove("__error");

  const subscribe_id = this.getAttribute("data-subscribe-id");
  const phone = parseInt(input.value.match(/[0-9]/g).join(""));

  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", url_subscribe, true);

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xhttp.responseType = "json";

  xhttp.onload = function() {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);

      // success message
      if (json.ok === 1) {
        // when completed we can move away
        form.parentElement.innerHTML = `
          <p class="paragraph success">
            Cпасибо, что вы с нами!<br />На указанный номер отправили смс с инструкцией
          </p>
        `;
      } else {
        messageBlock.textContent = json.error;
        input.classList.add("__error");
      }
    }
  };

  xhttp.send(`phone=${phone}&subscribe_id=${subscribe_id}`);
}

btn.addEventListener("click", subscribe);
