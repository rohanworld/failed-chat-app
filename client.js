const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInp.value=''
})

const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'right')
})


socket.on('receive', data =>{
append(`${data.name}: ${data.message}`, 'right')
})