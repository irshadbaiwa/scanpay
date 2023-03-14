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
  Checkbox,
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
import {signup} from '../services/authService';

const SignUpScreen = ({navigation}) => {
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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
          Create Account
        </Heading>
      </Box>

      <KeyboardAvoidingView>
        <VStack space={4} mt={4} alignItems="center">
          {/* Full Name */}
          <FormControl isRequired>
            <Stack mx="2">
              <Input
                w="sm"
                maxWidth="full"
                alignSelf="center"
                type="text"
                keyboardType="default"
                placeholder="Full Name"
                bg="light.100"
                fontSize="md"
                autoCapitalize="words"
                autoCorrect={false}
                spellCheck={false}
              />
            </Stack>
          </FormControl>

          {/* Email */}
          <FormControl isRequired>
            <Stack mx="2">
              <Input
                w="sm"
                maxWidth="full"
                alignSelf="center"
                type="email"
                keyboardType="email-address"
                placeholder="Email Address"
                bg="light.100"
                fontSize="md"
              />
            </Stack>
          </FormControl>

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

          {/* Confirm Password */}
          <FormControl isRequired>
            <Stack mx="2">
              <Input
                w="sm"
                maxWidth="full"
                alignSelf="center"
                type="password"
                placeholder="Confirm Password"
                bg="light.100"
                fontSize="md"
                InputRightElement={
                  <Pressable onPress={() => setShowCPwd(current => !current)}>
                    <Icon
                      as={<Ionicons name={showCPwd ? 'eye' : 'eye-off'} />}
                      size={5}
                      mr="3"
                      color="muted.400"
                    />
                  </Pressable>
                }
                secureTextEntry={!showCPwd}
              />
            </Stack>
          </FormControl>

          {/* T&C */}
          <Stack mx="2" alignSelf="flex-start">
            <Checkbox value={false} onChange={setAcceptTerms}>
              I accept the terms & conditions
            </Checkbox>
          </Stack>

          {/** */}
          {/* Sign up Btn */}
          <ButtonPrimary
            onPress={signup}
            w="sm"
            maxWidth="full"
            alignSelf="center"
            mt={4}>
            Sign Up
          </ButtonPrimary>
        </VStack>

        {/* go to login */}
        <Link
          onPress={() => {
            navigation.replace(NavRoutes.Login);
          }}
          _text={{
            color: 'blue.400',
            fontWeight: 'medium',
            textAlign: 'center',
          }}
          isUnderlined={false}
          mt={2}
          alignSelf="center">
          Already have an account
        </Link>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default SignUpScreen;
