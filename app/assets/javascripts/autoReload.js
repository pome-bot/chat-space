$(function(){

  function buildHTML(data){
    if ( data.image ) {
      let html = `<div class="message-box__message" data-message-id=${data.id}>
                    <div class="message-box__message__name-date">
                      <div class="message-box__message__name-date__name"><span>${data.name}</span></div>
                      <div class="message-box__message__name-date__date"><span>${data.date}</span></div>
                    </div>
                    <div class="message-box__message__text"><p>${data.text}</p></div>
                    <img class="message-box__message__image" src="${data.image}">
                  </div>`;
      return html;
    } else {
      let html = `<div class="message-box__message" data-message-id=${data.id}>
                    <div class="message-box__message__name-date">
                      <div class="message-box__message__name-date__name"><span>${data.name}</span></div>
                      <div class="message-box__message__name-date__date"><span>${data.date}</span></div>
                    </div>
                    <div class="message-box__message__text"><p>${data.text}</p></div>
                  </div>`;
      return html;
    }
  }

  let reloadMessages = function() {
    let last_message_id = $('.message-box__message:last').data("message-id");
    if ( !(last_message_id) ) { last_message_id = 0 }
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-box').append(insertHTML);
        $('.message-box').animate({ scrollTop: $('.message-box')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  // relaod
  setInterval(reloadMessages, 7000);

})
