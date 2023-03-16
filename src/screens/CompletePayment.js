import {useEffect, useCallback, useState} from 'react';
import * as Linking from 'expo-linking';
import {BackHandler, Alert} from 'react-native';
import {Box, Text, Heading, HStack, Image, Icon, Spinner} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonOutline from '../components/ButtonOutline';
import {Assets} from '../constants/assets';
import {NavRoutes} from '../navigation/NavRoutes';
import {useRecoilState} from 'recoil';
import {userDetails} from '../recoil/atoms';
import {recordTx} from '../services/txService';
import {numberWithCommas} from '../utils/helpers';

const CompletePaymentScreen = ({route, navigation}) => {
  let {account, name, amount, narration = ''} = route.params;
  let placeHolderNarration = narration;
  if (!placeHolderNarration.trim()) {
    placeHolderNarration = `₦${numberWithCommas(amount)} payment to ${name}`;
  }

  const [user, setUser] = useRecoilState(userDetails);
  const [executing, setExecuting] = useState(false);

  const confirmPayment = useCallback(async () => {
    setExecuting(true);
    let walletBalance = user.walletBalance;

    // ensure funds are available
    if (walletBalance < parseFloat(amount)) {
      setExecuting(false);
      Alert.alert('Insufficient Funds', 'Top up wallet?', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Top Up',
          style: 'default',
          onPress: () => {
            navigation.replace(NavRoutes.TopUp);
          },
        },
      ]);
      return;
    }

    // ensure reciever is different from sender
    if (user.walletId === account) {
      setExecuting(false);
      Alert.alert('Error', 'You can not transfer funds to the same account');
      return;
    }

    //... add to tx hx
    try {
      // ... reflect in storage
      const timestamp = new Date().getTime();
      await recordTx(
        user.walletId,
        user.fullName,
        account,
        name,
        parseFloat(amount.replace(',', '')),
        timestamp,
        narration,
      );
      // show success screen
      // navigation.navigate(NavRoutes.PaymentSuccessful);
      const successUrl = Linking.createURL(NavRoutes.PaymentSuccessful);
      await Linking.openURL(successUrl);
    } catch (e) {
      console.warn(e);
      // show error screen
      // navigation.navigate(NavRoutes.PaymentFailed);
      const errorUrl = Linking.createURL(NavRoutes.PaymentFailed);
      await Linking.openURL(errorUrl);
    } finally {
      setExecuting(false);
    }
  }, []);

  const popToTop = useCallback(() => {
    navigation.popToTop();
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', popToTop);
    return () => BackHandler.removeEventListener('hardwareBackPress', popToTop);
  }, []);

  return (
    <Layout>
      <Box alignItems="center" jusifyContent="center">
        {/* App Icon */}
        <HStack mt={6} alignItems="center" space={3}>
          <Image
            source={Assets.branding.appIcon}
            size={12}
            alignSelf="center"
            alt="Scanpay icon"
          />
          <Heading>ScanPay</Heading>
        </HStack>

        {/* desc */}
        <HStack mt={4} alignItems="center" space={2}>
          <Icon as={Ionicons} name="card" color="muted.400" size={7} />
          <Text color="muted.400" fontSize="lg" fontWeight="bold">
            Confirm Payment
          </Text>
        </HStack>

        {/* Payment details */}
        <Heading my={12} fontSize="4xl">
          {'₦' + numberWithCommas(amount)}
        </Heading>
        <Box alignItems="center">
          <Text color="muted.400" fontSize="xl" fontWeight="bold">
            To:
          </Text>
          <Text color="muted.500" fontSize="lg" fontWeight="bold">
            {name}
          </Text>
          <Text color="muted.500" fontSize="lg" fontWeight="bold">
            {account}
          </Text>
          <Text color="muted.400" fontSize="xl" fontWeight="bold" mt={4}>
            Narration:
          </Text>
          <Text
            color="muted.500"
            fontSize="lg"
            fontWeight="bold"
            textAlign="center">
            {placeHolderNarration}
          </Text>
        </Box>

        {/* Confirm */}
        <ButtonPrimary
          onPress={confirmPayment}
          disabled={executing}
          w="sm"
          maxWidth="full"
          alignSelf="center"
          mt={12}>
          {executing ? <Spinner size="sm" color="text.100" /> : 'Pay'}
        </ButtonPrimary>
        {/* Cancel */}
        <ButtonOutline
          onPress={popToTop}
          disabled={executing}
          w="sm"
          maxWidth="full"
          alignSelf="center"
          mt={2}>
          Cancel
        </ButtonOutline>
      </Box>
    </Layout>
  );
};

export default CompletePaymentScreen;
