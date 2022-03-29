// slider input -budget,area
let sliderOne=document.getElementById("slider-1")
let sliderTwo=document.getElementById("slider-2");
let displayValOne =document.getElementById("range1");
let displayValTwo=document.getElementById("range2");
let minGap=0;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) < minGap){
        sliderOne.Value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.value=sliderOne.value;    
}

function slideTwo(){
    if(parseInt(sliderTwo.value ) - parseInt(sliderOne.value) <=minGap ){
        sliderTwo.value=parseInt(sliderOne.value) + minGap;
    }
    
    displayValTwo.value=sliderTwo.value;
}



// On recieving input
function abc(){
    sliderOne.value = displayValOne.value;
    sliderTwo.value = displayValTwo.value;
    
}

// Area slider
let displayarea=document.getElementById("range1_area");
let displayarea2=document.getElementById("range2_area");
let area=document.getElementById("range1_box");
let area2=document.getElementById("range2_box");
console.log(displayarea,displayarea2,area,area2)
function slider_area1(){
    // displayarea.value=parseInt(area.value);
    area.value= displayarea.value;
}

function slider_area2(){
    area2.value=displayarea2.value;
}
function abc_area(){
    displayarea.value = area.value;
    displayarea2.value = area2.value;
    
}