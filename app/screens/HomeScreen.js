import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';


import Layout from '../components/Layout';
import TaskItem from '../components/TaskItem';

const HomeScreen = () => {
 

  return (
    <Layout >
      <TaskItem />
    </Layout>
  )
}

export default HomeScreen;