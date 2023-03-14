import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavRoutes} from './NavRoutes';
import {useRecoilValue} from 'recoil';
import {userOnboardingState} from '../recoil/atoms';
import OnboardingScreen from '../screens/Onboarding';
import SignUpScreen from '../screens/SignUp';
import LogInScreen from '../screens/LogIn';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const isOnboarded = useRecoilValue(userOnboardingState);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isOnboarded && (
        <Stack.Screen
          name={NavRoutes.Onboarding}
          component={OnboardingScreen}
        />
      )}
      <Stack.Screen name={NavRoutes.Login} component={LogInScreen} />
      <Stack.Screen name={NavRoutes.Signup} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
