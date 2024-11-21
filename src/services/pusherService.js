import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
  onEvent,
} from '@pusher/pusher-websocket-react-native';

const pusher = Pusher.getInstance();

const initializePusher = async () => {
  console.log('Initialize Pusher..');

  try {
    await pusher.init({
      apiKey: 'xxxxxxxxxxxxxxxxxx',
      cluster: 'ap2',
    });

    const test = await pusher.connect();
    console.log('Connected to Pusher:', pusher);
  } catch (error) {
    console.error('Pusher initialization failed:', error);
  }
};

const subscribeToChannel = async (channelName, onEventCallback) => {
  await pusher.subscribe({
    channelName,
    onEvent: (event) => {
      console.log(`Event received: ${event}`);
      console.log('channelName', event.channelName);
      console.log('eventName', event.eventName);
      console.log('data', event.data);
      onEventCallback(event);
    },
  });
};

const unsubscribeFromChannel = (channelName) => {
  pusher.unsubscribe(channelName);
};

export { initializePusher, subscribeToChannel, unsubscribeFromChannel };

