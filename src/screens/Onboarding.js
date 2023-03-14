import React from 'react';
import {useSetRecoilState} from 'recoil';
import {Text, Image, Heading, VStack} from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';
import {Assets} from '../constants/assets';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonOutline from '../components/ButtonOutline';
import {NavRoutes} from '../navigation/NavRoutes';
import {userOnboardingState} from '../recoil/atoms';

const OnboardingScreen = ({navigation}) => {
  const setUserOnboarded = useSetRecoilState(userOnboardingState);

  const goToLogin = () => {
    navigation.navigate(NavRoutes.Login);
    setUserOnboarded(true);
  };
  const goToSignup = () => {
    navigation.navigate(NavRoutes.Signup);
    setUserOnboarded(true);
  };

  return (
    <Onboarding
      showDone={false}
      showNext={false}
      showSkip={false}
      bottomBarColor="#fff"
      pages={[
        {
          title: <Heading color="brand.900">Payments made easy!</Heading>,
          subtitle: (
            <Text
              color="text.500"
              fontSize={'lg'}
              mt={4}
              px={6}
              textAlign="center">
              No more filling transaction details! Pay by just
              <Text color="brand.900" fontWeight={'bold'}>
                {' '}
                scanning!
              </Text>
            </Text>
          ),
          backgroundColor: '#fff',
          image: (
            <Image
              borderRadius="full"
              source={Assets.illustrations.scan}
              resizeMode="cover"
              alt="image"
              size={250}
            />
          ),
        },
        {
          title: <Heading color="brand.900">Fast, Steady and Secured!</Heading>,
          subtitle: (
            <Text
              color="text.500"
              fontSize={'lg'}
              mt={4}
              px={6}
              textAlign="center">
              No more exposing your card details! Pay from a virtual
              <Text color="brand.900" fontWeight={'bold'}>
                {' '}
                wallet!
              </Text>
            </Text>
          ),
          backgroundColor: '#fff',
          image: (
            <Image
              borderRadius="full"
              source={Assets.illustrations.reliable}
              resizeMode="cover"
              alt="image"
              size={250}
            />
          ),
        },
        {
          title: <Heading color="brand.900">Join the ship!</Heading>,
          subtitle: (
            <VStack space={2} mt={4} alignItems="center">
              <ButtonPrimary onPress={goToSignup}>Sign Up</ButtonPrimary>
              <ButtonOutline onPress={goToLogin}>Log In</ButtonOutline>
            </VStack>
          ),
          backgroundColor: '#fff',
          image: (
            <Image
              borderRadius="full"
              source={Assets.illustrations.rocket}
              resizeMode="cover"
              alt="image"
              size={250}
            />
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;
