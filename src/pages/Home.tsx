/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect, useState, useCallback } from 'react';
 import {
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Text,
   View,
 } from 'react-native';

import { inject, observer } from 'mobx-react'

import {
  Input,
  Overlay,
  ListItem,
  Button,
  Card,
} from 'react-native-elements'

import Toast from '../components/Toast/Index'

import { Global } from '@src/store/Index';

const Home = ({global}: {global: Global}) => {
  const [ip, setIp] = useState('')
  const [port, setPort] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {global.initIp()}, [global.initIp])
  const onIpChange = useCallback((text) => { setIp(text) }, [])
  const onPortChange = useCallback((text) => { setPort(text) }, [])

  const openOverlay = useCallback(() => {
    setIsVisible(true)
  }, [])

  const closeOverlay = useCallback(() => {
    setIsVisible(false)
  }, [])

  const confirm = useCallback(() => {
    global.changeIpPort(ip || global.ip, port || global.port)
    closeOverlay()
  }, [ip, port, closeOverlay, global.ip, global.port])

  const serverOpts = useCallback(() => {
    if (global.connecting) {
      global.close()
    } else {
      global.create()
    }
  }, [global.create])

  const optBtn = useCallback(
    () => {
      try {
        global.socket?.write('water injection', undefined, () => {
          Toast.show('已成功发送消息')
        })
      } catch (e) {
        Toast.show('当前连接中断')
      }
    },
    [global.socket],
  )

  return (
    <SafeAreaView style={classes.page}>
    <StatusBar barStyle='light-content' />
    <View style={classes['content']}>
      <View style={classes['title-box']}>
        <Text style={classes.title}>你好，<Text style={classes.large}>欢迎!</Text></Text>
        <Text style={classes['sub-title']}>欢迎使用本系统！</Text>
      </View>
      <View style={classes['input-box']}>
        <Card containerStyle={classes.card}>
          <Card.Title>服务端</Card.Title>
          <ListItem bottomDivider topDivider>
            <ListItem.Input
              label='ip'
              value={global.ip}
              placeholder='0.0.0.0'
              inputStyle={{paddingTop: 0, top: -6}}
            />
          </ListItem>
          <ListItem
            onPress={openOverlay}
          >
            <ListItem.Input
              label='端口'
              value={global.port}
              placeholder='0'
              inputStyle={{paddingTop: 0, top: -6}}
            />
          </ListItem>
        </Card>
      </View>
      <View style={classes.buttons}>
        <Button
          title={global.connecting ? '已开启' : '开启'}
          containerStyle={classes['btn']}
          loading={global.connectLoading}
          onPress={serverOpts}
        />
        <Button
          title='注水'
          containerStyle={classes['btn']}
          loading={false}
          onPress={optBtn}
        />
      </View>
    </View>
    <Overlay
      isVisible={isVisible}
      overlayStyle={classes.overlay}
    >
      <Input
        label='ip'
        containerStyle={classes['overlay-input']}
        value={ip}
        placeholder='0.0.0.0'
        onChangeText={onIpChange}
      />
      <Input
        label='端口'
        containerStyle={classes['overlay-input']}
        value={port}
        placeholder='0'
        onChangeText={onPortChange}
      />
      <Button title='确定' onPress={confirm} />
    </Overlay>
    </SafeAreaView>
  );
};
 
 const classes = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 14,
  },
  'title-box': {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderColor: '#1296db',
  },
  title: {
    fontSize: 28,
    color: '#333',
    fontWeight: '700',
  },
  large: {
    fontSize: 32,
  },
  'sub-title': {
    fontSize: 16,
    color: '#333',
  },
  'input-box': {
    marginTop: 20
  },
  card: {
    borderRadius: 6,
    paddingHorizontal: 0,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  buttons: {
    marginTop: 50,
  },
  btn: {
    marginTop: 20
  },
  overlay: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  'overlay-input': {
    width: 280
  },
});
 
 export default inject('global')(observer(Home))
 