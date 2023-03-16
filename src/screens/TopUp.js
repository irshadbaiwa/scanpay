import {useState} from 'react';
import {Alert} from 'react-native';
import {
  HStack,
  VStack,
  Heading,
  Image,
  Stack,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Spinner,
} from 'native-base';
import {useRecoilValue} from 'recoil';
import Layout from '../components/Layout';
import WalletInfoCard from '../components/WalletInfoCard';
import ButtonPrimary from '../components/ButtonPrimary';
import {Assets} from '../constants/assets';
import {userDetails} from '../recoil/atoms';
import {recordTx} from '../services/txService';
import {NavRoutes} from '../navigation/NavRoutes';

const TopUpScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [card, setCard] = useState('');

  const user = useRecoilValue(userDetails);
  const [executing, setExecuting] = useState(false);

  const handleTopUp = async () => {
    setExecuting(true);

    if (!amount || parseFloat(amount) <= 0) {
      setExecuting(false);
      Alert.alert('Invalid amount', 'Amount should be greater than ₦0.00');
      return;
    }

    if (!card.trim()) {
      setExecuting(false);
      Alert.alert('Invalid card', 'Insert valid card details');
      return;
    }

    const timestamp = new Date().getTime();
    await recordTx(
      card,
      'Top Up',
      user.walletId,
      user.fullName,
      parseFloat(amount.replace(',', '')),
      timestamp,
      'Wallet top up',
    )
      .then(() => {
        navigation.navigate(NavRoutes.PaymentSuccessful);
      })
      .catch(e => {
        console.warn(e);
        navigation.navigate(NavRoutes.PaymentFailed);
      })
      .finally(() => {
        setExecuting(false);
      });
  };

  return (
    <Layout>
      {/* App Icon */}
      <HStack mt={6} alignSelf="center" alignItems="center" space={3}>
        <Image
          source={Assets.branding.appIcon}
          size={12}
          alignSelf="center"
          alt="Scanpay icon"
        />
        <Heading>ScanPay</Heading>
      </HStack>

      {/* Form */}
      <KeyboardAvoidingView>
        <VStack space={4} mt={4} alignItems="center">
          {/* Account details */}
          <VStack
            w="full"
            space={4}
            mt={4}
            px={4}
            py={6}
            bg="blueGray.200"
            borderRadius="lg">
            {/* Wallet Holder */}
            <WalletInfoCard
              iconName="person-circle-outline"
              title="Wallet Holder"
              value={user.fullName}
            />
            {/* Wallet ID */}
            <WalletInfoCard
              iconName="card-outline"
              title="Wallet ID"
              value={user.walletId}
            />
          </VStack>

          {/* Amount (₦)*/}
          <FormControl isRequired>
            <Stack mx={2} mt={6}>
              <Input
                autoFocus
                value={amount}
                onChangeText={setAmount}
                type="number"
                variant="underlined"
                keyboardType="numeric"
                placeholder="Amount (₦)"
                bg="light.100"
                maxWidth="full"
                alignSelf="center"
                fontSize="md"
                flex={1}
              />
            </Stack>
          </FormControl>

          {/* Credit Card*/}
          <FormControl isRequired>
            <Stack mx={2} mt={2}>
              <Input
                value={card}
                onChangeText={setCard}
                type="number"
                variant="underlined"
                keyboardType="numeric"
                placeholder="Card Number"
                bg="light.100"
                maxWidth="full"
                alignSelf="center"
                fontSize="md"
                flex={1}
              />
            </Stack>
          </FormControl>
        </VStack>
      </KeyboardAvoidingView>

      {/* confirm */}
      <ButtonPrimary
        onPress={handleTopUp}
        disabled={executing}
        w="sm"
        maxWidth="full"
        alignSelf="center"
        mt={12}>
        {executing ? <Spinner size="sm" color="text.100" /> : 'Top Up'}
      </ButtonPrimary>
    </Layout>
  );
};

export default TopUpScreen;
