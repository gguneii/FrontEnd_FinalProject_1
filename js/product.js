// Get big image from home page
var prodImage = JSON.parse(localStorage.getItem("product"));
for(let images of prodImage){
  document.querySelector(".getPrice").innerText = images.price;
  document.querySelector(".name").innerText = images.name;
  let imgSlider = document.querySelector(".big-image-slider");
  let imageB1 = document.createElement("div");
  imageB1.setAttribute("class","image-b");
  imageB1.innerHTML = `
  
    <img src="${images.img1}" alt="">
  `
  let imageB2 = document.createElement("div");
  imageB2.setAttribute("class","image-b");
  imageB2.innerHTML = `
  
    <img src="${images.img2}" alt="">
  `
  
  imgSlider.append(imageB1,imageB2);
}

// Image slider
$('.big-image-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: '.small-image-slider'
});
$('.small-image-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.big-image-slider',
  centerPadding: '0px'
});
$(".slick-next").html(`<i class="fa-solid fa-arrow-right"></i>`)
$(".slick-prev").html(`<i class="fa-solid fa-arrow-left"></i>`)

// Tab menu in product page
var myTopBtns = document.querySelectorAll(".description-list li a");
var myTexts = document.querySelectorAll(".description-texts li");
for(let li of myTopBtns){
  li.addEventListener("click",function(e){
    e.preventDefault();
    var active = document.querySelector(".active-des");
    active.classList.remove("active-des")
    this.classList.add("active-des")

    var index = this.getAttribute("data-text");
    for(let text of myTexts){
      if(text.getAttribute("data-text") == 2 && text.getAttribute("data-text") === index){
        text.classList.add("active2");
      }
      else if(text.getAttribute("data-text") === index){
        text.classList.add("activet")
      }
      else{
        text.classList.remove("activet")
        text.classList.remove("active2")
      }
    }
  })
}
// Image on hover move
$(document).ready(function(){
  var X = 0;
  var Y = 0;
  $(".image-b img").mouseenter(function(en){
    $(this).css({
      "opacity" : "0"
    })
    X=580;
    Y=580;
    $(this).parent().css({
      "background-image" :`url(${this.src})`,
      "background-position" : `${X}px ${Y}px`,
      "transform" : "scale(1.7)",
      "transition" : "all 0s"
    })
    $(this).mousemove(function(e){
      $(this).parent().css({
        "background-image" :`url(${this.src})`,
        "background-position" : `${X-e.pageX}px ${Y-e.pageY}px`,
        "transform" : "scale(1.7)",
        "transition" : "all 0s"
      })
    })
  })
  $(".image-b img").mouseleave(function(){
    $(this).css({
      "opacity" : "1"
    })
    $(this).parent().css({
      "background-image" :`url(${this.src})`,
      "background-position" : `${X}px ${Y}px`,
      "transform" : "scale(1)",
      "transition" : "all 0s"
    })
  })
})

var lowerSlider = document.querySelector('#lower');
var  upperSlider = document.querySelector('#upper');

document.querySelector('#two').value=upperSlider.value;
document.querySelector('#one').value=lowerSlider.value;

var  lowerVal = parseInt(lowerSlider.value);
var upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);

    // if (upperVal < lowerVal + 4) {
    //     lowerSlider.value = upperVal;
    //     if (lowerVal == lowerSlider.min) {
    //     upperSlider.value = 4;
    //     }
    // }
    document.querySelector('#two').value=this.value
};

lowerSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    if (lowerVal > upperVal - 4) {
        upperSlider.value = lowerVal + 4;
        if (upperVal == upperSlider.max) {
            lowerSlider.value = parseInt(upperSlider.max) - 4;
        }
    }
    document.querySelector('#one').value=this.value
}
// Input count
  var myInp = document.querySelector(".inp-num .inp-value");
// if(JSON.parse(localStorage.getItem("basket")).length != 0){
  var increaseBtn = document.querySelector(".inp-num .up");
  var decreaseBtn = document.querySelector(".inp-num .down");
  var count = 1;
  increaseBtn.addEventListener("click",function(e){
    e.preventDefault()
    count+=1;
    myInp.innerText = count;
  })
  decreaseBtn.addEventListener("click",function(e){
    e.preventDefault()
    if(count > 1){
      count-=1;
      myInp.innerText = count;
    }
  })
// }

// Click on add button to add to cart
let addToCartBtn = document.querySelector(".addCartFProd");

addToCartBtn.addEventListener("click",function(){
  let basket = JSON.parse(localStorage.getItem("basket"));
  // let product = JSON.parse(localStorage.getItem("product"))

  // for(let item of basket){
    for(let prod of prodImage){
      let exist = basket.find(n =>n.id===prod.id);
      if(exist === undefined){
        basket.push({
          id: prod.id,
          name: prod.name,
          image: prod.img1,
          price: prod.price,
          count: Number(myInp.innerText)
        })
      }
      else{
        exist.count += Number(myInp.innerText);
      }
    }
  // }
  localStorage.setItem("basket",JSON.stringify(basket));
})