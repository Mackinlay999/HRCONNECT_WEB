import React  from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './Config.js';
import actionProvider from './ActionProvider.js';
import messageParser from './MessageParser.js';

function ChatbotCompo() {
  return (
    <div className='App'>
        <Chatbot
          config={config}
          actionProvider={actionProvider}
          messageParser={messageParser}
        />
    </div>
  );
}

export default ChatbotCompo;