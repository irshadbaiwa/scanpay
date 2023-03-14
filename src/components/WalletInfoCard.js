import {Row, Box, Text} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

const WalletInfoCard = ({title, value, iconName, ...props}) => {
  return (
    <Box {...props}>
      <Row
        h={16}
        maxWidth="md"
        p={2}
        bg="white"
        borderRadius="lg"
        shadow="3"
        overflow="hidden"
        alignItems="center">
        <Box
          size={12}
          bg="info.100"
          mr="2"
          borderRadius="lg"
          alignItems="center"
          justifyContent="center">
          <Ionicons name={iconName} size={36} color="#0369a1" />
        </Box>
        <Box flex={1}>
          <Text
            fontSize="xs"
            fontWeight="medium"
            color="text.400"
            numberOfLines={1}
            textTransform="uppercase">
            {title}
          </Text>
          <Text
            color="text.600"
            fontWeight="medium"
            fontSize="lg"
            numberOfLines={1}>
            {value}
          </Text>
        </Box>
      </Row>
    </Box>
  );
};

export default WalletInfoCard;
