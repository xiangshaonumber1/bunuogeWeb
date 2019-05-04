import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueSocketIO);

const socket = new VueSocketIO({
  debug: true,
  //如果想要局域网内多台设备能够实现通信,应当制定服务器IP,而不是localhost
  connection: 'http://localhost:9000',
});

export default socket

