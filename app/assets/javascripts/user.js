$(() => {
  // 結果表示の要素を変数化
  let user_list = $('#user-search-result');

  function appendUser (user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-name=${user.name} data-user-id=${user.id} >追加</a>
                </div>`
    user_list.append(html);
  }

  function appendNoUser (user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    user_list.append(html);
  }

  function buildAddUserHTML (name, id) {
    let html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }

  $('#user-search-field').on('input', function(e) {
    e.preventDefault();
    // 入力内容を取得
    let input = $('#user-search-field').val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users) {
      user_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          // 検索結果にユーザーを追加する関数
          appendUser(user);
        })
      } else {
        appendNoUser(users);
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });

  $(document).on('click', '.chat-group-user__btn--add', function() {
    let userName = $(this).attr('data-user-name');
    let userId   = $(this).attr('data-user-id');


    $(this).parent().remove();
    let html = buildAddUserHTML(userName, userId);
    $('.js-add-user').append(html);
  })

  $(document).on('click', '.js-remove-btn', function() {
    $(this).parent().remove();
  })
});
