import {useMemo} from 'react';
import {Alert} from 'react-native';
import {Box, Row, Heading, Pressable, Icon} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useRecoilValue} from 'recoil';
import {userDetails} from '../recoil/atoms';
import {logout} from '../services/authService';

const HomeHeader = props => {
  const user = useRecoilValue(userDetails);
  const firstName = useMemo(() => {
    return user.fullName.trim().split(' ')[0];
  }, [userDetails]);

  return (
    <Box {...props}>
      <Row justifyContent="space-between">
        <Heading color="brand.900" flex={1} numberOfLines={1}>
          Hi {firstName} 👋
        </Heading>
        <Pressable
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout from this account?',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => {
                    logout();
                  },
                },
              ],
            );
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
