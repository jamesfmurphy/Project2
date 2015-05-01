var main = function (data) {

	var socket = io.connect();
	var $nickForm = $('#setNick');
	var $nickError = $('#nickError');
	var $nickBox = $('#nickname');
	var $users = $('#users');
	var $messageForm = $('#send-message');
	var $messageBox = $('#message');
	var $chat = $('#chat');
			
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
		$chat.append('<b>' + data.chatname + ': </b>' + data.message + "<br/>");
	});
};

$(document).ready(function (data) {
        main();
});