import { useState } from 'react';
import '../App.css';

function User1() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [messageStatus, setMessageStatus] = useState({});
  const currentUser = 'User 1';

  const sendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      user: currentUser,
      text: messageText,
      timestamp: new Date().toLocaleTimeString(),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessageText('');

    setTimeout(() => {
      updateMessageStatus(newMessage.id, 'delivered');
    }, 1000);
  };

  const updateMessageStatus = (messageId, status) => {
    setMessageStatus((prevStatus) => ({
      ...prevStatus,
      [messageId]: status
    }));

    if (status === 'delivered') {
      setTimeout(() => {
        updateMessageStatus(messageId, 'read');
      }, 1000);
    }
  };

  const deleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message.id !== messageId));
  };

  const displayMessages = () => {
    return messages.map((message) => (
      <div key={message.id} className={`chat-message ${message.user === currentUser ? 'sent' : 'received'}`}>
        <div>
          <span>{message.user}: {message.text}</span>
          <span className="timestamp">{message.timestamp}</span>
          {message.user === currentUser && (
            <>
              <span className="status">{messageStatus[message.id]}</span>
              <button onClick={() => deleteMessage(message.id)}>Delete</button>
            </>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="chat-window">
      <div className="header" id="chat-header">
        {currentUser}
      </div>
      <div className="chat-messages" id="chat-messages">
        {displayMessages()}
      </div>
      <div className="footer">
        <input 
          type="text" 
          id="message-input" 
          placeholder="Type a message..." 
          value={messageText} 
          onChange={(e) => setMessageText(e.target.value)} 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default User1;
