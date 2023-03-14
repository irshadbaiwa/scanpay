import {useNavigation} from '@react-navigation/native';
import {Box, Row, Column, Pressable, Text} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import {NavRoutes} from '../navigation/NavRoutes';

const ScanOrGenerateCodeCard = props => {
  const navigation = useNavigation();

  return (
    <Box w="sm" maxWidth="full" h={20} px={8} alignSelf="center" {...props}>
      <Row
        w="full"
        h="full"
        bg="white"
        borderRadius="2xl"
        shadow="3"
        overflow="hidden">
        {/* Scan */}
        <Pressable
          onPress={() => {
            navigation.navigate(NavRoutes.ScanCode);
          }}
          h="full"
          flex={1}
          _pressed={{backgroundColor: 'blueGray.100'}}>
          <Column alignItems="center" justifyContent="center" flex={1}>
            <Ionicons name="scan" size={36} color="#262626" />
            <Text fontWeight="medium" color="text.500">
              Scan to pay
            </Text>
          </Column>
        </Pressable>

        {/* Generate */}
        <Pressable
          onPress={() => {
            navigation.navigate(NavRoutes.GenerateCode);
          }}
          h="full"
          flex={1}
          _pressed={{backgroundColor: 'blueGray.100'}}>
          <Column alignItems="center" justifyContent="center" flex={1}>
            <Ionicons name="qr-code" size={36} color="#262626" />
            <Text fontWeight="medium" color="text.500">
              Generate qrcode
            </Text>
          </Column>
        </Pressable>
      </Row>
    </Box>
  );
};

export default ScanOrGenerateCodeCard;
