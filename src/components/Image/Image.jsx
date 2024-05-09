import React, { useRef, useState } from 'react';
import { Box, Button, Heading, Image } from '@chakra-ui/react';
import axios from 'axios';
import ChatItem from '../Chat/ChatItem';

const GenerateImage = () => {
  const inputRef = useRef(null);
  const [imgText, setImgText] = useState('');
  const [image, setImage] = useState([]);

  const handleSubmit = async () => {
    const prompt = inputRef.current?.value;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const response = await axios.post('/generate/image', { prompt });
    if (response.status !== 200) {
      throw new Error('Unable to send image');
    }
    console.log(response.data);
    setImgText(prompt);
    setImage(response.data);
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
          my={6}
        >
          IMG-GENERATE
        </Heading>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'80%'}
        >
          {image && imgText && (
            <>
              <ChatItem content={imgText} role={'user'} />
              <Box
                boxSize={['xs', 'sm']}
                display={'flex'}
                flexDirection={['column', 'row']}
                justifyContent={'center'}
                alignItems={'center'}
                gap={['10', '40']}
                mt={'10'}
              >
                <Image borderRadius={'12px'} src={image[0]?.url} />
                <Image borderRadius={'12px'} src={image[1]?.url} />
              </Box>
            </>
          )}
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
          placeholder="Give Some Prompt for Image Generation"
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

export default GenerateImage;
