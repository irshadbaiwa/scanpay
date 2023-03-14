import {Alert} from 'react-native';
import {Box, Heading, Column, Link} from 'native-base';
import Layout from '../components/Layout';
import TransactionHistory from '../components/TransactionHistory';
import HomeHeader from '../components/HomeHeader';
import BalanceCard from '../components/BalanceCard';
import ScanOrGenerateCodeCard from '../components/ScanOrGenerateCodeCard';

const HomeScreen = ({navigation}) => {
  return (
    <Layout>
      {/* Header */}
      <HomeHeader mt={6} />

      {/* Balance Card */}
      <BalanceCard mt={6} />

      {/* Scan/Generate Code */}
      <ScanOrGenerateCodeCard mt="-8" />

      {/* Transaction History */}
      <Box mt={12}>
        <Heading fontSize="xl" mb="4">
          Recent Transactions
        </Heading>
        <Column space={2}>
          {/* Debit */}
          <TransactionHistory
            transactionId={89129902}
            type="debit"
            narration="Shoes purchase"
            timestamp="Today, 08:22am"
            amount="54,750"
          />

          {/* Credit */}
          <TransactionHistory
            transactionId={89523902}
            type="credit"
            narration="Phone purchase"
            timestamp="Today, 12:05pm"
            amount="30,000"
          />

          {/* Debit */}
          <TransactionHistory
            transactionId={89123902}
            type="debit"
            narration="Grocery shopping"
            timestamp="3rd March, 05:22pm"
            amount="54,750"
          />

          {/* Tx end */}
        </Column>
        {/* view all */}
        <Link
          onPress={() => {
            Alert.alert('Take me to Transaction History');
          }}
          px="2"
          _text={{
            color: 'blue.400',
            fontWeight: 'bold',
          }}
          isUnderlined={false}
          mt={4}
          alignSelf="flex-end">
          View all
        </Link>
        {/* Tx Hx End */}
      </Box>
    </Layout>
  );
};

export default HomeScreen;
