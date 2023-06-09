import {StatusBar} from 'expo-status-bar';
import {Box, ScrollView, Spacer} from 'native-base';

const Layout = ({children, bg = 'white', ...props}) => {
  return (
    <Box safeArea px={4} flex={1} bg={bg} {...props}>
      <StatusBar style="auto" />
      <ScrollView
        flex={1}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {children}
        <Spacer />
      </ScrollView>
    </Box>
  );
};

export default Layout;
