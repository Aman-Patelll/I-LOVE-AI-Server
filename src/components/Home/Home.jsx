import React from 'react';
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import code from '../../assets/chat.png';
import imageGenerate from '../../assets/imageGenerate.png';
import textToVoice from '../../assets/textToVoice.png';
import robot from '../../assets/robott.png';

const Home = () => {
  return (
    <Box className="fontfamily">
      <Stack
        display={'flex'}
        flexDirection={['column', 'row']}
        justifyContent={'center'}
        alignItems={'center'}
        m={'5'}
        gap={[5, 20]}
        height={['90vh', '80vh']}
      >
        <Box textAlign={'justify'}>
          <Heading size={'2xl'}>Welcome to "I❤️AI"</Heading>
          <Text mt={5} fontSize={'lg'}>
            Explore the fascinating world of Artificial Intelligence with me.
          </Text>
          <Text fontSize={'lg'}>
            I can help you to Generate Text & Image, convert Voice to Text &
            vice-varsa
          </Text>
        </Box>
        <Box className="vector-graphics" width={'450px'}>
          <Image src={robot} />
        </Box>
      </Stack>
      <Stack
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={20}
        my={'10'}
      >
        <Box width={['95%', '80%']}>
          <Heading mb={'5'}>MERN-GPT</Heading>
          <Text my={5} fontSize={'lg'}>
            This module allows users to input prompts or text snippets and
            generates coherent text based on the provided input.
          </Text>
          <Image
            boxShadow={
              '0 8px 20px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.6)'
            }
            src={code}
          />
        </Box>
        <Box width={['95%', '80%']}>
          <Heading mb={'5'}>IMG-GENERATE</Heading>
          <Text my={5} fontSize={'lg'}>
            This module allows users to input prompts or text snippets and
            describe an image they want to generate, such as scenes, objects, or
            concepts.
          </Text>
          <Image
            boxShadow={
              '0 8px 20px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.6)'
            }
            src={imageGenerate}
          />
        </Box>
        <Box width={['95%', '80%']}>
          <Heading mb={'5'}>Text To Audio</Heading>
          <Text my={5} fontSize={'lg'}>
            This module allows users to input prompts or text snippets to
            generate the Audio of the human.
          </Text>
          <Image
            boxShadow={
              '0 8px 20px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.6)'
            }
            src={textToVoice}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
