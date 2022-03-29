function color1() {
    $("#c1").css("color","white")
    document.getElementById("c1").style.backgroundColor = "#254E7B";
    document.getElementById("h-2").style.fontSize = 0;
    document.getElementById("h-3").style.fontSize = 0;
    document.getElementById("h-4").style.fontSize = 0;
    document.getElementById("p-2").style.fontSize = 0;
    document.getElementById("p-3").style.fontSize = 0;
    document.getElementById("p-4").style.fontSize = 0;
    document.getElementById("h-1").style.fontSize = "2rem";
    document.getElementById("p-1").style.fontSize = "15px";

  }

  function color2() {
    document.getElementById("c2").style.color="white";
    document.getElementById("c2").style.backgroundColor = "#254E7B";
    document.getElementById("t1").style.backgroundColor = "#254E7B";

    document.getElementById("h-1").style.fontSize = 0;
    document.getElementById("h-3").style.fontSize = 0;
    document.getElementById("h-4").style.fontSize = 0;

    document.getElementById("p-1").style.fontSize = 0;
    document.getElementById("p-3").style.fontSize = 0;
    document.getElementById("p-4").style.fontSize = 0;

    document.getElementById("h-2").style.fontSize = "2rem";
    document.getElementById("p-2").style.fontSize = "15px";
  }

  function color3() {
    document.getElementById("c3").style.color="white";
    document.getElementById("c3").style.backgroundColor = "#254E7B";
    document.getElementById("t2").style.backgroundColor = "#254E7B";

    document.getElementById("h-1").style.fontSize = 0;
    document.getElementById("h-2").style.fontSize = 0;
    document.getElementById("h-4").style.fontSize = 0;

    document.getElementById("p-1").style.fontSize = 0;
    document.getElementById("p-2").style.fontSize = 0;
    document.getElementById("p-4").style.fontSize = 0;

    document.getElementById("h-3").style.fontSize = "2rem";
    document.getElementById("p-3").style.fontSize = "15px";
  }

  function color4() {
    document.getElementById("c4").style.color="white";
    document.getElementById("c4").style.backgroundColor = "#254E7B";
    document.getElementById("t3").style.backgroundColor = "#254E7B";

    document.getElementById("h-1").style.fontSize = 0;
    document.getElementById("h-2").style.fontSize = 0;
    document.getElementById("h-3").style.fontSize = 0;

    document.getElementById("p-1").style.fontSize = 0;
    document.getElementById("p-2").style.fontSize = 0;
    document.getElementById("p-3").style.fontSize = 0;

    document.getElementById("h-4").style.fontSize = "2rem";
    document.getElementById("p-4").style.fontSize = "15px";
  }

    setTimeout(color1, 0);
    setTimeout(color2, 1000);
    setTimeout(color3, 2000);
    setTimeout(color4, 3000);

    document.getElementById("c1").style.backgroundColor = "gray";
    document.getElementById("c2").style.backgroundColor = "gray";
    document.getElementById("c3").style.backgroundColor = "gray";
    document.getElementById("c4").style.backgroundColor = "gray";

    document.getElementById("t1").style.backgroundColor = "gray";
    document.getElementById("t2").style.backgroundColor = "gray";
    document.getElementById("t3").style.backgroundColor = "gray";

  function Repeat(){
    setTimeout(color1, 0);
    setTimeout(color2, 1000);
    setTimeout(color3, 2000);
    setTimeout(color4, 3000);
    document.getElementById("c1").style.color="black";
    document.getElementById("c2").style.color="black";
    document.getElementById("c3").style.color="black";
    document.getElementById("c4").style.color="black";
    document.getElementById("c1").style.backgroundColor = "gray";
    document.getElementById("c2").style.backgroundColor = "gray";
    document.getElementById("c3").style.backgroundColor = "gray";
    document.getElementById("c4").style.backgroundColor = "gray";

    document.getElementById("t1").style.backgroundColor = "gray";
    document.getElementById("t2").style.backgroundColor = "gray";
    document.getElementById("t3").style.backgroundColor = "gray";
    
  }

  setInterval(Repeat,4000);