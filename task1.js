var flag = 0
const OnClickEvent = () => document.getElementById('h3text').dispatchEvent(new Event(EVENT_TYPE));
const OnOver = () => {
  flag = 0;
  document.getElementById('demo').innerHTML = "You are hovering button !!!";
}
const OnOut = () => {
  flag = 1;
  document.getElementById('demo').innerHTML = "You left !!!";
  setTimeout(function(){
    if (flag) document.getElementById('demo').innerHTML = "";
  },3000);
}

// Incomplete Functionality
// const loadJson = () => new Promise((resolve, reject) => {
//   const a = $("<a>").attr("href", "http://i.stack.imgur.com/L8rHf.png").attr("download", "img.png").appendTo("body");
//   a[0].click();
//   a.remove();
// });


const loadPromise = () => {
  return new Promise((resolve) => {document.onreadystatechange = () => {
    if (document.readyState == 'complete') {resolve('done');}
  }});
}

const cusOut = (ev) => ev.target.style = "color: black";
const cusOver = (ev) => ev.target.style = "color: red;";

const EVENT_TYPE = "rahul";


// Can only be used after the DOM has been laoded
// So need to call the script file at the end of the codee
// h1 = document.getElementById('h1text');
// h1.addEventListener('mouseover', cusOver);
// h1.addEventListener('mouseout', cusOut);

(async function() {
  const res = await loadPromise();
  console.log(res, 'Done')
  var h1 = document.getElementById('h1text');
  h1.addEventListener('mouseover', cusOver)
  h1.addEventListener('mouseout', cusOut)
  h1.addEventListener('click', () => alert('You clicked Custom Buton!!!'));
  var h2 = document.getElementById('h2text');
  //h1.addEventListener('mouseover', cusClick(h1))

  const cusOverEvent = new Event('mouseover', {bubbles: true, cancelable: true});
  h2.addEventListener('click', () => alert('You clicked Custom H2 Buton!!!'));
  h2.dispatchEvent(cusOverEvent);
  document.getElementById('h3text').addEventListener(EVENT_TYPE, (event) => event.target.innerHTML = "Called");


  // Adding Some Map, Sort, Filter Functionalities
  // Get the Math Table Elemets
  const tableRows = document.getElementById('mathTable').children[1].children;
  // const tableRows = [5,4,3,2];
  Array.from(tableRows).forEach((tr, index, arr) => {
    const rand = Math.ceil(Math.random() * 100);
    arr[index].children[0].innerHTML = rand;
    arr[index].children[1].innerHTML = Math.sqrt(rand).toFixed(3);
  })

})();


const wait = (time) => new Promise(
  function (resolve, reject) {
    return setTimeout(() => resolve(), time);
  }
);

wait(200)
  // onFulfilled() can return a new promise, `x`
  .then((val) => new Promise((resolve, reject) => {return resolve('foo')}))
  // the next promise will assume the state of `x`
  .then(a => a)
  // Above we returned the unwrapped value of `x`
  // so `.then()` above returns a fulfilled promise
  // with that value:
  .then(b => console.log(b)) // 'foo'
  // Note that `null` is a valid promise value:
  .then(() => null)
  .then(c => console.log(c)) // null
  // The following error is not reported yet:
  .then(() => {throw new Error('foo');})
  // Instead, the returned promise is rejected
  // with the error as the reason:
  .then(
    // Nothing is logged here due to the error above:
    d => console.log(`d: ${ d }`),
    // Now we handle the error (rejection reason)
    e => console.log(e)) // [Error: foo]
  // With the previous exception handled, we can continue:
  .then(f => console.log(`f: ${ f }`)) // f: undefined
  // The following doesn't log. e was already handled,
  // so this handler doesn't get called:
  .catch(e => console.log(e))
  .then(() => { throw new Error('bar'); })
  // When a promise is rejected, success handlers get skipped.
  // Nothing logs here because of the 'bar' exception:
  .then(g => console.log(`g: ${ g }`))
  .catch(h => console.log(h)) // [Error: bar]
;

// const abc = function () {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => resolve("Hi"), 2000);
//   });
// }

// async function def () {
//   await abc();

// }
