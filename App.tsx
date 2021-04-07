/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useMemo, useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import TcpSocket from 'react-native-tcp-socket';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import useSocket from './echo';

const App = () => {
  const { init: initSocket, server, client } = useSocket()
  const [messages, setMessages] = useState<string[]>([])
  const isDarkMode = useColorScheme() === 'dark';

  const init = useCallback(
    () => {
      initSocket()
      server.on('connection', (socket) => {
        console.log('Client connected to server on ' + JSON.stringify(socket.address()));
        setMessages(current => [...current, 'Client connected to server on ' + JSON.stringify(socket.address())])

        socket.on('data', (data) => {
          console.log('Server client received: ' + data);
          setMessages(current => [...current, 'Server client received: ' + data])
        });

        socket.on('error', (error) => {
          console.log('Server client error ' + error);
          setMessages(current => [...current, 'Server client error ' + error])
        });

        socket.on('close', (error) => {
          console.log('Server client closed ' + (error ? error : ''));
          setMessages(current => [...current, 'Server client closed ' + (error ? error : '')])
        });
      });

      server.on('error', (error) => {
        console.log('Server error ' + error);
        setMessages(current => [...current, 'Server error ' + error])
      });

      server.on('close', () => {
        console.log('Server closed');
        setMessages(current => [...current, 'Server closed'])
      });

      client.on('connect', () => {
        console.log('Opened client on ' + JSON.stringify(client.address()));
        setMessages(current => [...current, 'Opened client on ' + JSON.stringify(client.address())])
      });

      client.on('data', (data) => {
        console.log('Client received: ' + data);
        setMessages(current => [...current, 'Client received: ' + data])
      });

      client.on('error', (error) => {
        console.log('Client error ' + error);
        setMessages(current => [...current, 'Client error ' + error])
      });

      client.on('close', (error) => {
        console.log('Client closed ' + (error ? error : ''));
        setMessages(current => [...current, 'Client closed ' + (error ? error : '')])
      });
    },
    [initSocket],
  )

  useEffect(() => { init() }, [init])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {
            messages.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App
