/* eslint-disable */

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import News from "../../../screens/News";
import NewsArticleContent from "../../../screens/NewsArticleContent";
import Watch from "../../../screens/Watch";
import VideoArticleContent from "../../../screens/VideoArticleContent";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Text, View } from "native-base";
import Link from "../../Link";

const NewsStack = createStackNavigator()
const WatchStack = createStackNavigator()
const items = [
    {
        label: 'Home',
        icon: '🏠',
        link: 'Home',
    },
    {
        label: 'News',
        icon: '📰',
        link: 'News',
    },
    {
        label: 'Watch',
        icon: '👀',
        link: 'Watch',
    },
];
export const TabBar = function ({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.FooterNav}>
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    /** Grabbing the label and icon from items array so we don't need to search for it in the options object **/

                    // const label =
                    //     options.tabBarLabel !== undefined
                    //         ? options.tabBarLabel
                    //         : options.title !== undefined
                    //             ? options.title
                    //             : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({
                                name: route.name,
                                merge: true,
                                params: state.routes[state.index].params,
                            });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    const item = items[index]
                    return (
                        <TouchableHighlight
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        >
                            <View style={styles.NavItemBtn}>
                                <Text fontSize={24} lineHeight={28} textAlign={'center'}>
                                    {item.icon}
                                </Text>
                                <Text
                                    fontSize={10}
                                    textTransform={'uppercase'}
                                    fontWeight='bold'
                                    textAlign={'center'}
                                >
                                    {item.label}
                                </Text>
                                <View
                                    style={
                                        isFocused
                                            ? styles.ActiveNavItemIndicator
                                            : styles.NavItemIndicator
                                    }
                                />
                            </View>
                        </TouchableHighlight>
                    );
                })
            }
            <Link href='https://www.soundup.media/radio'>
                <View style={styles.NavItemBtn}>
                    <Text fontSize={24} lineHeight={28} textAlign={'center'}>
                        🎧
                    </Text>
                    <Text
                        fontSize={10}
                        textTransform={'uppercase'}
                        fontWeight='bold'
                        textAlign={'center'}
                    >
                        Listen
                    </Text>
                </View>
            </Link>
        </View >
    );
}


export const NewsFlow = function () {
    return (
        <NewsStack.Navigator>
            <NewsStack.Screen name="News" component={News} />
            <NewsStack.Screen name="News Article Content" component={NewsArticleContent} />
        </NewsStack.Navigator>
    )
}
export const WatchFlow = function () {
    return (
        <WatchStack.Navigator>
            <WatchStack.Screen name="Watch" component={Watch} />
            <WatchStack.Screen name="Video Article Content" component={VideoArticleContent} />
        </WatchStack.Navigator>
    )
}

const styles = StyleSheet.create({
    FooterNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        paddingVertical: 4,
        borderTopWidth: 1,
        borderTopColor: '#161616',
    },
    NavItemBtn: {
        backgroundColor: 'transparent',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    NavItemIndicator: {
        backgroundColor: 'transparent',
        width: 4,
        height: 4,
        borderRadius: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 2,
    },
    ActiveNavItemIndicator: {
        backgroundColor: '#8DE9FE',
        width: 4,
        height: 4,
        borderRadius: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 2,
    },
});
