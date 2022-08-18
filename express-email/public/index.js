(function () {
  $('#btn').on('click', function () {
    $.ajax({
      url: '/',
      type: 'post',
    })
      .done(function (json) {
        console.log(json);
      })
      .fail(function (xhr, status, errorThrown) {
        console.log(status);
        console.log(errorThrown);
      });
  });
})();
