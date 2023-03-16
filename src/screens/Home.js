import * as Linking from 'expo-linking';
import {
  Box,
  Heading,
  Column,
  Link,
  Skeleton,
  Icon,
  Text,
  Row,
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Layout from '../components/Layout';
import TransactionHistory from '../components/TransactionHistory';
import HomeHeader from '../components/HomeHeader';
import BalanceCard from '../components/BalanceCard';
import ScanOrGenerateCodeCard from '../components/ScanOrGenerateCodeCard';
import {NavRoutes} from '../navigation/NavRoutes';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {userDetails, userTxHx} from '../recoil/atoms';
import Moment from 'moment';
import {loadUserTxHx} from '../services/txService';
import {numberWithCommas} from '../utils/helpers';

const HomeScreen = ({navigation}) => {
  // fetch tx hx
  const user = useRecoilValue(userDetails);
  const userTxs = useRecoilValue(userTxHx);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        await loadUserTxHx(user.walletId);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

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
          {loading ? (
            <>
              <Skeleton mx={1} maxW="full" />
              <Skeleton mx={1} maxW="full" />
              <Skeleton mx={1} maxW="full" />
            </>
          ) : userTxs.length === 0 ? (
            <Column space={2} alignItems="center">
              <Icon
                as={Ionicons}
                name="folder-open"
                color="muted.200"
                size={20}
              />
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
            <>
              {userTxs.slice(0, 3).map(tx => {
                const isDebit =
                  user.walletId === tx.senderAccount ? true : false;
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

              {/* view all */}
              <Link
                onPress={() => {
                  navigation.navigate(NavRoutes.TransactionHistory);
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
            </>
          )}
        </Column>
        {/* Tx Hx End */}
      </Box>
    </Layout>
  );
};

export default HomeScreen;
