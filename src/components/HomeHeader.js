import {Alert} from 'react-native';
import {Box, Row, Heading, Pressable, Icon} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeHeader = props => {
  return (
    <Box {...props}>
      <Row justifyContent="space-between">
        <Heading color="brand.900" flex={1} numberOfLines={1}>
          Hi Abubakar 👋
        </Heading>
        <Pressable
          onPress={() => {
            Alert.alert('Logout?');
          }}>
          <Icon
            as={<Ionicons name="exit-outline" />}
            size={7}
            mx="3"
            color="brand.900"
          />
        </Pressable>
      </Row>
    </Box>
  );
};

export default HomeHeader;
