import {useState} from 'react';
import {Box, Column, Image, Heading, Link} from 'native-base';
import {useRecoilValue} from 'recoil';
import {userDetails} from '../recoil/atoms';
import {numberWithCommas} from '../utils/helpers';
import {Assets} from '../constants/assets';

const WalletHeader = props => {
  const [showBalance, setShowBalance] = useState(false);
  const {walletBalance} = useRecoilValue(userDetails);

  return (
    <Box {...props}>
      {/* App Icon */}
      <Box mt={6}>
        <Image
          source={Assets.branding.appIcon}
          size={16}
          alignSelf="center"
          alt="Scanpay icon"
        />
      </Box>

      {/* Wallet Balance */}
      <Column mt={3} alignItems="center">
        <Heading color="brand.900" fontSize="4xl">
          {showBalance ? `₦${numberWithCommas(walletBalance)}` : 'XXXX.XX'}
        </Heading>
        <Link
          onPress={() => setShowBalance(current => !current)}
          _text={{
            color: 'blue.400',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 'md',
          }}
          isUnderlined={false}
          alignSelf="center"
          mt={1}>
          {showBalance ? 'Hide' : 'Show'}
        </Link>
      </Column>
    </Box>
  );
};

export default WalletHeader;
