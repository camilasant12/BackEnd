let socket = io.connect(); 
socket.on('messages', function(data) { 
  console.log(data);
  render(data);
});

function render(data) { 
    let html = data.map(function(elem, Index){ 
      return(`<tr>
                <td>${elem.product}</td>
                <td>${elem.precio}</td>
                <td>${elem.foto}</td>
              </tr>`     
            ) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function addMessage(e) { 
    let mensaje = { 
      product: document.getElementById('nombre').value, 
      precio: document.getElementById('precio').value, 
      foto: document.getElementById('foto').value
    }; 
    socket.emit('new-message', mensaje); // new-message es el nombre del evento (recordatorio)

    document.getElementById('nombre').value = ''
    document.getElementById('precio').value = ''
    document.getElementById('foto').value = ''
    document.getElementById('nombre').focus()

    return false;
}