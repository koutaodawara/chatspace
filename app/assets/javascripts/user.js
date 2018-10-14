$(() => {
  $('#user-search-field').on('input', function(e) {
    e.preventDefault();
    let input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(data) {
      console.log(data)
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    });

  });
});
