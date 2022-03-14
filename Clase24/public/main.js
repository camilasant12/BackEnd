let socket = io.connect(); 
socket.on('messages', function(data) { 
  console.log(data);
  render(data);
});


function render(data) { 
    let html = data.map(function(elem, Index){ 
      return(`
              <tr>
                <td>${elem.username}</td>
                <td>${elem.password}</td>
              </tr>`     
            ) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function addMessage(e) { 
    let mensaje = { 
      username: document.getElementById('username').value, 
      password: document.getElementById('password').value 
    }; 
    socket.emit('new-message', mensaje); // new-message es el nombre del evento (recordatorio)

    document.getElementById('username').value = ''
    document.getElementById('password').value = ''
    document.getElementById('username').focus()

    return false;
}


