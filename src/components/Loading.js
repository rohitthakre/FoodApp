import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = (props) => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator {...props}/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})