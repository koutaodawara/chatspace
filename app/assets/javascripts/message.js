$(() => {
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = window.location.href;
    console.log(url)

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    });
  });
});
