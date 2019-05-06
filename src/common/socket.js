import VueSocketIO from 'vue-socket.io'
const socket = new VueSocketIO({
  debug: true,
  connection: 'http://localhost:9000',
});
export default socket;


