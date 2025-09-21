import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HistoryScreen from "./screen/HistoryScreen";
import HomeScreen from "./screen/HomeScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Calculadora") {
              iconName = "calculator";
            } else if (route.name === "Historial") {
              iconName = "time";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#192736ff",
          tabBarInactiveTintColor: "blue",
        })}
      >
        <Tab.Screen name="Calculadora" component={HomeScreen} />
        <Tab.Screen name="Historial" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}