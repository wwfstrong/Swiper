let box = $("#box");
let ul = $("ul");
let wli = $$("li");
let ol = $("ol");
let i = (index = 0);
let left = $("#left");
let right = $("#right");
let pro = $("#progress");
let pro2 = $("#progress2");
let foot = $("#footer");
let text = $("#text");
let count = wli.length;
let slideWidth = box.offsetWidth;
let starX = (endX = moveX = 0);
let judge = false;
for (i = 0; i < count; i++) {
  let li = document.createElement("li");
  ol.appendChild(li);
  li.innerText = i + 1;
  text.innerText = 1 + " / " + count;
  if (i === 0) {
    ol.children[0].className = "light";
    ol.children[0].style.color = "white";
    left.style.opacity = 0.5;
  }
  li.onclick = liClick;
  li.setAttribute("index", i);
}
left.onclick = () => {
  if (index !== 0) {
    index--;
    ol.children[index].onclick();
  }
};
right.onclick = () => {
  if (index !== count - 1) {
    index++;
    ol.children[index].onclick();
  }
};
box.onmousedown = () => {
  judge = true;
  starX = event.clientX - box.offsetLeft;
};
box.onmousemove = () => {
  if (!judge) return;
  let endX = event.clientX - box.offsetLeft;
  let wul = ul.style;
  moveX = starX - endX;
  if (index === 0 && moveX > 0) {
    wul.left = -index * slideWidth - moveX + "px";
  } else if (index === count - 1 && moveX < 0) {
    wul.left = -index * slideWidth - moveX + "px";
  } else if (index > 0 && index < count - 1) {
    wul.left = -index * slideWidth - moveX + "px";
  }
};
box.onmouseup = () => {
  judge = false;

  if (moveX > 50 && index < count - 1) {
    index++;
    ol.children[index].onclick();
  } else if (moveX < -50 && index > 0) {
    index--;
    ol.children[index].onclick();
  } else {
    ul.style.left = -index * slideWidth + "px";
  }
  moveX = 0;
};

function liClick() {
  let li = ol.children;
  for (i = 0; i < li.length; i++) {
    li[i].className = "";
    li[i].style.color = "";
  }
  this.style.color = "white";
  this.className = "light";
  let liindex = parseInt(this.getAttribute("index"));
  animate(ul, -liindex * slideWidth);
  liindex === 0 ? (left.style.opacity = 0.5) : (left.style.opacity = "");
  liindex === count - 1
    ? (right.style.opacity = 0.5)
    : (right.style.opacity = "");
  pro.style.width = ((liindex + 1) / count) * slideWidth + "px";
  pro2.style.left = (liindex / count) * slideWidth + "px";
  text.innerText = liindex + 1 + " / " + count;
  foot.style.opacity = 1;
  setTimeout(() => {
    foot.style.opacity = 0;
  }, 2000);
  index = liindex;
}
