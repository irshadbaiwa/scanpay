import {useState} from 'react';
import {Alert} from 'react-native';
import * as Linking from 'expo-linking';
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
import ButtonPrimary from '../components/ButtonPrimary';
import {Assets} from '../constants/assets';
import {userDetails} from '../recoil/atoms';
import {recordTx} from '../services/txService';
import {NavRoutes} from '../navigation/NavRoutes';

const TopUpScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [card, setCard] = useState('');
  const [cvv, setCVV] = useState('');

  const user = useRecoilValue(userDetails);
  const [executing, setExecuting] = useState(false);

  const handleTopUp = async () => {
    setExecuting(true);

    if (!amount || parseFloat(amount) <= 0) {
      setExecuting(false);
      Alert.alert('Invalid amount', 'Amount should be greater than ₦0.00');
      return;
    }

    if (!(card.trim() && cvv.trim())) {
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
      .then(async () => {
        // navigation.replace(NavRoutes.PaymentSuccessful);
        const successUrl = Linking.createURL(NavRoutes.PaymentSuccessful);
        await Linking.openURL(successUrl);
      })
      .catch(async e => {
        console.warn(e);
        // navigation.replace(NavRoutes.PaymentFailed);
        const errorUrl = Linking.createURL(NavRoutes.PaymentFailed);
        await Linking.openURL(errorUrl);
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

          {/* CVV */}
          <FormControl isRequired>
            <Stack mx={2} mt={6}>
              <Input
                value={cvv}
                onChangeText={setCVV}
                type="number"
                variant="underlined"
                keyboardType="numeric"
                placeholder="CVV"
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
