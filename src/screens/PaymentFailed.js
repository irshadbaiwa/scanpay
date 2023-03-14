import {Box, Text} from 'native-base';
import Layout from '../components/Layout';

const PaymentFailedScreen = ({navigation}) => {
  return (
    <Layout>
      <Box alignItems="center" justifyContent="center">
        <Text>Payment Failed</Text>
      </Box>
    </Layout>
  );
};

export default PaymentFailedScreen;
