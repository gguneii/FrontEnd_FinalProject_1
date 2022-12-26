
$('.p-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  vertical: true,
  });
  if(JSON.parse(localStorage.getItem("basket")) ==null){
    localStorage.setItem("basket",JSON.stringify([]))
  }
// Header-fix
function headerFix(){
    var headBot = document.querySelector("#header .header-bottom")
    var phoneHeader = document.querySelector(".phone-header");
    if(window.scrollY >= 240){
        headBot.classList.add("stick-bottom-header")
        phoneHeader.classList.add("active-phone-header");
    }
    else{
        headBot.classList.remove("stick-bottom-header")
        phoneHeader.classList.remove("active-phone-header");

    }
}
window.onscroll = function(){
    headerFix();
    ScrollToTop();
}
// Header search-dropdown input
function filterFunction() {
  var input, filter, a, i;
  input = document.querySelector(".drp-inp");
  filter = input.value.toUpperCase();
  div = document.getElementById("search-select");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } 
    else {
      a[i].style.display = "none";
    }
  }
}
function openCloseDp(){
  document.querySelector(".src-inp-slc").classList.toggle("show-src");
}
let dropdownItems = document.querySelectorAll(".dropdown-item");
for(let dpitem of dropdownItems){
  dpitem.addEventListener("click",function(){
    let checkedDp = document.querySelector(".checkedDp");
    checkedDp.classList.remove("checkedDp")
    this.classList.add("checkedDp")
    document.querySelector(".whichCat").innerText = this.innerText;
  })
}

$(document).ready(function(){
// Phone menu 
    $(".up-icon").click(function(){
        $(".down-icon").hide();
        $(".up-icon").show();
        $(this).hide();
        $(this).next().show();
        $(".nav-toggle").removeClass("active-ul");
        $(this).next().next().addClass("active-ul");
        $(".head-text").css("color","#253D4E");
        $(this).prev().css("color","#3BB77E")
    })
    $(".down-icon").click(function(){
        $(this).hide();
        $(this).prev().show();
        $(this).next().removeClass("active-ul");
        $(this).prev().prev().css("color","#253D4E")
    })
    $(".up-icon2").click(function(){
      $(".down-icon2").hide();
      $(".up-icon2").show();
      $(this).hide();
      $(this).next().show();
      $(".nav-toggle2").removeClass("active-ul");
      $(this).next().next().addClass("active-ul");
      $(".head-text2").css("color","#253D4E");
      $(this).prev().css("color","#3BB77E")
  })
  $(".down-icon2").click(function(){
      $(this).hide();
      $(this).prev().show();
      $(this).next().removeClass("active-ul");
      $(this).prev().prev().css("color","#253D4E")
  })
// Side-bar menu
    $(".burger").click(function(){
    // open
    $(".phone-side-menu").css({
        "opacity":"1",
        "visibility": "visible",
        "transform": "translateX(0px)"
    })
    $(".overlay-body").css({
        "opacity": "0.7",
        "visibility": "visible"
    })
    })
    // close
    $(".sidebar-close-icon").click(function(){
    $(".phone-side-menu").css({
    "opacity":"0",
    "visibility": "hidden",
    "transform": "translateX(-200px)",
    })
    $(".overlay-body").css({
        "opacity": "0",
        "visibility": "hidden"
    })
    })
    $(".overlay-body").click(function(){
    $(".phone-side-menu").css({
        "opacity":"0",
        "visibility": "hidden",
        "transform": "translateX(-200px)",
        })
        $(".overlay-body").css({
        "opacity": "0",
        "visibility": "hidden"
        })
    })
})
// Preloader
$(window).on("load", function () {
    $("#preloader-active").css("display","flex");
    $("body").css("opacity","1")
    $("#preloader-active").fadeOut("slow");
})
  
