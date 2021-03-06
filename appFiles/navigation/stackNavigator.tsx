import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IntroScreen, DeliveriesScreen, DeliveryDetailsScreen} from '../screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './RootNavigation';
//import MembershipActiveScreen from '../screens/components/MembershipActiveScreen';
import {useDispatch} from 'react-redux';
import {setAppActiveScreen} from '../appStore/actions/appActions';
const Stack = createStackNavigator();
const defaultOptions = {
  animationEnabled: false,
  swipeEnabled: false,
};
const STACK_PROPS = (props: {
  initialRouteName?: string;
  children: React.ReactNode | React.ReactNode[];
}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      title: '',
      headerStyle: {height: 30},
    }}
    initialRouteName={
      props.initialRouteName ? props.initialRouteName : undefined
    }>
    {props.children}
  </Stack.Navigator>
);

// Gets the current screen from navigation state
const getActiveRouteName: (state: any) => any = state => {
  const route = state?.routes[state?.index];
  if (route?.state) {
    // Dive into nested navigators
    return getActiveRouteName(route?.state);
  }
  return route;
};

const AppContainer = () => {
  const previousActiveRouteRef = React.useRef<string | {name: string}>();
  const activeRouteRef = React.useRef<string | {name: string}>();
  const dispatch = useDispatch();

  useEffect(() => {
    const state = navigationRef.current?.getRootState();
    activeRouteRef.current = getActiveRouteName(state); // Save the initial route name
    return () => {
      console.log('AppContainer unmounted');
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={state => {
          const previousActiveRoute = activeRouteRef.current;
          const currentRoute = getActiveRouteName(state);
          if (previousActiveRoute !== activeRouteRef.current) {
            dispatch(setAppActiveScreen(currentRoute?.name));
          }
          // Save the current route name for later comparision
          activeRouteRef.current = currentRoute;
          previousActiveRouteRef.current = previousActiveRoute;
        }}
        onReady={() => {}}>
        <STACK_PROPS initialRouteName="IntroScreen">
          <Stack.Screen
            name="IntroScreen"
            component={IntroScreen}
            options={() => ({
              backBehavior: 'order',
              ...defaultOptions,
            })}
            initialParams={{itemId: 'Intro'}}
          />
          <Stack.Screen
            name="DeliveriesScreen"
            component={DeliveriesScreen}
            options={() => ({
              backBehavior: 'order',
              ...defaultOptions,
            })}
            initialParams={{itemId: 'DeliveriesScreen'}}
          />
          <Stack.Screen
            name="DeliveryDetailsScreen"
            component={DeliveryDetailsScreen}
            options={() => ({
              backBehavior: 'order',
              ...defaultOptions,
            })}
            initialParams={{itemId: 'DeliveryDetailsScreen'}}
          />
        </STACK_PROPS>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
