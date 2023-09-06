import Box from './components/box.vue';
import Item from './components/item.js';

const obj = {}
/* istanbul ignore next */
obj.install = function install(Vue) {
  Vue.component(Box.name, Box);
  Vue.component(Item.name, Item);
};

export default obj;