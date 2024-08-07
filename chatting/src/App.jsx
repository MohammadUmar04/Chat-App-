import  { useState } from 'react';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('User 1');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const selectChat = (user) => {
    setCurrentUser(user);
  };

  const sendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage = {
      user: currentUser,
      text: messageText
    };
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const displayMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className={`chat-message ${message.user === currentUser ? 'sent' : 'received'}`}>
        {message.user}: {message.text}
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="header">
          <strong>Chats</strong>
        </div>
        <div className="chat-list">
          <div className="chat-item" onClick={() => selectChat('User 1')}>User 1</div>
          <div className="chat-item" onClick={() => selectChat('User 2')}>User 2</div>
        </div>
      </div>
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
    </div>
  );
}

export default App;
