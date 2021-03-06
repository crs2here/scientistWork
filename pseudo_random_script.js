//<script>
"use strict";
// Implements the Polar Method by Knuth, "The Art Of Computer Programming", p. 117.
const rand_normal = (function() {
  var x2, multiplier, genReady;
  return function normal() {
    var x1, u1, u2, v1, v2, s;

    if (genReady) {
      genReady = false;
      return x2;
    } else {
      u1 = Math.random();
      u2 = Math.random();

      // Normalize between -1 and +1.
      v1 = (2 * u1) - 1;
      v2 = (2 * u2) - 1;

      s = (v1 * v1) + (v2 * v2);

      // Condition is true on average 1.27 times,
      // with variance equal to 0.587.
      if (s >= 1) {
          return normal();
      }

      multiplier = Math.sqrt(-2 * Math.log(s) / s);

      x1 = v1 * multiplier;
      x2 = v2 * multiplier;

      genReady = true;

      return x1;
    }
  };
})();

function rand_lognormal(mu, sigma) {
  return Math.exp(sigma * rand_normal() + mu);
}

// See https://pdfs.semanticscholar.org/0796/972867a3053062044bc594655dfd65383425.pdf.
function rand_student_t(nu) {
  const u = 2 * Math.random() - 1;
  const v = 2 * Math.random() - 1;
  const w = u * u + v * v;
  if (w > 1) return rand_student_t(nu);
  const c2 = u * u / w;
  const r2 = nu * (Math.pow(w, -2 / nu) - 1);
  const x = Math.sqrt(r2 * c2);
  if (Math.random() < 0.5) {
    return x;
  } else {
    return -x;
  }
}

function mean(arr) {
  return arr.reduce((a, b) => a + b) / arr.length;
}

function median(arr) {
  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort();
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function mc_sim_Sprice_one(S, rate, sigma, term) {
  return S * Math.exp((rate - (sigma ^ 2) / 2) * term + sigma * randn() * Math.sqrt(term));
}

function normal_btn_onclick() {
  const x = rand_normal();
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(x));
  document.getElementById('result').appendChild(p);
}

function randomSampleList_onclick() {
  const result = document.getElementById('result');
  result.innerHTML = "<br />";
  const timesToRepeat = document.getElementById('numberToRepeat').value;
  const resultList = [];
  for (let index = 0; index < timesToRepeat; index++) {
    let tempIndex = index + 1;
    result.innerHTML += `
      ${tempIndex}. ${rand_normal()} <br />
    `;
  }
}
//</script>