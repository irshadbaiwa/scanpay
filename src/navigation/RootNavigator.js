import * as Linking from 'expo-linking';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavRoutes} from './NavRoutes';
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import {useRecoilValue} from 'recoil';
import {userAuthState} from '../recoil/atoms';
import ScanCodeScreen from '../screens/ScanCode';
import GenerateCodeScreen from '../screens/GenerateCode';
import CompletePaymentScreen from '../screens/CompletePayment';
import PaymentSuccessfulScreen from '../screens/PaymentSuccessful';
import PaymentFailedScreen from '../screens/PaymentFailed';
import TransactionHistoryScreen from '../screens/TransactionHistory';
import TopUpScreen from '../screens/TopUp';
import WithdrawScreen from '../screens/Withdraw';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useRecoilValue(userAuthState);

  // Handle deep linking
  const url = Linking.useURL();
  const navigation = useNavigation();

  if (url) {
    const {hostname, path, queryParams} = Linking.parse(url);

    if (Object.values(NavRoutes).includes(path)) {
      try {
        navigation.navigate(path, {...queryParams});
      } catch (e) {
        console.warn(e);
      }
    }
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name={NavRoutes.AppTabs} component={TabNavigator} />
          <Stack.Screen name={NavRoutes.ScanCode} component={ScanCodeScreen} />
          <Stack.Screen
            name={NavRoutes.GenerateCode}
            component={GenerateCodeScreen}
          />
          <Stack.Screen
            name={NavRoutes.CompletePayment}
            component={CompletePaymentScreen}
          />
          <Stack.Screen
            name={NavRoutes.PaymentSuccessful}
            component={PaymentSuccessfulScreen}
          />
          <Stack.Screen
            name={NavRoutes.PaymentFailed}
            component={PaymentFailedScreen}
          />
          <Stack.Screen
            name={NavRoutes.TransactionHistory}
            component={TransactionHistoryScreen}
          />
          <Stack.Screen name={NavRoutes.TopUp} component={TopUpScreen} />
          <Stack.Screen name={NavRoutes.Withdraw} component={WithdrawScreen} />
        </Stack.Group>
      ) : (
        <Stack.Screen name={NavRoutes.AuthStack} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
