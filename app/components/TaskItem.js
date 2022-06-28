import React, { useEffect, useState } from 'react';
import { Text, FlatList, RefreshControl} from 'react-native';
import {useIsFocused} from '@react-navigation/native'

import TaskList from './TaskList';
import { getListTask, deleteTask } from '../api/api';

const TaskItem = () => {

  
  const [tasks, setTasks]= useState([]);
  const [refresing, setRefresing] = useState(false);

  //boolean
  const isFocused = useIsFocused()
  

  //Carga lista de tareas
  const loadTasks = async () =>{
    const data = await getListTask();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  },[isFocused]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTasks();
  }

  //Refrescar la pantalla 
  const onRefresh = React.useCallback( async () => { 
    setRefresing(true);
    await loadTasks();
    setRefresing(false)
  })
  
  const rederItem = ({item}) => { return <TaskList tasks={item} handleDelete={handleDelete}/>}

  return (
    <FlatList
        style={{width:'100%'}}
        data = {tasks}
        keyExtractor= {(item) => item.id}
        renderItem={rederItem}

        refreshControl={
          <RefreshControl
          refreshing={false}
            colors={['#78e08f']}
            onRefresh={onRefresh}
            progressBackgroundColor="#0a3d62" 
            />
        }

      />
  )
}

export default TaskItem