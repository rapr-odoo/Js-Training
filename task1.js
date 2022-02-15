var flag = 0
var rows_array = null;
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

function changeDOM() {
  return
}

function arrange(asc = true) {
  const tableRows = document.getElementById('mathTable').children[1].children;
  const arr = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children);
  if (asc) arr.sort((a,b) => a.children[0].innerHTML-b.children[0].innerHTML);
  else arr.sort((a,b) => b.children[0].innerHTML-a.children[0].innerHTML);
  for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
}

function search_extended(tableRows, arr, ) {

}

function search() {
  const raw_search_query = document.getElementById('search_query').cloneNode(true).value;
  const search_query = [];
  const tableRows = document.getElementById('mathTable').children[1].children;
  var arr = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children);
  const search_params = ['=','!=','<','>','<=','>='];
  for (val of raw_search_query.split(' ')) search_query.push(val.trim());
  var flag = false;
  if(!isNan(search_query[2]) && search_query[0].toLowerCase() == 'num' || search_query[0].toLowerCase() == 'number') {
    switch (search_query[1]) {
      case '=': arr = arr.filter((tr) => tr.children[0].innerHTML == search_query[2])
                for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
                break;

      case '!=': arr = arr.filter((tr) => tr.children[0].innerHTML != search_query[2])
                 for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
                break;

      case '<=': arr = arr.filter((tr) => tr.children[0].innerHTML <= search_query[2])
                for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
                break;

      case '>=': arr = arr.filter((tr) => tr.children[0].innerHTML >= search_query[2])
                for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
                break;

      case '<':
        break;

      case '>':
        break;

      default:flag = true;
        break;
    }
  }else if(!isNan(search_query[2]) && search_query[0].toLowerCase() == 'root') {
    switch (search_query[1]) {
      case '=':
        break;

      case '!=':
        break;

      case '<=':
        break;

      case '>=':
        break;

      case '<':
        break;

      case '>':
        break;

      default:flag = true;
        break;
    }

  }else {
    alert('Please Enter Valid Query!!!');
    flag = false;
  }


  if (flag) alert('Please Enter Valid Query!!!');
}

function createRows(count,tableBody) {
  while (count--) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const rand = Math.ceil(Math.random() * 100);
    td1.append(rand.toString());
    td2.append(Math.sqrt(rand).toFixed(3));
    tr.append(td1,td2);
    tableBody.append(tr, '\n');
  }
}

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
  const tableBody = document.getElementById('mathTable').children[1];
  const tableRows = tableBody.children;
  // const tableRows = [5,4,3,2];
  Array.from(tableRows).forEach((tr, index, arr) => {
    const rand = Math.ceil(Math.random() * 100);
    arr[index].children[0].innerHTML = rand;
    arr[index].children[1].innerHTML = Math.sqrt(rand).toFixed(3);
  })
  createRows(10, tableBody);
  rows_array = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children)
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
