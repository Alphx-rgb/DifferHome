var slides = document.querySelectorAll(".slide");
var dots = document.querySelectorAll(".dot");
var index = 0;


function prevSlide(n){
  index+=n;
  console.log("prevSlide is called");
  changeSlide();
}

function nextSlide(n){
  index+=n;
  changeSlide();
}

changeSlide();

function changeSlide(){
    
  if(index>slides.length-1)
    index=0;
  
  if(index<0)
    index=slides.length-1;
  
  
  
    for(let i=0;i<slides.length;i++){
      slides[i].style.display = "none";
      
     // dots[i].classList.remove("active");
      
      
    }
    
    slides[index].style.display = "block";
    dots[index].classList.add("active");
}

//setInterval(function(){document.getElementById('next').click();console.log("aa");},2000);

/*
$(document).ready(function () {
  var totDivs = $("#next").length;
  var currDiv = 0;
  var myInterval = setInterval(function () {
      if (currDiv > totDivs) {
          clearInterval(myInterval);
          return
      }
      $("#next").eq(currDiv).find('a').trigger("click");
      currDiv++;

  }, 2000);
});

$(document).on("click", "a", function () {
  alert($(this).text());
});*/