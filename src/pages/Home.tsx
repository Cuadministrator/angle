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
   View,
 } from 'react-native';
 
 const App = () => {
   return (
     <SafeAreaView style={classes.page}>
      <StatusBar barStyle='light-content' />
      <ScrollView
        style={classes['scroll-view']}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
          <Text>Home</Text>
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
 
 export default App
 