/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {
  Router,
  Overlay,
  Scene,
  Tabs,
} from 'react-native-router-flux'

import { Provider } from 'mobx-react'

import Icon from './src/components/Icon/Index'

import Home from './src/pages/Home'
import Message from './src/pages/Message'

import store from './src/store/Index'

const TabBarIcon = ({ name, active }: { name: string, active: boolean}) => {
  return (
    <Icon
      name={name}
      size={30}
      color={active ? '#1296db' : '#8a8a8a'}
    />
  )
}

const App = () => {
  return (
    <Provider {...store}>
      <Router>
        <Overlay key='overlay'>
          <Tabs
            key='root'
            showLabel={false}
          >
            <Scene
              key='home'
              initial
              hideNavBar
              icon={({focused}) => <TabBarIcon name='water' active={focused} />}
              component={Home}
            />
            <Scene
              key='message'
              hideNavBar
              icon={({focused}) => <TabBarIcon name='message' active={focused} />}
              component={Message}
            />
          </Tabs>
        </Overlay>
      </Router>
    </Provider>
  );
};

export default App
