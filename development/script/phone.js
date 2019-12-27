function InputMask(element) {
  var self = this;

  self.element = element;

  self.mask = element.attributes["input-mask"].nodeValue;
  self.numberLength = (self.mask.match(/_/g) || []).length;
  self.currentNumber = "";

  self.keyEventHandler = function(obj) {
    obj.preventDefault();

    let bufferPos = self.displayPosToBufferPos(self.element.selectionStart);

    if (obj.keyCode == 8) {
      let index = bufferPos - 1;
      if (index < self.currentNumber.length && index >= 0) {
        var array = self.currentNumber.split("");
        array.splice(index, 1);
        self.currentNumber = array.join("");
      }
    } else if (obj.keyCode == 46) {
      let index = bufferPos;

      if (index < self.currentNumber.length && index >= 0) {
        var array = self.currentNumber.split("");
        array.splice(index, 1);
        self.currentNumber = array.join("");
      }
    } else if (obj.keyCode >= 48 && obj.keyCode <= 57) {
      let index = self.displayPosToBufferPos(self.element.selectionStart);
      self.currentNumber =
        self.currentNumber.slice(0, index) +
        String.fromCharCode(obj.which) +
        self.currentNumber.slice(index, self.currentNumber.length);
    }

    if (self.currentNumber.length > self.numberLength) {
      self.currentNumber = self.currentNumber.slice(0, self.numberLength);
    }

    self.render();
    self.moveCursor(obj);
  };

  self.onClick = function(event) {
    self.moveCursor();
  };

  self.moveCursor = function(obj) {
    var newPosition = self.displayPosToBufferPos(self.element.selectionStart);

    if (obj != undefined) {
      if (obj.keyCode == 8) {
        newPosition--;
      } else if (
        (obj.keyCode >= 37 && obj.keyCode <= 40) ||
        obj.keyCode == 46
      ) {
      } else {
        newPosition += 1;
      }
    }

    let nextDigitIndex = self.displayPosToBufferPos(self.lastDigitIndex() + 1);

    if (newPosition > nextDigitIndex) {
      newPosition = nextDigitIndex;
    }

    newPosition = self.bufferPosToDisplayPos(newPosition);

    self.element.setSelectionRange(newPosition, newPosition);
  };

  self.render = function() {
    var bufferCopy = self.currentNumber;
    var ret = {
      muskifiedValue: ""
    };

    let selectionStart = self.element.selectionStart;

    var lastChar = 0;

    for (var i = 0; i < self.mask.length; i++) {
      if (self.mask.charAt(i) == "_" && bufferCopy) {
        ret.muskifiedValue += bufferCopy.charAt(0);
        bufferCopy = bufferCopy.substr(1);
        lastChar = i;
      } else {
        ret.muskifiedValue += self.mask.charAt(i);
      }
    }

    self.element.value = ret.muskifiedValue;
    self.element.setSelectionRange(selectionStart, selectionStart);
  };

  self.lastDigitIndex = function() {
    var lastDigitIndex = 0;

    for (var i = self.element.value.length - 1; i >= 0; i--) {
      if ("0123456789".includes(self.element.value.charAt(i)) && i != 1) {
        lastDigitIndex = i;
        break;
      }
    }

    return lastDigitIndex;
  };

  self.bufferPosToDisplayPos = function(bufferIndex) {
    let minDisplayPos = 4;

    var offset = 0;

    var mBufferIndex = bufferIndex;

    for (var i = 0; mBufferIndex >= 0 && i <= self.mask.length; i++) {
      if (self.mask.charAt(i) == "_") {
        mBufferIndex -= 1;
      }
      offset = i;

      if (mBufferIndex == 0) {
        offset += 1;
        break;
      }
    }

    return offset < minDisplayPos ? minDisplayPos : offset;
  };

  self.displayPosToBufferPos = function(displayIndex) {
    var bufferPos = 0;

    for (var i = 0; i < displayIndex; i++) {
      if (self.mask.charAt(i) == "_") {
        bufferPos += 1;
      }
    }

    return bufferPos;
  };

  self.getValue = function() {
    return this.inputBuffer;
  };
  // self.element.onkeydown = self.keyEventHandler;
  self.element.onkeypress = self.keyEventHandler;

  self.element.onclick = self.onClick;
}

var maskInstance = new InputMask(document.querySelector("#phone"));

//////// test version of script
const errorBlock = document.querySelector(".error");
const inputPhone = document.querySelector("#phone");
// console.log(inputPhone.value);

inputPhone.addEventListener("focus", function(e) {
  // console.log(this);
  const inputValue = this.value;
  if (inputValue === "") {
    this.value = "+7 ";
  }
  // this.value = inputValue.match(/[0-9]/g).join();
  errorBlock.textContent = "Заполните правильно это поле";
});
inputPhone.addEventListener("blur", function(e) {
  // console.log(this);
  const inputValue = this.value;
  if (inputValue.match(/\d+/g).join() === "7") {
    this.value = "";
    this.classList.remove("__error");
    errorBlock.textContent = "";
  }
  // this.value = inputValue.match(/\d+/g).join();
});
//

// const phoneHandler = {
//   set(target, name, value) {
//     target[name] = value.match(/[0-9]/g).join("");
//   },
//   get(target, name) {
//     return target[name].replace(/(\d{3})(\d{3})(\d{4})/, "+7 ($1)-$2-$3");
//   }
// };

// const inputPhone = document.querySelector("#phone");
// const phone = {
//   value: inputPhone.value
// };

// const phoneNumber = new Proxy(phone, phoneHandler);

// function changeInput() {
//   const inputPhoneValue = inputPhone.value;
//   console.log(phoneNumber.value);
// }

// inputPhone.addEventListener("keyup", changeInput);
