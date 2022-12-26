let basket = JSON.parse(localStorage.getItem("basket"));
if (basket.length > 0) {
  document.querySelector(".countt").innerText = basket.length;
}
for (let item of basket) {
  let tbody = document.querySelector(".cart-body");
  // Tr
  let tr = document.createElement("tr");
  // Product id
  let productIdw = document.createElement("span");
  productIdw.setAttribute("class", "product-id");
  productIdw.innerText = item.id;
  // CheckBox input td
  let checkBoxtd = document.createElement("td");

  checkBoxtd.setAttribute("class", "custome-checkbox");
  let CheckBoxInput = document.createElement("input");
  CheckBoxInput.setAttribute("type", "checkbox");
  checkBoxtd.append(CheckBoxInput);
  // Image td
  let imagetd = document.createElement("td");

  imagetd.setAttribute("class", "image");
  let image = document.createElement("img");
  image.setAttribute("src", item.image);
  imagetd.append(image);
  // Product name td
  let prodNametd = document.createElement("td");

  prodNametd.setAttribute("class", "product-name");
  prodNametd.innerHTML = `<h6>
    <a href="">${item.name}</a>
</h6>
<div class="icons">
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star-half-stroke"></i>
    <span>(4.0)</span>
</div>`;

  // Price td first
  let prodfPricetd = document.createElement("td");

  prodfPricetd.setAttribute("class", "price");
  prodfPricetd.innerHTML = `
<h4>$${item.price}</h4>
`;
  // Custom input count
  let prodCounttd = document.createElement("td");

  prodCounttd.setAttribute("class", "item-count");
  if (productIdw.innerText == item.id) {
    prodCounttd.innerHTML = `<div class="inp-num number">
        <a href="#" class="up"><i class="fa-solid fa-angle-up "></i></a>
        <span class="inp-value count">${item.count}</span>
        <a href="#" class="down"><i class="fa-solid fa-angle-down"></i></a>
    </div>
    `;
  }
  // Price td second
  let prodsPricetd = document.createElement("td");

  prodsPricetd.setAttribute("class", "price subtotal-price");
  prodsPricetd.innerHTML = `
<h4>$<span class="subtotal-value">${Math.round(
    Number(item.price) * Number(item.count)
  )}</span></h4>
`;
  // Remove td
  let prodRemovetd = document.createElement("td");

  prodRemovetd.setAttribute("class", "remove");
  prodRemovetd.innerHTML = `
<a href="#">
    <i class="fa-solid fa-trash-can"></i>
</a>
`;
  tr.append(
    checkBoxtd,
    imagetd,
    prodNametd,
    prodfPricetd,
    prodCounttd,
    prodsPricetd,
    prodRemovetd,
    productIdw
  );
  tbody.append(tr);

  // Remove product from basket
  let removeIcon = document.querySelectorAll(".cart-body .remove");
  for (let icon of removeIcon) {
    icon.addEventListener("click", function () {
      for (let product = 0; product < basket.length; product++) {
        if (this.nextElementSibling.innerText == basket[product].id) {
          basket.splice(product, 1);
          localStorage.setItem("basket", JSON.stringify(basket));
          window.location.reload();
        }
      }
    });
  }
}

EmptyMessage();

function EmptyMessage() {
  if (document.querySelector(".cart-body").children.length == 0) {
    let err = document.createElement("div");
    err.setAttribute("class", "err-message");
    err.innerHTML = `
        <i class="fa-solid fa-circle-minus"></i>
        <h3>Basket is empty</h3>
        `;
    document.querySelector(".cart-body").append(err);
  }
}

// input count
if (document.querySelector(".cart-body").children.length != 0) {
  for (let a = 0; a < basket.length; a++) {
    var myInps = document.querySelectorAll(".number");
    for (let inp of myInps) {
      var increaseBtn = inp.querySelector(".up");
      var decreaseBtn = inp.querySelector(".down");
      increaseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (
          this.parentElement.parentElement.parentElement.querySelector(
            ".product-id"
          ).innerText === basket[a].id
        ) {
          let myInp = inp.querySelector(".count");
          basket[a].count += 1;
          myInp.innerText = basket[a].count;
          this.parentElement.parentElement.nextElementSibling.querySelector(
            ".subtotal-value"
          ).innerText = Math.round(Number(basket[a].price * basket[a].count));
          totalPrice();
          localStorage.setItem("basket", JSON.stringify(basket));
        }
      });
      decreaseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (
          basket[a].count != 0 &&
          this.parentElement.parentElement.parentElement.querySelector(
            ".product-id"
          ).innerText === basket[a].id
        ) {
          let myInp = inp.querySelector(".count");
          basket[a].count -= 1;
          myInp.innerText = basket[a].count;
          this.parentElement.parentElement.nextElementSibling.querySelector(
            ".subtotal-value"
          ).innerText = Math.round(Number(basket[a].price * basket[a].count));
          totalPrice();
          localStorage.setItem("basket", JSON.stringify(basket));
        }
      });
    }
  }
} else {
  console.log("bosdur");
}
// Total price
function totalPrice() {
  var totalPrice = 0;
  for (let elem of basket) {
    totalPrice += Math.round(elem.price * elem.count);
  }
  document.querySelector(".total-price-s").innerText = totalPrice;
}
totalPrice();
// Clear basket
document.querySelector(".clear-basket").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.setItem("basket", JSON.stringify([]));
  window.location.reload();
});

// Calculate shipping dropdown
function openCloseDpC() {
  document.querySelector(".selectInp").classList.toggle("show-sr");
}
function filterFunctionC() {
  var input, filter, a, i;
  input = document.querySelector(".drp-inp2");
  filter = input.value.toUpperCase();
  div = document.querySelector(".select-option");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
