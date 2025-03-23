import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import EmailValidation from './pages/EmailValidation';
import SolicitacaoEmail from './pages/SolicitacaoEmail';
import RegisterCustomerScreen from './pages/RegisterCustomerScreen';
// Importar outras telas conforme necessário

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SolicitacaoEmail" component={SolicitacaoEmail} />
                <Stack.Screen name="EmailValidation" component={EmailValidation} />
                <Stack.Screen name="RegisterCustomerScreen" component={RegisterCustomerScreen} />
                {/* Adicione outras telas aqui */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
