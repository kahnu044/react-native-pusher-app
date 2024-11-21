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

initializePusher();

const subscribeToChannel = async () => {
  await pusher.subscribe({
    channelName: 'my-channel',
    onEvent: (event: PusherEvent) => {
      console.log(`Event received: ${event}`);
      console.log('channelName', event.channelName);
      console.log('eventName', event.eventName);
      console.log('data', event.data);
    },
  });
};

export {subscribeToChannel};
