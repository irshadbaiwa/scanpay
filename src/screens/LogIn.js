import React, {useState} from 'react';
import {
  Box,
  Heading,
  VStack,
  Stack,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Pressable,
  Icon,
  Link,
  KeyboardAvoidingView,
  Image,
} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import Layout from '../components/Layout';
import {Assets} from '../constants/assets';
import ButtonPrimary from '../components/ButtonPrimary';
import {NavRoutes} from '../navigation/NavRoutes';
import {login} from '../services/authService';

const LoginScreen = ({navigation}) => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <Layout>
      <Box mt={8}>
        <Image
          source={Assets.branding.appIcon}
          size={16}
          alignSelf="center"
          mb={6}
          alt="Scanpay icon"
        />
        <Heading color={'brand.900'} textAlign="center">
          Welcome Back
        </Heading>
      </Box>

      <KeyboardAvoidingView>
        <VStack space={4} mt={4} alignItems="center">
          {/* Phone Number */}
          <FormControl isRequired>
            <Stack mx="2">
              <InputGroup w="sm" maxWidth="full" alignSelf="center">
                <InputLeftAddon bg="white">+234</InputLeftAddon>
                <Input
                  type="number"
                  keyboardType="phone-pad"
                  placeholder="Phone Number"
                  bg="light.100"
                  fontSize="md"
                  flex={1}
                />
              </InputGroup>
            </Stack>
          </FormControl>

          {/* Password */}
          <FormControl isRequired>
            <Stack mx="2">
              <Input
                w="sm"
                maxWidth="full"
                alignSelf="center"
                type="password"
                placeholder="Password"
                bg="light.100"
                fontSize="md"
                InputRightElement={
                  <Pressable onPress={() => setShowPwd(current => !current)}>
                    <Icon
                      as={<Ionicons name={showPwd ? 'eye' : 'eye-off'} />}
                      size={5}
                      mr="3"
                      color="muted.400"
                    />
                  </Pressable>
                }
                secureTextEntry={!showPwd}
              />
            </Stack>
          </FormControl>

          {/** */}
          {/* Login Btn */}
          <ButtonPrimary
            onPress={login}
            w="sm"
            maxWidth="full"
            alignSelf="center"
            mt={4}>
            Log In
          </ButtonPrimary>
        </VStack>

        {/* go to signup */}
        <Link
          onPress={() => {
            navigation.replace(NavRoutes.Signup);
          }}
          _text={{
            color: 'blue.400',
            fontWeight: 'medium',
            textAlign: 'center',
          }}
          isUnderlined={false}
          mt={2}
          alignSelf="center">
          Create an account
        </Link>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default LoginScreen;
