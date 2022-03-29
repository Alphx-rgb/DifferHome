$(window).click((e)=>{
    if($(e.target).closest(".second_container").length >0   && $('.part_b').css('display') =='none'){
        $(".part_b").show(100);
    }
    else{
        if( !$(e.target).closest(".second_container").length){
            $(".part_b").hide(100);
        }
    }
}); 
$("#appartment-option").on('click',function(){
    console.log(this);
    if($('#part_aa').hasClass("part_a_checkedl") )
    {
        $('#part_aa ').removeClass('part_a_checkedl'); 
        $('#appartment-option >input').attr("checked",false);  
    }
    else{
        $('#part_aa').addClass('part_a_checkedl'); 
        $('#appartment-option >input').attr("checked",true); 
    }
    return(false);
});
$("#plot-option").on('click',function(){
    if($('#part_aa').hasClass("part_a_checkedr") )
    {
        $('#part_aa ').removeClass('part_a_checkedr'); 
        $('#plot-option >input').attr("checked",false); 
    }
    else{
        $('#part_aa').addClass('part_a_checkedr'); 
        $('#plot-option >input').attr("checked",true); 
    }
    return(false);

});
