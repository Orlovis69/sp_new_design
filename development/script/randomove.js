// get all elements
const parallax = document.querySelectorAll(".parallax");

// function random translate change
function randomMove(element) {
  const transformText = `translate3d(${randomGet(-20, 20)}vw, ${randomGet(
    -20,
    20
  )}vw, 0px) rotate3d(0, 0, 1, ${randomGet(-45, 45)}deg)`;
  element.style.transform = transformText;

  // debugger;
}

function allParallaxMove() {
  // clearInterval();
  parallax.forEach(element => {
    setInterval(randomMove(element), 16);
  });
}

function singleParallaxMove(e) {
  console.log("hi4");
  const target = e.target;
  randomMove(target);
}

function randomGet(min, max) {
  return Math.random() * (max - min) + min;
}

function debounce(func, wait = 200, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// function repeatAnimation() {
//   parallax.forEach(element => {
//     randomMove(element);
//   });
//   requestAnimationFrame(repeatAnimation);
// }

// Event listeners
window.addEventListener("scroll", debounce(allParallaxMove));
parallax.forEach(element =>
  element.addEventListener("mouseenter", debounce(singleParallaxMove))
);
parallax.forEach(element =>
  element.addEventListener("mousemove", debounce(singleParallaxMove))
);
parallax.forEach(element =>
  element.addEventListener("click", debounce(singleParallaxMove))
);
