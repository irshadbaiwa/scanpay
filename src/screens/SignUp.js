import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  Box,
  Heading,
  VStack,
  HStack,
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
  Spinner,
} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import Layout from '../components/Layout';
import {Assets} from '../constants/assets';
import ButtonPrimary from '../components/ButtonPrimary';
import {NavRoutes} from '../navigation/NavRoutes';
import {signup} from '../services/authService';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../utils/helpers';

const SignUpScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [signing, setSigning] = useState(false);

  const handleSignup = async () => {
    setSigning(true);

    // validate fields
    if (
      !(
        validateName(fullName.trim()) &&
        validateEmail(email.trim()) &&
        validatePhoneNumber(phone.trim()) &&
        validatePassword(password)
      )
    ) {
      setSigning(false);
      Alert.alert('Fill form appropriately');
      return;
    }

    try {
      await signup(fullName.trim(), email.trim(), phone.trim(), password);
    } catch (e) {
      console.warn(e);
      Alert.alert(JSON.stringify(e.message));
    } finally {
      setSigning(false);
    }
  };

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
                value={fullName}
                onChangeText={setFullName}
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
                value={email}
                onChangeText={setEmail}
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
                  value={phone}
                  onChangeText={setPhone}
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
                value={password}
                onChangeText={setPassword}
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
                value={confirmPwd}
                onChangeText={setConfirmPwd}
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
            onPress={handleSignup}
            w="sm"
            maxWidth="full"
            alignSelf="center"
            mt={4}
            disabled={signing}>
            {signing ? <Spinner size="sm" color="text.100" /> : 'Sign Up'}
          </ButtonPrimary>
        </VStack>
      </KeyboardAvoidingView>
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
    </Layout>
  );
};

export default SignUpScreen;
