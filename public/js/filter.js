let sliderOne=document.getElementById("slider-1")
let sliderTwo=document.getElementById("slider-2");
let sliderOne1=document.getElementById("range1_area")
let sliderTwo1=document.getElementById("range2_area");
let displayValOne =document.getElementById("range1");
let displayValTwo=document.getElementById("range2");
let displayValT =document.getElementById("range3");
let displayValF=document.getElementById("range4");
let minGap=0;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.Value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.innerText=sliderOne.value;    
}

function slideTwo(){
    if(parseInt(sliderTwo.value ) - parseInt(sliderOne.value) <=minGap ){
        sliderTwo.value=parseInt(sliderOne.value) + minGap;
    }
    
    displayValTwo.innerText=sliderTwo.value;
}


// Area slider
// let displayarea=document.getElementById("range");
// let area=document.getElementById("area");
// function slider_area(){
//     displayarea.innerText=parseInt(area.value);
// }
let displayarea1=document.getElementById("range1_area");
let displayarea2=document.getElementById("range2_area");
function slider_area1(){
    // displayarea.value=parseInt(area.value);

    displayValT.innerText=sliderOne1.value;

}

function slider_area2(){
    displayValF.innerText=sliderTwo1.value;
}



function changebckgd(elem){ 
    var elemt=document.getElementById(elem.id);

    if(elemt.style.backgroundColor=="transparent"){
        elemt.style.backgroundColor="#0D4039";
        elemt.style.color="white";
    }
    else{
        elemt.style.backgroundColor =" transparent";
        elemt.style.color="Black";
    }
}
function submit(){
    document.forms[0].submit();
}

