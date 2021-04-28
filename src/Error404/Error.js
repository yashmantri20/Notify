import { Image } from '@chakra-ui/image';
import { Box, Text } from '@chakra-ui/layout';
import React from 'react';
import error from '../assets/404.svg';

const Error = () => {
  return (
    <Box bg='white' height='100vh'>
      <Image src={error} width={[400, 500, 600]} m='auto' pt={[48, 32]} />
      <a href='/'>
        <Text
          textAlign='center'
          fontSize={['lg', 'xl', '2xl']}
          pt={2}
          fontWeight={600}
        >
          Go back home
        </Text>
      </a>
    </Box>
  );
};

export default Error;
