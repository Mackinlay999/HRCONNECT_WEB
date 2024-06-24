import {
  createChatBotMessage,
} from 'react-chatbot-kit';

const botName = 'HR CONNECT BOT';

const name = localStorage.getItem("name")

const config = {
  botName: botName,
  lang: 'no',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Hi ${name}, I’m here to assist you.`
    ),
  ],
  state: {
    gist: '',
    infoBox: '',
  },
  customComponents: {},
};

export default config;