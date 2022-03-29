
$('shrink-img,expand-img,.map').on('click',function () {
    $('.shrink-img').toggleClass('hide');
    $('.expand-img').toggleClass('hide');
    $('.imgs').toggleClass('change-si-size');
    $('.map').toggleClass('expand');
    $('.side-images').toggleClass('horizontal');
    $('.main-image').toggleClass('change-size');
})

$('.more-btn').on('click',function () {
    $('.other-details').addClass('show');
    $(this).addClass('hide');
    $('.less-btn').addClass('show');
})

$('.less-btn').on('click',function () {
    $('.other-details').removeClass('show');
    $(this).removeClass('show');
    $('.more-btn').removeClass('hide');
})

// #toggle + label
// $('#toggle + label').toggleClass('active');
