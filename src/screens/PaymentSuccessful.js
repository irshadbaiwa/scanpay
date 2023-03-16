import {useEffect, useCallback} from 'react';
import {BackHandler} from 'react-native';
import {Box, Text, VStack, Icon} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Layout from '../components/Layout';
import ButtonOutline from '../components/ButtonOutline';

const PaymentSuccessfulScreen = ({navigation}) => {
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
      <Box h={'full'} justifyContent="center" alignItems="center">
        <VStack space={2} alignItems="center">
          <Icon
            as={Ionicons}
            name="checkmark-circle-outline"
            color="success.600"
            size={16}
          />
          <Text color="success.600" fontWeight="bold" fontSize={'lg'}>
            Transaction Successful!
          </Text>
        </VStack>
        {/* Home */}
        <ButtonOutline
          onPress={popToTop}
          w="sm"
          maxWidth="full"
          alignSelf="center"
          mt={12}>
          Home
        </ButtonOutline>
      </Box>
    </Layout>
  );
};

export default PaymentSuccessfulScreen;
