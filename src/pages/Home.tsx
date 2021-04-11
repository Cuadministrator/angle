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
import { Global } from '@src/store/Index';

const Home = ({global}: {global: Global}) => {
  const [ip, setIp] = useState('')
  const [port, setPort] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const [clientIp, setClientIp] = useState('')
  const [clientPort, setClientPort] = useState('')
  const [clientIsVisible, setClientIsVisible] = useState(false)

  const onIpChange = useCallback((text) => { setIp(text) }, [])
  const onPortChange = useCallback((text) => { setPort(text) }, [])

  const onClientIpChange = useCallback((text) => { setClientIp(text) }, [])
  const onClientPortChange = useCallback((text) => { setClientPort(text) }, [])

  const openOverlay = useCallback(() => {
    setIsVisible(true)
  }, [])

  const closeOverlay = useCallback(() => {
    setIsVisible(false)
  }, [])

  const openClientOverlay = useCallback(() => {
    setClientIsVisible(true)
  }, [])

  const closeClientOverlay = useCallback(() => {
    setClientIsVisible(false)
  }, [])

  const confirm = useCallback(() => {
    global.changeIpPort(ip || global.ip, port || global.port)
    closeOverlay()
  }, [ip, port, closeOverlay, global.ip, global.port])

  const clientConfirm = useCallback(() => {
    global.changeClientIpPort(clientIp || global.clientIp, clientPort || global.clientPort)
    closeClientOverlay()
  }, [clientPort, clientIp, closeClientOverlay, global.clientIp, global.clientPort])

  const serverOpts = useCallback(() => {
    if (global.connecting) {
      global.close()
    } else {
      global.create()
    }
  }, [global.create])

  const clientOpts = useCallback(() => {
    if (global.clientConnecting) {
      global.destroy()
    } else {
      global.connect()
    }
  }, [])

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
          <Card.Divider />
          <ListItem bottomDivider onPress={openOverlay}>
            <ListItem.Input
              label='ip'
              value={global.ip}
              placeholder='0.0.0.0'
            />
          </ListItem>
          <ListItem onPress={openOverlay}>
            <ListItem.Input
              label='端口'
              value={global.port}
              placeholder='0'
            />
          </ListItem>
        </Card>
        <Card containerStyle={classes.card}>
          <Card.Title>客户端</Card.Title>
          <Card.Divider />
          <ListItem bottomDivider onPress={openClientOverlay}>
            <ListItem.Input
              label='ip'
              value={global.clientIp}
              placeholder='0.0.0.0'
            />
          </ListItem>
          <ListItem onPress={openClientOverlay}>
            <ListItem.Input
              label='端口'
              value={global.clientPort}
              placeholder='0'
            />
          </ListItem>
        </Card>
        <Overlay
          isVisible={isVisible}
          overlayStyle={classes.overlay}
        >
          <Input
            label='ip'
            containerStyle={classes['overlay-input']}
            value={ip || global.ip}
            placeholder='0.0.0.0'
            onChangeText={onIpChange}
          />
          <Input
            label='端口'
            containerStyle={classes['overlay-input']}
            value={port || global.port}
            placeholder='0'
            onChangeText={onPortChange}
          />
          <Button title='确定' onPress={confirm} />
        </Overlay>
        <Overlay
          isVisible={clientIsVisible}
          overlayStyle={classes.overlay}
        >
          <Input
            label='ip'
            containerStyle={classes['overlay-input']}
            value={clientIp || global.clientIp}
            placeholder='0.0.0.0'
            onChangeText={onClientIpChange}
          />
          <Input
            label='端口'
            containerStyle={classes['overlay-input']}
            value={clientPort || global.clientPort}
            placeholder='0'
            onChangeText={onClientPortChange}
          />
          <Button title='确定' onPress={clientConfirm} />
        </Overlay>
      </View>
      <View style={classes.buttons}>
        <Button
          title={global.connecting ? '已连接' : '连接'}
          containerStyle={classes['btn']}
          loading={global.connectLoading}
          onPress={serverOpts}
        />
        <Button
          title={global.clientConnecting ? '分闸' : '合闸'}
          containerStyle={classes['btn']}
          loading={global.clientConnectLoading}
          onPress={clientOpts}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};
 
 const classes = StyleSheet.create({
  page: {
    flex: 1,
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
  row: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 70
  },
  'row-text': {
    width: 50,
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: 'auto',
    flex: 1,
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
 