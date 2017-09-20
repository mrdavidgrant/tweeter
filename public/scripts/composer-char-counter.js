$(function (){
  $('textarea').on('keyup', function(){
    let chars = 140 - +$(this).val().length
    let counter = $('#counter')
    counter.text(chars)
    if (chars < 0) {
      counter.removeClass('warning')
      counter.addClass('error')
    } else if (chars < 10) {
      counter.removeClass('error')
      counter.addClass('warning')  
    } else {
      counter.removeClass('warning')
      counter.removeClass('error')
    }
  })
})