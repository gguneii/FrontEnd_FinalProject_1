$('.myslider').slick({
    slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      }
    }
  ]
  })
  $(".slick-slider .slick-next").html(`<i class="fa-solid fa-arrow-right"></i>`)
  $(".slick-slider .slick-prev").html(`<i class="fa-solid fa-arrow-left"></i>`)
  // Image counter

window.onscroll = function(e){
  headerFix();
  ScrollToTop();
  if(window.scrollY > 2200){
    const counters = document.querySelectorAll('.value');
    const speed = 1000;

counters.forEach( counter => {
   var animate = () => {
      const value = +counter.getAttribute('akhi');
      const data = +counter.innerText;
     
      const time = value / speed;
     if(data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 300);
        }else{
          counter.innerText = value;
        }
   }
   setTimeout(animate, 499);
});
  }
}
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