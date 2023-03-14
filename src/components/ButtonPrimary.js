import React from 'react';
import {Button} from 'native-base';

const ButtonPrimary = ({children, ...props}) => {
  return (
    <Button
      maxWidth={'full'}
      w={80}
      // h={12}
      borderWidth={2}
      borderColor="brand.900"
      variant="unstyled"
      borderRadius="md"
      bg="brand.900"
      _text={{fontSize: 'lg', fontWeight: 'bold', color: 'text.100'}}
      _pressed={{opacity: 0.9}}
      {...props}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;
