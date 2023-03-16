import {Box, Column, Row, Heading} from 'native-base';
import Layout from '../components/Layout';
import ActionnPill from '../components/ActionPill';
import WalletInfoCard from '../components/WalletInfoCard';
import WalletHeader from '../components/WalletHeader';
import {useRecoilValue} from 'recoil';
import {userDetails} from '../recoil/atoms';
import {NavRoutes} from '../navigation/NavRoutes';

const WalletScreen = ({navigation}) => {
  const user = useRecoilValue(userDetails);

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
          value={user.fullName}
        />
        {/* Wallet ID */}
        <WalletInfoCard
          iconName="card-outline"
          title="Wallet ID"
          value={user.walletId}
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
              navigation.navigate(NavRoutes.TopUp);
            }}
          />
          <ActionnPill
            action="Withdraw"
            iconName="cash-outline"
            onPress={() => {
              navigation.navigate(NavRoutes.Withdraw);
            }}
          />
          <ActionnPill
            action="Scan"
            iconName="scan-outline"
            onPress={() => {
              navigation.navigate(NavRoutes.ScanCode);
            }}
          />
          <ActionnPill
            action="Generate"
            iconName="qr-code-outline"
            onPress={() => {
              navigation.navigate(NavRoutes.GenerateCode);
            }}
          />
        </Row>
      </Box>
    </Layout>
  );
};

export default WalletScreen;
