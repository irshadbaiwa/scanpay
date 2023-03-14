import {Box, Text} from 'native-base';
import Layout from '../components/Layout';

const PaymentSuccessfulScreen = ({navigation}) => {
  return (
    <Layout>
      <Box alignItems="center" justifyContent="center">
        <Text>Payment Successful</Text>
      </Box>
    </Layout>
  );
};

export default PaymentSuccessfulScreen;
