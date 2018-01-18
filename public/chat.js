window.onload = function(){
  var messages=[];
  var socket=io.connect('http://localhost:3700');
  var field=document.getElementById('field');
  var sendBtn=document.getElementById('send');
  var content=document.getElementById('content');
  var sender= document.getElementById('sender');

  socket.on('message', function(data){
    if(data){
      messages.push(data);
      var htmlText='';
      for(var i=0; i<messages.length; i++){
        //htmlText+=messages[i] + '<br/>';
        htmlText+= ('<strong>'+((messages[i].username)?(messages[i].username)
        :('Server'))+'</strong>' + " : " + ((messages[i].message)?(messages[i].message):"-"))+'<br/>';
        // htmlText += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        // htmlText += messages[i].message + '<br />';
      }
      content.innerHTML=htmlText;
      content.scrollTop=content.scrollHeight;
    } else{
      console.log('Error: ', data);
    }
  });

  function sendMessage(){
    if(sender.value=='') alert('Please type your name!');
    else{
      socket.emit('send', {message: field.value, username: sender.value});
      field.value="";
      sender.value="";
      sender.focus();
    }
  }

  sendBtn.onclick = function(){
    sendMessage();
  };

  field.onkeyup=function(e){
    if(e.keyCode==13){
      sendMessage();
    }
  };

}
