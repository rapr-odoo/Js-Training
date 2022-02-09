var flag = 0
const OnClickEvent = () => alert("You Clicked Me!!!");
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
        h1.addEventListener('mouseover', cusClick(document.getElementById('h1text')));
        resolve('done');
      }
    }
  });
}

const cusOut = (h1) => {
  h1.style = "color: black";}

const cusOver = (h1) => {
  console.log(h1);
  h1.style = "color: red;";}

h1 = document.getElementById('h1text')
h1.addEventListener('mouseover', cusOver(h1))
h1.addEventListener('mouseout', cusOut(h1))

/*(async function() {
  const res = await loadPromise();
  console.log(res, 'Done')
  var h1 = document.getElementById('h1text');
  h1.innerHTML = "New H1"
  var h2 = document.getElementById('h2text');
  //h1.addEventListener('mouseover', cusClick(h1))
})();*/