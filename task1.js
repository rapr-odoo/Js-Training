import { RemoteCall } from "../werkzeug/static/js/remoteCalls.js";

var flag = 0
var global_rows_array = null;
let users = [];
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

const loadPromise = () => {
  return new Promise((resolve) => {document.onreadystatechange = () => {
    if (document.readyState == 'complete') {resolve('done');}
  }});
}

const cusOut = (ev) => ev.target.style = "color: black";
const cusOver = (ev) => ev.target.style = "color: red;";

const EVENT_TYPE = "rahul";

function createUser(name) {
  this.create(name);
}

const userPrototype = {
  isAdmin: false,
  group: 'base',
}

class User {
  static users_list = []

  constructor(name) {
    let arr = name.split(' ');
    this.firstName = arr[0];
    this.lastName = arr[1];
    this.email = arr[0].toString() + '@odoo.com';
    this.login = arr[0];
    this.password = this.login;
    this.isAdmin = false;
    this.group = 'base';
    this.notify();
    this.val = 10;
  }

  notify() {
    alert(`Success:: User "${this.login}" created with Password "${this.password}"`);
  }

  // call the method: UserOb.greet()
  greet() {
    console.log("Hello", this.firstName);
  }

  // call the method: UserOb.area
  get area() {
    return this.val * this.val;
  }

  //call the method : UserOb.hello
  get ['hello']() {
    return "name";
  }
};

// Can only be used after the DOM has been laoded
// So need to call the script file at the end of the codee
// h1 = document.getElementById('h1text');
// h1.addEventListener('mouseover', cusOver);
// h1.addEventListener('mouseout', cusOut);

function resetDOM() {
  const arr = Array.from(document.getElementById('mathTable').children[1].children);
  arr.forEach((tr) => {tr.style.display="";})
}

function changeDOM(tableRows, arr) {
  var i = 0;
  for (tr of tableRows) {
    try{
      if (tr.rowIndex == arr[i].rowIndex) {
        tr.style.display = '';
        i++;
      }
      else tr.style.display = "none";
    }catch (e) {
      tr.style.display = "none";
    }
  }
}

function arrange(asc = true) {
  const tableRows = document.getElementById('mathTable').children[1].children;
  const arr = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children);
  if (asc) arr.sort((a,b) => a.children[0].innerHTML-b.children[0].innerHTML);
  else arr.sort((a,b) => b.children[0].innerHTML-a.children[0].innerHTML);
  for (let i=0; i<tableRows.length; i++) tableRows[i].innerHTML = arr[i].innerHTML;
}

function search() {
  const search_col = document.getElementById('search_column').value;
  const search_op = document.getElementById('search_operator').value;
  let el = document.getElementById('search_value');
  const search_value = el.cloneNode(true).value;
  el.value = '';

  const tableRows = document.getElementById('mathTable').children[1].children;
  var arr = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children);
  let col_num = 0;
  var flag = false;
  if (search_col == 'number') col_num = 0;
  else col_num = 1;

  switch (search_op) {
    case '=': arr = arr.filter((tr) => tr.children[col_num].innerHTML == search_value);
              break;

    case '!=': arr = arr.filter((tr) => tr.children[col_num].innerHTML != search_value);
              break;

    case '<=': arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) <= parseInt(search_value));
              break;

    case '>=': arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) >= parseInt(search_value));
              break;

    case '<':  arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) < parseInt(search_value));
      break;

    case '>':  arr = arr.filter((tr) => parseInt(tr.children[col_num].innerHTML) > parseInt(search_value));
      break;

    default:flag = true;
      break;
  }


  if (flag) alert('Please Enter Valid Query!!!');
  else changeDOM(tableRows, arr);
}

function createRows(tableBody, num=null, root=null) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.append(num)
  td2.append(root)
  tr.append(td1,td2);
  tableBody.append(tr, '\n');

  // let text = document.createTextNode()
  // td1.appendChild()

  // const rand = Math.ceil(Math.random() * 100);
  // td1.append(rand.toString());
  // td2.append(Math.sqrt(rand).toFixed(3));
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
  let count = 9;
  while(count--) {
    const rand = Math.ceil(Math.random() * 100);
    createRows(tableBody, rand, Math.sqrt(rand).toFixed(3));
  }
  global_rows_array = Array.from(document.getElementById('mathTable').cloneNode(true).children[1].children)


  // Changing Default constructor for createUser
  createUser.prototype = userPrototype;
  createUser.prototype.constructor = createUser;
  document.getElementById('user_button').addEventListener('click', () => {
    users.push(new createUser(document.getElementById('newuser').cloneNode(true).value));
    document.getElementById('newuser').value = '';
    users[0].greet();
  })

  // const user1 = new User('Rahul Prajapati')

  req = new RemoteCall({type: 'json', url: 'anything'});
  req.call;
  debugger;
})();


const wait = (time) => new Promise(
  function (resolve, reject) {
    return setTimeout(() => resolve(), time);
  }
);

wait(200)
  // onFulfilled() can return a new promise, `x`
  .then(() => new Promise((resolve, reject) => {return resolve('foo')}))
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