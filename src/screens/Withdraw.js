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

const WitjdrawScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [acctNumber, setAcctNumber] = useState('');
  const [acctName, setAcctName] = useState('');

  const user = useRecoilValue(userDetails);
  const [executing, setExecuting] = useState(false);

  const handleWithdraw = async () => {
    setExecuting(true);

    if (!amount || parseFloat(amount) <= 0) {
      setExecuting(false);
      Alert.alert('Invalid amount', 'Amount should be greater than ₦0.00');
      return;
    }

    if (!(acctNumber.trim() && bankName.trim() && acctName.trim())) {
      setExecuting(false);
      Alert.alert('Invalid Bank Account', 'Insert account details');
      return;
    }

    const timestamp = new Date().getTime();
    await recordTx(
      user.walletId,
      user.fullName,
      acctNumber,
      acctName,
      parseFloat(amount.replace(',', '')),
      timestamp,
      'Funds Withdrawal',
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

          {/* Account Number */}
          <FormControl isRequired>
            <Stack mx={2} mt={2}>
              <Input
                value={acctNumber}
                onChangeText={setAcctNumber}
                type="number"
                variant="underlined"
                keyboardType="numeric"
                placeholder="Account Number"
                bg="light.100"
                maxWidth="full"
                alignSelf="center"
                fontSize="md"
                flex={1}
              />
            </Stack>
          </FormControl>

          {/* Bank Name */}
          <FormControl isRequired>
            <Stack mx={2} mt={2}>
              <Input
                value={bankName}
                onChangeText={setBankName}
                type="text"
                variant="underlined"
                placeholder="Bank Name"
                bg="light.100"
                maxWidth="full"
                alignSelf="center"
                fontSize="md"
                flex={1}
              />
            </Stack>
          </FormControl>

          {/* Account Name */}
          <FormControl isRequired>
            <Stack mx={2} mt={2}>
              <Input
                value={acctName}
                onChangeText={setAcctName}
                type="text"
                variant="underlined"
                placeholder="Account Name"
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
        onPress={handleWithdraw}
        disabled={executing}
        w="sm"
        maxWidth="full"
        alignSelf="center"
        mt={12}>
        {executing ? <Spinner size="sm" color="text.100" /> : 'Withdraw'}
      </ButtonPrimary>
    </Layout>
  );
};

export default WitjdrawScreen;
