import {useState} from 'react';
import {Alert} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import * as Linking from 'expo-linking';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Image,
  FormControl,
  Stack,
  Input,
  KeyboardAvoidingView,
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Layout from '../components/Layout';
import WalletInfoCard from '../components/WalletInfoCard';
import ButtonPrimary from '../components/ButtonPrimary';
import {Assets} from '../constants/assets';
import {NavRoutes} from '../navigation/NavRoutes';

const GenerateCodeScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);

  const generateCode = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Insert valid amount');
      return;
    }

    const path = NavRoutes.CompletePayment;
    const params = {
      account: '9038078419',
      name: 'Abubakar Ibrahim Baiwa',
      amount: parseFloat(amount.replace(',', '')),
      narration,
    };

    const paymentUrl = Linking.createURL(path, {queryParams: params});
    setGeneratedUrl(paymentUrl);

    setCodeGenerated(true);
  };

  const regenerateCode = () => {
    setCodeGenerated(false);
    setGeneratedUrl(null);
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

      {codeGenerated ? (
        <>
          {/* desc */}
          <HStack mt={4} alignSelf="center" alignItems="center" space={2}>
            <Icon as={Ionicons} name="scan" color="muted.400" size={7} />
            <Text color="muted.400" fontSize="lg" fontWeight="bold">
              Scan qrcode to pay
            </Text>
          </HStack>

          {/* Qr-code */}
          <Box alignItems="center" mt={24}>
            <SvgQRCode
              value={generatedUrl}
              logo={Assets.branding.appIconOpaque}
            />
          </Box>

          {/* Regenrate code Btn */}
          <ButtonPrimary
            onPress={regenerateCode}
            w="sm"
            maxWidth="full"
            alignSelf="center"
            mt={24}>
            Regenerate
          </ButtonPrimary>
        </>
      ) : (
        <>
          {/* desc */}
          <HStack mt={4} alignSelf="center" alignItems="center" space={2}>
            <Icon as={Ionicons} name="qr-code" color="muted.400" size={7} />
            <Text color="muted.400" fontSize="lg" fontWeight="bold">
              Generate payment qrcode
            </Text>
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
                  value="Abubakar Ibrahim Baiwa"
                />
                {/* Wallet ID */}
                <WalletInfoCard
                  iconName="card-outline"
                  title="Wallet ID"
                  value="9038078419"
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

              {/* Narration*/}
              <FormControl isRequired>
                <Stack mx={2} mt={2}>
                  <Input
                    value={narration}
                    onChangeText={setNarration}
                    type="text"
                    variant="underlined"
                    placeholder="Narration"
                    bg="light.100"
                    maxWidth="full"
                    alignSelf="center"
                    fontSize="md"
                    flex={1}
                  />
                </Stack>
              </FormControl>

              {/** */}
              {/* Generate Btn */}
              <ButtonPrimary
                onPress={generateCode}
                w="sm"
                maxWidth="full"
                alignSelf="center"
                mt={12}>
                Generate Code
              </ButtonPrimary>
            </VStack>
          </KeyboardAvoidingView>
        </>
      )}
    </Layout>
  );
};

export default GenerateCodeScreen;
