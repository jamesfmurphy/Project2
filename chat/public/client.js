// https://www.youtube.com/watch?v=dOSIqJWQkXM

var main = function (data) {

	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $users = $('#users');
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
	var $chat = $('#chat');

    var randomColor = "";
    var library ="abcdef1234567890";
    for(var i = 0; i < 6; i++)
    {
  		randomColor += library.charAt(Math.floor(Math.random()* library.length));
    }
			
	$nickForm.submit(function(e){
		e.preventDefault();
		socket.emit('new user', $nickBox.val(), function(data){
			if(data){
				$('#nickWrap').hide();
				$('#contentWrap').show();
			} else{
				$nickError.html('Please select another username.');
			}
		});
		$nickBox.val('');
	});

	socket.emit('user color', randomColor);
			
	socket.on('usernames', function(data){
		var html = '';
		for(i=0; i < data.length; i++){
			html += data[i] + '<br/>'
		}
		$users.html(html);
	});
			
	$messageForm.submit(function(e){
		e.preventDefault();
		socket.emit('send message', $messageBox.val());
		$messageBox.val('');
	});
			
	socket.on('new message', function(data){
		$chat.append('<b style="color: #' + data.look + '";>' + data.chatname + ': </b>' + data.message + "<br/>");
	});
};

$(document).ready(function (data) {
        main();
});