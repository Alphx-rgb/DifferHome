
$(document).ready(function(){
	$(".form-wrapper .button").click(function(){
	  var button = $(this);
	  var currentSection = button.parents(".section");
	  var currentSectionIndex = currentSection.index();
	  var headerSection = $('.steps li').eq(currentSectionIndex);
	  currentSection.removeClass("is-active").next().addClass("is-active");
	  headerSection.removeClass("is-active").next().addClass("is-active");
  
	//   $(".form-wrapper").submit(function(e) {
	// 	e.preventDefault();
	//   });
  
	});
  });
  $(document).ready(function(){
	$(".form-wrapper .button").click(function(){
	  var button = $(this);
	  var currentSection = button.parents(".section");
	  var currentSectionIndex = currentSection.index();
	  var headerSection = $('.steps li').eq(currentSectionIndex);
	  currentSection.removeClass("is-active").next().addClass("is-active");
	  headerSection.removeClass("is-active").next().addClass("is-active");
  
	//   $(".form-wrapper").submit(function(e) {
	// 	e.preventDefault();
	//   });
  
	  if(currentSectionIndex === 3){
		$(document).find(".form-wrapper .section").first().addClass("is-active");
		$(document).find(".steps li").first().addClass("is-active");
	  }
	});
  });
$(document).ready(function(){
	$(".form-wrapper .buttonprev").click(function(){
	  var button = $(this);
	  var currentSection = button.parents(".section");
	  var currentSectionIndex = currentSection.index();
	  var headerSection = $('.steps li').eq(currentSectionIndex);

	console.log(currentSectionIndex);
	  if(currentSectionIndex!=0){	  
		  currentSection.removeClass("is-active");
	  headerSection.removeClass("is-active"); 
	  var prevsectioinindex =(currentSection.index());
	  prevsectioinindex-=1;
	  console.log(prevsectioinindex);
	  $('.steps	li').eq(prevsectioinindex).addClass("is-active");
	  $('.section').eq(prevsectioinindex).addClass("is-active");

	}
	  
	//   $(".form-wrapper").submit(function(e) {
	// 	e.preventDefault();
	//   });
  
	//   if(currentSectionIndex === 3){
	// 	$(document).find(".form-wrapper .section").first().addClass("is-active");
	// 	$(document).find(".steps li").first().addClass("is-active");
	//   }
	});
  });
	