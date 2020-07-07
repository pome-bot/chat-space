$(function(){
  function buildHTML(data){
    if ( data.image ) {
      let html = `<div class="message-box__message">
                    <div class="message-box__message__name-date">
                      <div class="message-box__message__name-date__name"><span>${data.name}</span></div>
                      <div class="message-box__message__name-date__date"><span>${data.date}</span></div>
                    </div>
                    <div class="message-box__message__text"><p>${data.text}</p></div>
                    <img class="message-box__message__image" src="${data.image}">
                  </div>`;
      return html;
    } else {
      let html = `<div class="message-box__message">
                    <div class="message-box__message__name-date">
                      <div class="message-box__message__name-date__name"><span>${data.name}</span></div>
                      <div class="message-box__message__name-date__date"><span>${data.date}</span></div>
                    </div>
                    <div class="message-box__message__text"><p>${data.text}</p></div>
                  </div>`;
      return html;
    }
  }

  $('#form-message').on('submit', function(e){
    e.preventDefault();

    let formData = new FormData(this);
    let url = $(this).attr('action')
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
      alert('Sorry, posting your message failed.');
    })
    .always(function(){
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })

  })
})
