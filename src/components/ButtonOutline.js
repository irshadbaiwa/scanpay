import React from 'react';
import {Button} from 'native-base';

const ButtonOutline = ({children, ...props}) => {
  return (
    <Button
      maxWidth={'full'}
      w={80}
      // h={12}
      borderWidth={2}
      borderColor="brand.900"
      variant="outline"
      borderRadius="md"
      bg="light.100"
      _text={{fontSize: 'lg', fontWeight: 'bold', color: 'text.900'}}
      _pressed={{backgroundColor: 'light.200'}}
      _hover={{backgroundColor: 'light.200'}}
      {...props}>
      {children}
    </Button>
  );
};

export default ButtonOutline;
