$(() => {
  function buildHTML(message) {
    let image = ""
    if (message.image) {
      image = `<img src="${message.image}" class="message__image"></div>`;
    }
    let html = `<div class="message message_id="${message.message_id}">
                  <h3 class="message__name">${message.user_name}</h3>
                  <p class="message__date">${message.created_at}</p>
                  <p class="message__body">${message.body}</p>
                  ${image}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    // FormDataとリクエストurlを取得
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      $('.main').append(buildHTML(data));
      $('.input-box__text').val("");
      // メッセージが増えていくdivのscrollHeightを使ってスクロール
      $('.chat').animate({
        scrollTop: $('.chat')[0].scrollHeight
      }, 200);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

  });
});
