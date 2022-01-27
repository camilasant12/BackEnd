let socket = io.connect(); 
let socket2 = io.connect();
let date = new Date().toISOString();


//nombre producto
socket.on('messages', function(data) { 
  console.log(data);
  render(data);
});

socket2.on('messages2', function(data2) { 
  console.log(data2);
  render2(data2);
});

 
function render(data ) { 
    
    let html = data.map(function(elem, Index){ 

      return(`
              <tr>
                <td>${elem.product}</td>
                <td>${elem.precio}</td>
                <td><img src="${elem.foto}"></img></td>
              </tr>`     
            ) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

function render2(data2) { 
    
    let html2 = data2.map(function(elem2, Index){ 
      return(`<div>
              <strong style="color:blue; font-style:bold;">${elem2.author}</strong>
              <em style="color:red;"> [${date}]</em>: 
              <em style="color:green;">${elem2.text}</em> </div>`) 
        }).join(" "); 
        document.getElementById('messages2').innerHTML = html2; 
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

function addMessage2(e) { 
  let mensaje2 = { 
    author: document.getElementById('username').value, 
    text: document.getElementById('texto').value
  }; 
  socket.emit('new-message2', mensaje2); // new-message es el nombre del evento (recordatorio)

  document.getElementById('texto').value = ''
  document.getElementById('texto').focus()


    return false;
}

