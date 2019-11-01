import router from "./router";
import Vue from 'vue'

Vue.prototype.whereGo = function (name,params,create) {
  if (create){
    let { href } = router.resolve({ name:name,params:params });
    window.open(href,'_blank')
  }else {
    router.push({ name:name, params:params });
  }
};

