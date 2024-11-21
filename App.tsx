import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  initializePusher,
  subscribeToChannel,
  unsubscribeFromChannel,
} from './src/services/pusherService';

const Home = () => {
  const [data, setData] = useState(null);

  // Initialize Pusher Service
  useEffect(() => {
    initializePusher();
  }, []);

  // Add this to your specific screen with their channel name
  useEffect(() => {
    const subscribe = async () => {
      await subscribeToChannel('my-channel', receivedData => {
        console.log('Event data:', receivedData);
        setData(receivedData);
      });
    };

    subscribe();

    // Unsubscribe on component unmount
    return () => {
      unsubscribeFromChannel('my-channel');
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hi,Welcome To Pusher App</Text>
      {data ? (
        <Text>Data: {JSON.stringify(data)}</Text>
      ) : (
        <Text>No Data Yet</Text>
      )}
    </View>
  );
};

export default Home;
