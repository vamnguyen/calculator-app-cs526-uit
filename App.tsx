import HomeScreen from "./src/components/HomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HistoryScreen from "./src/components/HistoryScreen";
import { HistoryProvider } from './src/context/HistoryContext';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <HistoryProvider>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />
      </Drawer.Navigator>
      </HistoryProvider>
    </NavigationContainer>
      
  );
}


