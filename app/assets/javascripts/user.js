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
});
