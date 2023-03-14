import {Box, Text} from 'native-base';
import Layout from '../components/Layout';

const ScanCodeScreen = ({navigation}) => {
  return (
    <Layout>
      <Box alignItems="center" justifyContent="center" flex={1}>
        <Text>Scan Code</Text>
      </Box>
    </Layout>
  );
};

export default ScanCodeScreen;
