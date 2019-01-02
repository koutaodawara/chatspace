// $(() => {
//   function buildHTML(message) {
//     let image = ""
//     if (message.image.url) {
//       image = `<img src="${message.image.url}" class="message__image">`
//     }
//     let html = `<div class="message" message_id="">
//                   <h3 class="message__name">${message.user_name}</h3>
//                   <p class="message__date">${message.created_at}</p>
//                   <p class="message__body">${message.body}</p>
//                   ${image}
//                 </div>`
//     return html;
//   }

//   let group_id  = $('.group-info__group-name').attr('group_id');
//   let path      = window.location.pathname;
//   setInterval(function() {
//     let latest_id = $('.message:last').attr('message_id');
//     $.ajax({
//       url: path,
//       data: {
//         latest_id: latest_id
//       },
//       dataType: 'json'
//     })
//     .done(function(data) {
//       if (data.lenght != 0) {
//         $.each(data, function(i, message) {
//           let html = buildHTML(message);
//           $('.chat').append(html);
//         });
//         $('.chat').animate({
//           scrollTop: $('.chat').scrollHeight
//         }, 200);
//       }
//     })
//     .fail(function() {
//       alert('自動更新に失敗しました')
//     });
//   }, 5000);
// });
