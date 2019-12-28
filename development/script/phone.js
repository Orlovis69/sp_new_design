class PhoneField {
  constructor(a, b = "+7(___)___-____", c = "_") {
    (this.handler = a),
      (this.mask = b),
      (this.placeholder = c),
      this.setLength(),
      this.setStartValue(),
      (this.start = this.placeHolderPosition() - 1),
      this.handler.addEventListener("focusin", () => {
        this.setValue();
        this.focused();
      }),
      this.handler.addEventListener("blur", () => {
        this.blured();
      }),
      this.handler.addEventListener("keydown", d => {
        this.input(d);
      });
  }
  blured() {
    const noInput = this.handler.value.match(/[0-9]/g).join("");
    if (noInput === "7") {
      this.handler.value = "";
    }
  }
  focused() {
    let a = this.placeHolderPosition();
    (this.handler.selectionStart = a), (this.handler.selectionEnd = a);
  }
  input(a) {
    if ((this.isDirectionKey(a.key) || a.preventDefault(), this.isNum(a.key)))
      this.changeChar(a.key);
    else if (this.isDeletionKey(a.key))
      if ("Backspace" === a.key) {
        let b = this.start;
        this.changeChar(this.placeholder, -1, b);
      } else this.changeChar(this.placeholder);
  }
  setLength() {
    this.handler.maxLength = this.mask.length;
  }
  setStartValue() {
    this.handler.value = "";
  }
  setValue() {
    if (this.handler.value == "") {
      this.handler.value = this.mask;
    }
  }
  isNum(a) {
    return !isNaN(a) && parseInt(+a) == a && !isNaN(parseInt(a, 10));
  }
  isDeletionKey(a) {
    return "Delete" === a || "Backspace" === a;
  }
  isDirectionKey(a) {
    return (
      "ArrowUp" === a ||
      "ArrowDown" === a ||
      "ArrowRight" === a ||
      "ArrowLeft" === a ||
      "Tab" === a
    );
  }
  isPlaceholder(a) {
    return a == this.placeholder;
  }
  placeHolderPosition() {
    return this.handler.value.indexOf(this.placeholder);
  }
  changeChar(a, b = 1, c = this.mask.length) {
    let d = this.handler.value,
      f;
    f = 0 < b ? this.handler.selectionStart : this.handler.selectionStart - 1;
    let g = "";
    if (f === c) return !1;
    if (!this.isNum(d[f]) && !this.isPlaceholder(d[f]))
      do if (((f += b), f === c)) return !1;
      while (!this.isNum(d[f]) && !this.isPlaceholder(d[f]));
    (g = this.replaceAt(d, f, a)),
      (this.handler.value = g),
      0 < b && (f += b),
      (this.handler.selectionStart = f),
      (this.handler.selectionEnd = f);
  }
  replaceAt(a, b, c) {
    return a.substring(0, b) + c + a.substring(++b);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  "use strict";
  const input = document.querySelector(".form-input");

  const phoneMask = new PhoneField(
    input,
    input.dataset.phonemask,
    input.dataset.placeholder
  );
});
