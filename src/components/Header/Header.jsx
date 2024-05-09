import React from 'react';
import { Avatar, Box, Button, HStack } from '@chakra-ui/react';
import logo from '../../assets/openai.png';
import { Link } from 'react-router-dom';

const LinkButton = ({ url = '/', title = 'Home' }) => (
  <Link to={url}>
    <Button fontSize={'2xl'} variant={'ghost'}>
      {title}
    </Button>
  </Link>
);

const Header = () => {
  return (
    <>
      <HStack
        width={['90vw', '100vw']}
        height={'16'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        className="fontfamily"
        p={'5'}
        fontSize={'2xl'}
        fontWeight={'600'}
      >
        <HStack gap={'1'} width={'200px'}>
          <Avatar
            display={['none', 'inline-block']}
            name="OpenAI"
            src={logo}
            size={'md'}
          />
          <Box>I❤️AI</Box>
        </HStack>
        <HStack width={'80%'} justifyContent={'center'} gap={'5'}>
          <LinkButton url="/" title="Home" />
          <LinkButton url="/chat" title="Chat" />
          <LinkButton url="/image" title="Image" />
          <LinkButton url="/audio" title="Audio" />
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
