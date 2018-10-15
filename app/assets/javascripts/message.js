$(() => {
  function buildHTML(message) {
    const IMAGE = message.image.url
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
    .done(function(data) {
      let html = buildHTML(data);
      $('.chat').append(html);
      $('.input-box__text').val("");
      $('.input-box__image').val("");
      $(".form__send-btn").prop('disabled', false);
      $('.chat').animate({
        // offset().topで画面左上から対象要素までのスクロール量を取得
        scrollTop: $('.chat .message:last-child').offset().top
      }, 200);
    })
    .fail(function() {
      alert("通信に失敗しました");
    });
  });

  setInterval(function() {
    console.log("3秒おき")
  }, 3000);
});
