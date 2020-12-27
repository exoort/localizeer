import Vue from 'vue'


export default ({app}, inject) => {
  const eventBus = new Vue();
//this helps WebStorm with autocompletion, otherwise it's not needed
  Vue.prototype.$eventBus = eventBus;
  app.$eventBus = eventBus;
  inject('eventBus', eventBus);
}
