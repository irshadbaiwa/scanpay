import {Box, Column, Text, Pressable} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

const ActionnPill = ({action, iconName, ...props}) => {
  return (
    <Pressable _pressed={{opacity: 0.7}} {...props}>
      <Column alignItems="center">
        <Box
          size={12}
          bg="brand.900"
          borderRadius="full"
          alignItems="center"
          justifyContent="center">
          <Ionicons name={iconName} size={30} color="#f5f5f5" />
        </Box>
        <Text fontWeight="bold" fontSize="md" color="text.500">
          {action}
        </Text>
      </Column>
    </Pressable>
  );
};

export default ActionnPill;
