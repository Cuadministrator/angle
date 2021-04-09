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
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   View,
 } from 'react-native';
 
 
 import useSocket from '../utils/hook';
 
 const Message = () => {
   const { init: initSocket, server, client } = useSocket()
   const [messages, setMessages] = useState<string[]>([])
 
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
 
   return (
     <SafeAreaView style={classes.page}>
       <StatusBar barStyle='light-content' />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={classes['scroll-view']}>
         <View>
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
 
 const classes = StyleSheet.create({
   page: {
     flex: 1,
   },
   'scroll-view': {
     flex: 1,
   },
 });
 
 export default Message
 