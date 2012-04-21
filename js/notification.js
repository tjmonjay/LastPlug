$('#title').html($.url().param('title'));
$('#message').html(decodeURIComponent($.url().param('message')));
$('#avatar').attr('src', $.url().param('avatar'));