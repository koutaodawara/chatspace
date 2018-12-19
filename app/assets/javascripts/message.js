$(() => {
  function buildHTML(message) {
    const IMAGE = message.image
    let html = ""
    let commonHtml = `<div class="message">
                        <h3 class="message__name">${message.user_name}</h3>
                        <p class="message__date">${message.created_at}</p>
                        <p class="message__body">${message.body}</p>`
    if (IMAGE != null) {
      html = commonHtml + `<img src="${IMAGE}" class="message__image"></div>`;
    } else {
      html = commonHtml + "</div>";
    }
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
     done(function(data) {
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.input-box__text').val("");
      $('.chat').animate({
        // メッセージが増えていくdivのscrollHeightを使ってスクロール
        scrollTop: $('.chat')[0].scrollHeight
      }, 200);
    })
    .fail(function() {
      alert("通信に失敗しました");
    });

    setTimeout(function() {
      $(".form__send-btn").prop('disabled', false)
    }, 1000);
  });
});
