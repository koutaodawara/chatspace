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

  setInterval(function() {
    let group_id = $('.group-info__group-name').attr('group_id');
    let path = window.location.pathname;
    if (path == `/groups/${group_id}/messages`) {
      console.log("hello")
      $.ajax({
        url: path,
        dataType: 'json'
      })
      .done(function(data) {
        $('.chat').empty();
        $.each(data, function(i, message) {
          let html = buildHTML(message);
          $('.chat').append(html);
        });
        $('.chat').animate({
          scrollTop: $('.chat .message:last-child').offset().top
        }, 200);
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      });
    }
  }, 5000);
});
