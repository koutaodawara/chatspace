$(() => {
  // 結果表示の要素を変数化
  let user_list = $('#user-search-result');

  function appendUser (user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    user_list.append(html);
  }

  function appendNoUser (message) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${message}</p>
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

    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users) {
      // 検索結果を空欄にする
      user_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          // 検索結果にユーザーを追加する関数
          appendUser(user);
        })
      } else {
        appendNoUser('一致するユーザーが見つかりません');
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });

  $(document).on('click', '.chat-group-user__btn--add', function() {
    // ユーザー名とidを取得
    let userName = $(this).attr('data-user-name');
    let userId    = $(this).attr('data-user-id');
    // クリックされた要素の親要素を削除
    $(this).parent().remove();
    let html = buildAddUserHTML(userName, userId);
    $('.js-add-user').append(html);
  })


});
