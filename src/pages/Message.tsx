/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef, useState, useCallback, MutableRefObject, RefObject } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { inject, observer } from 'mobx-react';

import { ListItem } from 'react-native-elements'

import { Global } from '@src/store/Index';

const Messages = ({global}: { global: Global }) => {
  return (
    <SafeAreaView style={classes.page}>
      <StatusBar barStyle='light-content' />
    <View style={classes['title-box']}>
      <Text style={classes.title}>消息</Text>
    </View>
    <ScrollView style={classes['scroll-view']} snapToEnd>
      {
        global.message?.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={classes['list-item']}
          >
            <ListItem.Title>{item.type === 'server' ? '系统通知' : '接收消息'}</ListItem.Title>
            <ListItem.Subtitle>{item.text}</ListItem.Subtitle>
          </ListItem>
        ))
      }
    </ScrollView>
    </SafeAreaView>
  );
};
 
const classes = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff'
  },
  'title-box': {
    paddingLeft: 20,
    marginLeft: 14,
    borderLeftWidth: 10,
    borderColor: '#1296db',
  },
  title: {
    fontSize: 32,
    color: '#333',
    fontWeight: '700',
  },
  'scroll-view': {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 14
  },
  'list-item': {
    marginBottom: 14,
    backgroundColor: '#f9f9f9'
  },
});
 
 export default inject('global')(observer(Messages))
 