import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
}

