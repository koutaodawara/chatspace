$(() => {
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = window.location.href;
    console.log(url)
  });
});
