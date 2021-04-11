import React from 'react'

import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native'

export const withRoute = (Page: any) => class extends React.Component {
  render () {
    return (
      <SafeAreaView style={classes.page}>
        <StatusBar barStyle='light-content' />
        <View style={classes.root}>
          <Page {...this.props} />
        </View>
      </SafeAreaView>
    )
  }
}

const classes = StyleSheet.create({
  page: {
    flex: 1,
  },
  root: {
    flex: 1,
  }
})