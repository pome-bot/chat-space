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
                  <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>`;
    $(".ChatMembers").append(html);
  }

  // keyup event
  $("#UserSearch__field").on("keyup", function() {
    let input = $(this).val();
    let url_group_id = $("form").attr('action');  // "/groups/group_id"
    let group_id = url_group_id.substr(8);

    var group_user_ids = $(".ChatMember__remove").map(function(){
      return $(this).data('user-id');
    }).toArray();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, group_id: group_id, user_ids: group_user_ids },
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

    let input = $("#UserSearch__field").val();
    let url_group_id = $("form").attr('action');  // "/groups/group_id"
    let group_id = url_group_id.substr(8);

    // let group_user_ids = [];
    // for(let i=0; i < ChatMember__removes.length; i++){
    //   group_user_ids.push(ChatMember__removes[i].getAttribute('data-user-id'));
    // }

    var group_user_ids = $(".ChatMember__remove").map(function(){
      return $(this).data('user-id');
    }).toArray();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, group_id: group_id, user_ids: group_user_ids },
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

});
