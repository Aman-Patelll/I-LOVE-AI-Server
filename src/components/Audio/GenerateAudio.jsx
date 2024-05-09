import { Box, Button, Heading } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer';
import axios from 'axios';
import ChatItem from '../Chat/ChatItem';

const GenerateAudio = () => {
  const inputRef = useRef(null);
  const [text, setText] = useState('');
  const [audio, setAudio] = useState('');

  const handleSubmit = async () => {
    const prompt = inputRef.current?.value;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    setAudio('');
    const response = await axios.post('/generate/audio', { prompt });
    if (response.status !== 200) {
      throw new Error('Unable to send image');
    }
    console.log(response.data);
    setText(prompt);
    setAudio(response.data);
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
          Text To Audio
        </Heading>
        <Box
          width={['95%', '80%']}
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
            placeholder="Give Some Text to Generate Audio"
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
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {audio && (
            <>
              <ChatItem content={text} role={'user'} />
              <AudioPlayer audioSrc={audio} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default GenerateAudio;
