import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity  
} from 'react-native';


import Layout from '../components/Layout';
import {saveTask, getTask, updateTask} from '../api/api'

const TaskFormScreen = ({navigation, route}) => {

  const [task, setTask] = useState({
    title: "",
    description: "",
  })

  const [editing, setEditing] = useState( false)

  const handleChange = (name, value) => setTask({...task, [name]: value })

  const handSubmit = async () => {

    try {
      if(!editing){
        await saveTask(task);
      }else{
        await updateTask(route.params.id, task)
      }
  
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    if(route.params && route.params.id){
      navigation.setOptions({ headerTitle: "Updating Task" });
      setEditing(true);
      (async () => {
        const res = await getTask(route.params.id);
        setTask({title: res.title, description: res.description})
      })();

    }
  },[]) 

  return (
    <Layout>
      <TextInput 
        style={style.input}
        placeholder='Write a title'
        placeholderTextColor='#ffffff'
        onChangeText={(text) => handleChange('title', text)}
        value={task.title}
      />
      <TextInput 
        style={style.input}
        placeholder='Write a description'
        placeholderTextColor='#ffffff'
        onChangeText={(text) => handleChange('description', text)}
        value={task.description}
      />

      {
        !editing ? (
          <TouchableOpacity style={style.buttonSave} onPress={handSubmit}>
            <Text style={style.buttonText}>Save Task</Text>
          </TouchableOpacity>
        ):(
          <TouchableOpacity style={style.buttonSave} onPress={handSubmit}>
            <Text style={style.buttonText}>Edit a Task</Text>
          </TouchableOpacity>
        )
      }

      

    </Layout>
  )
}

const style = StyleSheet.create({
  input:{
    width:'90%',
    marginBottom:7,
    fontSize: 18,
    borderWidth:1,
    borderColor: '#10ac84',
    height:35,
    color:'#ffffff',
    textAlign:'center',
    padding:4,
    borderRadius:8
  },
  buttonSave:{
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:10,
    backgroundColor:'#10ac84',
    width:'90%'
  },
  buttonText:{
    color:'#ffffff',
    textAlign:'center',
  }
})

export default TaskFormScreen