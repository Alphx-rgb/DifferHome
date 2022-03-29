var num =2;
$('.btn-info').on('click',function () {
    // $('.more-img').removeClass('hide');
    // $(this).addClass('hide');
    $('.images').append(`<input type="file" name="img${num}" id="">`)
    num=num+1;
})