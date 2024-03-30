const socket = io('');
  var roomId = prompt('Enter a room ID or create a new one');
  if(!roomId) roomId = "Public"
  const messagesList = document.getElementById('messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const userList = document.getElementById('user-list');
  const roomIdElement = document.getElementById('room-id');

  // Generate a random username
  const username = `User${Math.floor(Math.random() * 1000)}`;

  // Join the room
  socket.emit('joinRoom', { roomId, username });

  // Receive previous messages
  socket.on('previousMessages', (messages) => {
    messages.forEach((message) => {
      addMessage(message.username, message.message, message.timestamp);
    });
  messagesList.scrollTop = messagesList.scrollHeight;
  });

  // Receive new messages
  socket.on('receivedMessage', (data) => {
    addMessage(data.username, data.message, data.timestamp);
  });

  // Update user list when a new user joins or leaves
  socket.on('users', (usernames) => {
    userList.innerHTML = '';
    usernames.forEach((newUsername) => {
      const userItem = document.createElement('ol');
      userItem.textContent = newUsername;
      userList.appendChild(userItem);
    });
  });

  // Add a new message to the chat
  function addMessage(username, message, timestamp) {
    const messageElement = document.createElement('div');
    messageElement.className = `mb-4 rounded-lg p-2 shadow ${
      username === socket.id ? 'bg-blue-100' : 'bg-white'
    } flex flex-col`;

    const messageHeader = document.createElement('div');
    messageHeader.className = 'flex items-center';

    const usernameSpan = document.createElement('span');
    usernameSpan.className = 'text-gray-700 font-semibold mr-2';
    usernameSpan.textContent = `${username}:`;

    const messageText = document.createElement('div');
    messageText.className = 'text-gray-800 break-words whitespace-pre-wrap text-wrap';
    messageText.textContent = message;

    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'text-gray-500 ml-2';
    timestampSpan.textContent = new Date(timestamp).toLocaleString();

    messageHeader.appendChild(usernameSpan);
    messageHeader.appendChild(messageText);
    messageHeader.appendChild(timestampSpan);

    messageElement.appendChild(messageHeader);

    messagesList.appendChild(messageElement);
    messagesList.scrollTop = messagesList.scrollHeight;
  }
  // Send a message
  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
      socket.emit('sendMessage', { roomId, message, username });
      messageInput.value = '';
    }
  });

  // Update room ID display
  roomIdElement.textContent = roomId;
  window.addEventListener('beforeunload', () => {
        socket.emit('leaveRoom', { roomId, username });
      });

            messagesList.scrollTop = messagesList.scrollHeight;