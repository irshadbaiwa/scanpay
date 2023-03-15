import {useEffect, useCallback} from 'react';
import {BackHandler} from 'react-native';
import {Box, Text, Heading, HStack, Image, Icon} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Layout from '../components/Layout';
import ButtonPrimary from '../components/ButtonPrimary';
import {Assets} from '../constants/assets';
import {NavRoutes} from '../navigation/NavRoutes';

const CompletePaymentScreen = ({route, navigation}) => {
  let {account, name, amount, narration} = route.params;
  if (!narration.trim()) {
    narration = `₦${amount} to ${name}`;
  }

  const confirmPayment = useCallback(() => {
    //... deduct amount
    //... add to tx hx
    navigation.navigate(NavRoutes.PaymentSuccessful);
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
          {'₦' + amount}
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
            Payment for:
          </Text>
          <Text
            color="muted.500"
            fontSize="lg"
            fontWeight="bold"
            textAlign="center">
            {narration}
          </Text>
        </Box>

        {/* Confirm */}
        <ButtonPrimary
          onPress={confirmPayment}
          w="sm"
          maxWidth="full"
          alignSelf="center"
          mt={12}>
          Pay
        </ButtonPrimary>
      </Box>
    </Layout>
  );
};

export default CompletePaymentScreen;
