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
  Message
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