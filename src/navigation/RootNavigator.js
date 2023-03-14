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
import TransactionHistory from '../components/TransactionHistory';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useRecoilValue(userAuthState);

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
            component={TransactionHistory}
          />
        </Stack.Group>
      ) : (
        <Stack.Screen name={NavRoutes.AuthStack} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
