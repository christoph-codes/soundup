/* eslint-disable */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NewsFlow, TabBar, WatchFlow } from "./TabBar";
import Home from "../../screens/Home";
import { ParamListBase, RouteProp } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const BottomTabs = function (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
    options: any;
}) {
    return (
        <Tab.Navigator
            screenOptions={props.options}
            tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={NewsFlow} />
            <Tab.Screen name="Watch" component={WatchFlow} />
        </Tab.Navigator>
    );
}