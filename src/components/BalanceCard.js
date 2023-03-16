import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {Box, Column, Row, Heading, Text, Pressable, Icon} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import {userDetails} from '../recoil/atoms';
import {numberWithCommas} from '../utils/helpers';

const BalanceCard = props => {
  const [showBalance, setShowBalance] = useState(false);
  const user = useRecoilValue(userDetails);

  return (
    <Box
      w="sm"
      maxWidth="full"
      h={32}
      alignSelf="center"
      borderRadius="2xl"
      bg="brand.900"
      {...props}>
      <Column px="4" py="4">
        <Text color="text.200">Wallet Balance:</Text>
        <Row mt="2" alignItems="center">
          <Heading color="text.100" fontSize="3xl">
            {showBalance
              ? '₦' + numberWithCommas(user.walletBalance)
              : 'XXXX.XX'}
          </Heading>
          <Pressable onPress={() => setShowBalance(current => !current)}>
            <Icon
              as={<Ionicons name={showBalance ? 'eye' : 'eye-off'} />}
              size={5}
              ml="6"
              color="muted.300"
            />
          </Pressable>
        </Row>
      </Column>
    </Box>
  );
};

export default BalanceCard;
