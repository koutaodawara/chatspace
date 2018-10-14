$(() => {
  console.log("読み込めてるよ")
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
    // console.log(html);
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    // FormDataとリクエストurlを取得
    let formData = new FormData(this);
    let url = $(this).attr('action');
    console.log(url)

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log(data)
      let html = buildHTML(data);
      $('.chat').append(html);
      $('.input-box__text').val("");
      $('.input-box__image').val("");
      $(".form__send-btn").prop('disabled', false);
      $('.chat').animate({
        // offset().topで画面左上から対象要素までのスクロール量を取得
        scrollTop: $('.chat .message:last-child').offset().top
      }, 200);
      console.log("success");
    })
    .fail(function(XMLHttpRequest, textStatus, errorThrown) {
      alert("通信に失敗しました");
      console.log(XMLHttpRequest.status);
      console.log(textStatus);
      console.log(errorThrown);
      console.log("error");
    });
  });
});
