$(function(){

  function buildHTML(data){
    let html;
    if ( data.image ) {
      html = `<div class="message-box__message" data-message-id=${data.id}>
                <div class="message-box__message__name-date">
                  <div class="message-box__message__name-date__name"><span>${data.name}</span></div>
                  <div class="message-box__message__name-date__date"><span>${data.date}</span></div>
                </div>
                <div class="message-box__message__text"><p>${data.text}</p></div>
                <img class="message-box__message__image" src="${data.image}">
              </div>`;
    } else {
      html = `<div class="message-box__message" data-message-id=${data.id}>
                <div class="message-box__message__name-date">
                  <div class="message-box__message__name-date__name"><span>${data.name}</span></div>
                  <div class="message-box__message__name-date__date"><span>${data.date}</span></div>
                </div>
                <div class="message-box__message__text"><p>${data.text}</p></div>
              </div>`;
    }
    return html;
  }

  // ajax -- add message
  $('#form-message').on('submit', function(e){
    e.preventDefault();

    let form_text_val = $(".form__contents__text").val();
    let form_image = $(".form__contents__label--file-field").prop('files');

    if (form_text_val == "" && form_image.length == 0) {
      alert('Sorry, posting your message failed!!!');
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    } else {
      let formData = new FormData(this);
      let url = $(this).attr('action')  // "/groups/:group_id/messages"
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false, // FormData
        contentType: false  // FormData
      })
  
      .done(function(data){
        let html = buildHTML(data);
        $('.message-box').append(html);
        $('.message-box').animate({ scrollTop: $('.message-box')[0].scrollHeight});
      })
      .fail(function(){
        alert('Error');
      })
      .always(function(){
        $('form')[0].reset();
        $('.form__submit').prop('disabled', false);
      })
    }
  })

})
