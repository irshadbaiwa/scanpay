import {RecoilRoot} from 'recoil';
import RecoilNexus from 'recoil-nexus';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {colorTheme} from './src/theme/colors';

const Apptheme = extendTheme({colors: colorTheme});
const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

export default function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <NativeBaseProvider theme={Apptheme} config={config}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
