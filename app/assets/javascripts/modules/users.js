$(function() {

  let userSearchResult = $("#UserSearchResult");

  function appendUser(user) {
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    userSearchResult.append(html);
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${msg}</p>
                </div>`;
    userSearchResult.append(html);
  }

  function addMember(name, id) {
    let html = `<div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>`;
    $(".ChatMembers").append(html);
  }

  // keyup event
  $("#UserSearch__field").on("keyup", function() {
    let input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      userSearchResult.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('error: failed searching user.');
    });

  });

  // click event -- add
  $(userSearchResult).on("click", ".ChatMember__add.ChatMember__button", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  });

  // click event -- remove
  $(".ChatMembers").on("click", ".ChatMember__remove.ChatMember__button", function() {
    $(this).parent().remove();
  });

});
