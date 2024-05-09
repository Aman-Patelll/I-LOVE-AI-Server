import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import openaiLogo from '../../assets/openai.png';
import userLogo from '../../assets/user.png';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message) {
  if (message.includes('```')) {
    const blocks = message.split('```');
    return blocks;
  }
}

function isCodeBlock(str) {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('//')
  ) {
    return true;
  }
  return false;
}
const DisplayContant = ({ content }) => {
  let blocks;
  if (content?.includes('\n\n')) {
    blocks = content.split('\n\n');
  } else {
    blocks = [content];
  }

  return (
    <>
      {blocks.map((block, index) =>
        block?.charAt(0) >= '0' && block.charAt(0) <= '9' ? (
          <React.Fragment key={index}>
            <Text lineHeight={'30px'} fontSize="lg" fontWeight={'700'}>
              {block.substring(0, block.indexOf(':') + 1)}
            </Text>
            <Text lineHeight={'30px'} fontSize="md">
              {block.substring(block.indexOf(':') + 1)}
            </Text>
          </React.Fragment>
        ) : (
          <Text lineHeight={'30px'} key={index} fontSize="md">
            {block}
          </Text>
        )
      )}
    </>
  );
};

const ChatItem = ({ content, role }) => {
  const messageBlocks = extractCodeFromString(content);

  return role === 'assistant' ? (
    <Box
      display={'flex'}
      alignItems={'center'}
      p={3}
      backgroundColor={'#26425A'}
      color={'white'}
      gap={5}
      borderRadius={'15px'}
      my={2}
      width={['95%', '80%']}
    >
      <Avatar name="OpenAI" src={openaiLogo} size={'sm'} />
      <Box textAlign={'justify'} pl={'5px'} pr={['20px', '35px']}>
        {!messageBlocks && <DisplayContant content={content} />}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map(block =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <DisplayContant content={block} />
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      display={'flex'}
      alignItems={'center'}
      p={3}
      backgroundColor={'#004d56'}
      color={'white'}
      gap={5}
      borderRadius={'15px'}
      my={2}
      width={['95%', '80%']}
    >
      <Avatar name="OpenAI" src={userLogo} size={'sm'} />
      <Box lineHeight={'30px'}>
        {!messageBlocks && <DisplayContant content={content} />}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map(block =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <DisplayContant content={block} />
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
