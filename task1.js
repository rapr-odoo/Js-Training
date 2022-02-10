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

const loadPromise = () => {
  return new Promise((resolve) => {
    document.onreadystatechange = () => {
      if (document.readyState == 'complete') {
        console.log(document.readyState);
        const h1 = document.getElementById('h1text');
        resolve('done');
      }
    }
  });
}

const cusOut = (ev) => ev.target.style = "color: black";
const cusOver = (ev) => ev.target.style = "color: red;";

const EVENT_TYPE = "rahul";
document.getElementById('h3text').addEventListener(EVENT_TYPE, (event) => event.target.innerHTML = "Called");


// h1 = document.getElementById('h1text')
// h1.addEventListener('mouseover', cusOver)
// h1.addEventListener('mouseout', cusOut)

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
})();