let socket = io.connect(); 
//nombre producto

socket.on('messages2', function(data2) { 
  console.log(data2);
  render2(data2);
});


function render2(data2) { 
    
    let html2 = data2.map(function(elem2, Index){ 
      return(`<div>
              <strong style="color:blue, font-style:italic">${elem2.author}</strong>: 
              <em>${elem2.text}</em> </div>`) 
        }).join(" "); 
        document.getElementById('messages2').innerHTML = html2; 
}

function addMessage2(e) { 
  let mensaje2 = { 
    author: document.getElementById('username').value, 
    text: document.getElementById('texto').value
  }; 
  socket.emit('new-message', mensaje2); // new-message es el nombre del evento (recordatorio)

  document.getElementById('texto').value = ''
  document.getElementById('texto').focus()


    return false;
}