// Cart button
var cartBasket = JSON.parse(localStorage.getItem("basket"))
var myCartul = document.querySelector(".cart-shopping-basket");
if(cartBasket.length > 0){
  var totalPriceCount = 0;
  
  for(let item of cartBasket){
  let li = document.createElement("li");
  
  let divImg = document.createElement("div");
  divImg.setAttribute("class","shopping-cart-img");
  divImg.innerHTML = 
  `
  <a href="" class="link">
    <img alt="Nest" src="${item.image}">
  </a>
  `;
  
  let divTitle = document.createElement("div");
  divTitle.setAttribute("class","shopping-cart-title");
  divTitle.innerHTML = 
  `
  <h4><a href="">Daisy Casual Bag</a></h4>
  <h4><span>${item.count} × </span>$${item.price}</h4>
  `;
  let divDel = document.createElement("div");
  divDel.setAttribute("class","shopping-cart-delete")
  divDel.innerHTML = 
  `
  <a href="#" class="cart-cls-ic"><i class="fa-solid fa-xmark"></i></a>
  <span class="cart-item-id">${item.id}</span>
  `;
  
  totalPriceCount += Math.round(item.price*item.count);
  li.append(divImg,divTitle,divDel);
  myCartul.append(li);
  }
  let totalPric = document.createElement("div");
  totalPric.setAttribute("class","total-cart-price");
  totalPric.innerHTML = 
  `
  <span>Total</span>
  <span>$${totalPriceCount}</span>
  `
  let btndiv = document.createElement("div");
  btndiv.setAttribute("class","btns");
  let viewBtn = document.createElement("button");
  viewBtn.innerText = "View cart"
  let checkBtn = document.createElement("button");
  checkBtn.innerText = "Checkout"
  btndiv.append(viewBtn,checkBtn);
  myCartul.append(totalPric,btndiv)
  document.querySelector(".cart-item-count").innerText = cartBasket.length;
}
else{
  let err = document.createElement("div");
  err.setAttribute("class","err-message")
  err.innerHTML = 
  `
  <i class="fa-solid fa-circle-minus"></i>
  <h3>Sebet bosdur ... </h3>
  `;
  myCartul.append(err)
}
// Header cart button remove item
var closeIcons = document.querySelectorAll(".cart-cls-ic");
for(let icon of closeIcons){
  icon.addEventListener("click",function(){
      for(let i = 0;i<cartBasket.length;i++){
          if(this.nextElementSibling.innerText == cartBasket[i].id){
              cartBasket.splice(i,1);
              localStorage.setItem("basket",JSON.stringify(cartBasket));
              window.location.reload();
          }
      }
  })
}
// Basket
var addButtons = document.querySelectorAll(".add-prod-basket");
for(let btn of addButtons){
  btn.parentElement.addEventListener("click",function(e){
    if(JSON.parse(localStorage.getItem("basket"))===null){
      localStorage.setItem("basket",JSON.stringify([]))
    }
    let basket = JSON.parse(localStorage.getItem("basket"));
    let prodImage = this.parentElement.parentElement.previousElementSibling.querySelector(".first").getAttribute("src");;
    let prodName = this.parentElement.previousElementSibling.querySelector(".name").innerText;
    let prodId = this.parentElement.parentElement.parentElement.getAttribute("data-id");
    let proPrice = Number(this.previousElementSibling.querySelector(".price-value").innerText);
    let exist = basket.find(n =>n.id==prodId);

    if(exist===undefined){
      basket.push({
        id: prodId,
        name: prodName,
        image: prodImage,
        price: proPrice,
        count: 1
      })
    }
    else{
      exist.count+=1;
    }
    localStorage.setItem("basket",JSON.stringify(basket));
  })
}
// Home page and Product page link
$(document).ready(function(){
  $(".GoToProduct").click(function(e){
    localStorage.setItem("product",JSON.stringify([]))
    let product = JSON.parse(localStorage.getItem("product"));
    let img1 = this.querySelector(".first").getAttribute("src")
    let img2 = this.querySelector(".second").getAttribute("src")
    let thisPrId = this.parentElement.parentElement.getAttribute("data-id")
    let prName = this.parentElement.nextElementSibling.querySelector(".name").innerText;
    let prPrice = Number(this.parentElement.nextElementSibling.querySelector(".price-value").innerText);
    product.push({
      img1: img1,
      img2: img2,
      id: thisPrId,
      name: prName,
      price: prPrice
    })
    localStorage.setItem("product",JSON.stringify(product))
  })
})

// Countdown time
function getDays(){
var deals = document.querySelectorAll("#deals .time");
  for(let time of deals){
    var setDay = time.querySelector(" .day span")
    var setHr = time.querySelector(" .hour span")
    var setMn = time.querySelector(" .minute span")
    var setSc = time.querySelector(" .second span")
    var new2 = new Date();
    var dy = Math.floor((new Date(time.getAttribute("data-countdown")) - new2)/1000/60/60/24);
    var hr = Math.floor((new Date(time.getAttribute("data-countdown")) - new2)/1000/60/60)%24;
    var mn = Math.floor((new Date(time.getAttribute("data-countdown")) - new2)/1000/60)%60;
    var sc = Math.floor((new Date(time.getAttribute("data-countdown")) - new2)/1000)%60;

    if(dy.length < 2){
      dy = "0"+dy;
    }
    if(hr.length < 2){
      hr = "0"+hr;
    }
    if(mn.length < 2){
      mn = "0"+mn;
    }
    if(sc.length < 2){
      sc = "0"+sc;
    }
    setDay.innerText = dy;
    setHr.innerText = hr;
    setMn.innerText = mn;
    setSc.innerText = sc;
  }
}

setInterval(getDays,1000);
// Scroll to top button visibility
function ScrollToTop(){
  let scBtn= document.querySelector(".toTopBtn");
  if(window.scrollY > 260){
    scBtn.style.opacity = "1"
    scBtn.style.visibility = "visible"
  }
  else{
    scBtn.style.opacity = "0"
    scBtn.style.visibility = "hidden"
  }
}
// to top function
document.querySelector(".topBtn").addEventListener("click",function(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})

AOS.init();
