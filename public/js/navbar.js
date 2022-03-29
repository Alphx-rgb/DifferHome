let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
    if (nav.style.transform != 'translateX(0%)') {
        nav.style.transform = 'translateX(0%)';
        nav.style.transition = 'transform 0.2s ease-out';
    } else { 
        nav.style.transform = 'translateX(-100%)';
        nav.style.transition = 'transform 0.2s ease-out';
    }
});


// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

toggleIcon.addEventListener('click', () => {var navElement = document.querySelector("#navbar");
    if (toggleIcon.className != 'menuIcon toggle') {
        toggleIcon.className += ' toggle';navElement.style.backgroundColor = "#C2BEBA";
    } else {
        toggleIcon.className = 'menuIcon';navElement.style.backgroundColor = "#18181b";
    }
});

function changeCss () {
    var navelems = document.querySelectorAll("#menu a");
    var navElement = document.querySelector("#navbar");
    this.scrollY > 0 ?  navElement.style.color = "white" : navElement.style.color ="#003B31";
    this.scrollY > 0 ?  navElement.style.backgroundColor = "#49796B" : navElement.style.backgroundColor   ="white";
    for(i=0;i<navelems.length;i++)
    {   this.scrollY > 0 ?  navelems[i].style.color = "white" : navelems[i].style.color   ="#003B31";
}
  }
  window.addEventListener("scroll", changeCss , false);