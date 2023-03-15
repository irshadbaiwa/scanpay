import {useState, useEffect} from 'react';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';
import {Box, Text, Heading, HStack, Image, Icon, Pressable} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Layout from '../components/Layout';
import {Assets} from '../constants/assets';

const ScanCodeScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({type, data}) => {
    try {
      // Open payment screen
      await Linking.openURL(data);
    } catch (error) {
      console.warn(error);
    }
    setScanned(true);
  };

  if (hasPermission === null) {
    return (
      <Layout>
        <Box h={'full'} justifyContent="center" alignItems="center">
          <HStack space={1} alignItems="center">
            <Icon
              as={Ionicons}
              name="information-circle-outline"
              color="blue.400"
              size={6}
            />
            <Text color="blue.400" fontWeight="bold" fontSize={'md'}>
              Requesting for camera permission...
            </Text>
          </HStack>
        </Box>
      </Layout>
    );
  }
  if (hasPermission === false) {
    return (
      <Layout>
        <Box h={'full'} justifyContent="center" alignItems="center">
          <HStack space={1} alignItems="center">
            <Icon
              as={Ionicons}
              name="warning-outline"
              color="error.400"
              size={6}
            />
            <Text color="error.400" fontWeight="bold" fontSize={'md'}>
              No access to camera
            </Text>
          </HStack>
          <Text mt={4} color="muted.400" fontWeight="semibold" fontSize={'sm'}>
            Please provide access to camera in settings
          </Text>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      {!scanned && (
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
            <Icon as={Ionicons} name="scan" color="muted.400" size={7} />
            <Text color="muted.400" fontSize="lg" fontWeight="bold">
              Scan payment code
            </Text>
          </HStack>

          {/* Scanner */}
          <Box h={96} w={56} mt={4} borderRadius="2xl" overflow="hidden">
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{height: '100%', width: '100%'}}
            />
          </Box>
        </Box>
      )}

      {/* Scanning Error */}
      {scanned && (
        <Box h={'full'} justifyContent="center" alignItems="center">
          <HStack space={3} alignItems="center">
            <Icon
              as={Ionicons}
              name="warning-outline"
              color="error.400"
              size={8}
            />
            <Text color="error.400" fontWeight="bold" fontSize={'xl'}>
              Invalid QR Code
            </Text>
          </HStack>
          <Pressable onPress={() => setScanned(false)} mt={6}>
            <HStack space={2} alignItems="center">
              <Icon
                as={Ionicons}
                name="reload-outline"
                color="blue.400"
                size={6}
              />
              <Text color="blue.400" fontWeight="bold" fontSize={'md'}>
                Scan again
              </Text>
            </HStack>
          </Pressable>
        </Box>
      )}
    </Layout>
  );
};

export default ScanCodeScreen;
