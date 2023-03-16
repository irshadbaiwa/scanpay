import {Pressable, Row, Column, Text} from 'native-base';
import {Alert} from 'react-native';

const TransactionHistory = ({
  narration,
  timestamp,
  amount,
  type,
  transactionId,
}) => {
  const onPress = () => {
    Alert.alert(
      `Transaction ID: ${transactionId}`,
      `Amount: ₦${amount} Narration: ${narration}`,
    );
  };

  return (
    <Pressable
      onPress={onPress}
      mx={1}
      p={2}
      bg="white"
      shadow="4"
      borderRadius="lg"
      maxW="full"
      overflow="hidden"
      _pressed={{backgroundColor: 'blueGray.100'}}>
      <Row alignItems="center">
        <Column flex={1} mx="2">
          <Text
            color="text.800"
            fontWeight="medium"
            fontSize="md"
            numberOfLines={1}>
            {narration}
          </Text>
          <Text
            fontSize="xs"
            fontWeight="medium"
            color="text.400"
            numberOfLines={1}>
            {timestamp}
          </Text>
        </Column>
        <Text
          color={type === 'credit' ? 'success.600' : 'error.700'}
          fontSize="md"
          fontWeight="bold"
          mr="1">
          {(type === 'credit' ? '+' : '-') + '₦' + amount}
        </Text>
      </Row>
    </Pressable>
  );
};

export default TransactionHistory;
