// import Vue from 'vue';
// import Element from 'element-ui';
// Vue.use(Element, { size: 'small', zIndex: 3000 });

import Vue from "vue";
import {
  Button,
  menu,
  menuItem,
  Submenu,
  carousel,
  carouselItem,
  card,
  Input,
  Message,
  Dialog,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem, 
} from "element-ui";

Vue.use(Button);
Vue.use(menu);
Vue.use(menuItem);
Vue.use(Submenu);
Vue.use(carousel);
Vue.use(carouselItem);
Vue.use(card);
Vue.use(Input);
Vue.prototype.$message = Message;
Vue.use(Dialog);
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);