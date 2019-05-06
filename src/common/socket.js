import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:9000',
}));


