import React from 'react'
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TaskList = ({tasks, handleDelete}) => {

  const navigation = useNavigation();

  return (
    <View style={style.itemContiner}>
      <TouchableOpacity onPress={() => {navigation.navigate('TaskFormScreen', {id: tasks.id})}}>
        <Text style={style.itemTitle} >{tasks.title}</Text>
        <Text style={style.itemTitle} >{tasks.description}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{backgroundColor:"#ee5253", padding:7, borderRadius:5}}
        onPress={() => handleDelete(tasks.id)}>
        <Text style={{color:"#fff"}}>Delete</Text>
      </TouchableOpacity>

    </View>
  )
}

const style = StyleSheet.create({
    itemContiner: {
        backgroundColor:'#333333',
        padding: 20,
        marginVertical : 8,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemTitle: {
        color : '#ffffff'
    }
})

export default TaskList