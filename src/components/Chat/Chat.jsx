import React, { useRef, useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import ChatItem from './ChatItem';
import axios from 'axios';

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, I am AI ChatBot. How can i help you?. Ask me something',
    },
  ]);

  const sendChatRequest = async prompt => {
    const res = await axios.post('/chat', { prompt });
    if (res.status !== 200) {
      throw new Error('Unable to send chat');
    }
    const data = await res.data.choices[0].message;
    return data;
  };

  const inputRef = useRef(null);

  const handleSubmit = async () => {
    const prompt = inputRef.current?.value;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage = { role: 'user', content: prompt };
    setChatMessages(prev => [...prev, newMessage]);
    const chatData = await sendChatRequest(prompt);
    setChatMessages([...chatMessages, newMessage, chatData]);
  };

  return (
    <>
      <Box
        width={'100%'}
        height={['85vh', '80vh']}
        overflow={'scroll'}
        overflowX={'hidden'}
      >
        <Heading
          fontFamily={'Madimi One'}
          fontSize={'4xl'}
          textAlign={'center'}
          my={4}
        >
          MERN-GPT 3.5 Model
        </Heading>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
      </Box>
      <Box
        width={['95%', '78%']}
        borderRadius={15}
        backgroundColor="#1B3358"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin="8px auto"
      >
        {' '}
        <input
          ref={inputRef}
          type="text"
          style={{
            backgroundColor: 'transparent',
            width: '80%',
            padding: '15px',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: 'md',
          }}
          placeholder="Ask me any questions"
        />
        <Button
          variant={'ghost'}
          mx={'5'}
          color={'black'}
          backgroundColor={'#FBE4D8'}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>
    </>
  );
};

export default Chat;
