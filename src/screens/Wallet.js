import {Alert} from 'react-native';
import {Box, Column, Row, Heading} from 'native-base';
import Layout from '../components/Layout';
import ActionnPill from '../components/ActionPill';
import WalletInfoCard from '../components/WalletInfoCard';
import WalletHeader from '../components/WalletHeader';

const WalletScreen = () => {
  return (
    <Layout>
      {/* Header */}
      <WalletHeader />

      {/* Wallet Info */}
      <Column
        w="full"
        space={4}
        mt={4}
        px={4}
        py={6}
        bg="brand.900"
        borderRadius="lg">
        {/* Wallet Holder */}
        <WalletInfoCard
          iconName="person-circle-outline"
          title="Wallet Holder"
          value="Abubakar Ibrahim Baiwa"
        />
        {/* Wallet ID */}
        <WalletInfoCard
          iconName="card-outline"
          title="Wallet ID"
          value="9038078419"
        />
      </Column>

      {/* Quick Actions Section*/}
      <Box mt={10}>
        <Heading fontSize="xl" mb={2}>
          Quick Actions
        </Heading>

        {/* Quick Actions */}
        <Row space={4} justifyContent="space-evenly">
          <ActionnPill
            action="Top Up"
            iconName="wallet-outline"
            onPress={() => {
              Alert.alert('Top Up');
            }}
          />
          <ActionnPill
            action="Withdraw"
            iconName="cash-outline"
            onPress={() => {
              Alert.alert('Withdraw');
            }}
          />
          <ActionnPill
            action="Scan"
            iconName="scan-outline"
            onPress={() => {
              Alert.alert('Scan code');
            }}
          />
          <ActionnPill
            action="Generate"
            iconName="qr-code-outline"
            onPress={() => {
              Alert.alert('Generate payment code');
            }}
          />
        </Row>
      </Box>
    </Layout>
  );
};

export default WalletScreen;
