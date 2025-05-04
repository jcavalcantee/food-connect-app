import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import EmailValidation from './pages/EmailValidation';
import EmailResetValidation from './pages/EmailResetValidation';
import SolicitacaoEmail from './pages/SolicitacaoEmail';
import RegisterCustomerScreen from './pages/RegisterCustomerScreen';
import AlterUser from './pages/AlterUser';
import Home from './pages/Home';
import StoreProductsScreen from './pages/StoreProducts';
import Notifications from './pages/Notifications';
import Profile from './pages/profile';
import ResetPassword from './pages/ResetPassword';
import PaymentScreen from './pages/payment';
// Importar outras telas conforme necessário
    
const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="StoreProducts" component={StoreProductsScreen} />
                <Stack.Screen name="SolicitacaoEmail" component={SolicitacaoEmail} />
                <Stack.Screen name="EmailValidation" component={EmailValidation} />
                <Stack.Screen name="EmailResetValidation" component={EmailResetValidation} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="RegisterCustomerScreen" component={RegisterCustomerScreen} />
                <Stack.Screen name="AlterUser" component={AlterUser} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                {/* Adicione outras telas aqui */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
