import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '775931',
  key: '5d6ed8e043a8478ade8d',
  secret: '6ff18e51abddbefeaa5e',
  cluster: 'ap1',
  encrypted: true
});

export default pusher;