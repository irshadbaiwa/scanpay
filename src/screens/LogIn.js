import React, {useState} from 'react';
import {Alert} from 'react-native';
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
  Spinner,
} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import Layout from '../components/Layout';
import {Assets} from '../constants/assets';
import ButtonPrimary from '../components/ButtonPrimary';
import {NavRoutes} from '../navigation/NavRoutes';
import {login} from '../services/authService';
import {validatePhoneNumber, validatePassword} from '../utils/helpers';

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const [signing, setSigning] = useState(false);

  const handleLogin = async () => {
    setSigning(true);

    // validate fields
    if (!(validatePhoneNumber(phone.trim()) && validatePassword(password))) {
      setSigning(false);
      Alert.alert('Fill form appropriately');
      return;
    }

    try {
      await login(phone.trim(), password);
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

          {/** */}
          {/* Login Btn */}
          <ButtonPrimary
            onPress={handleLogin}
            disabled={signing}
            w="sm"
            maxWidth="full"
            alignSelf="center"
            mt={4}>
            {signing ? <Spinner size="sm" color="text.100" /> : 'Log In'}
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
