import {Box, Text, Heading, Column, Row, Icon} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {useRecoilValue} from 'recoil';
import {userDetails, userTxHx} from '../recoil/atoms';
import Moment from 'moment';
import Layout from '../components/Layout';
import TransactionHistory from '../components/TransactionHistory';
import {numberWithCommas} from '../utils/helpers';

const TransactionHistoryScreen = ({navigation}) => {
  const user = useRecoilValue(userDetails);
  const userTxs = useRecoilValue(userTxHx);

  return (
    <Layout>
      <Box mt={8}>
        <Heading fontSize="2xl" mb="4">
          Recent Transactions
        </Heading>
      </Box>

      {userTxs.length === 0 ? (
        <Column space={4} alignItems="center">
          <Icon as={Ionicons} name="folder-open" color="muted.200" size={24} />
          <Row space={2} alignItems="center">
            <Icon
              as={Ionicons}
              name="information-circle-outline"
              color="blue.400"
              size={6}
            />
            <Text color="blue.400" fontWeight="bold" fontSize={'md'}>
              Empty Transaction History
            </Text>
          </Row>
        </Column>
      ) : (
        <Column space={3} mb={6}>
          {userTxs.map(tx => {
            const isDebit = user.walletId === tx.senderAccount ? true : false;
            const type = isDebit ? 'debit' : 'credit';
            let narration = tx.narration;
            if (!narration.trim()) {
              narration = isDebit
                ? `₦${numberWithCommas(tx.amount)} payment to ${
                    tx.receiverName
                  }`
                : `₦${numberWithCommas(tx.amount)} payment from ${
                    tx.senderName
                  }`;
            }
            const date = Moment(tx.timestamp).calendar();

            return (
              <TransactionHistory
                key={tx.timestamp}
                transactionId={tx.timestamp}
                type={type}
                narration={narration}
                timestamp={date}
                amount={numberWithCommas(tx.amount)}
              />
            );
          })}
        </Column>
      )}
    </Layout>
  );
};

export default TransactionHistoryScreen;
