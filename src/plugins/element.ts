import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Col,
  Container,
  DatePicker,
  Dialog,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Icon,
  Image,
  InfiniteScroll,
  Input,
  InputNumber,
  Link,
  Loading,
  Main,
  Message,
  MessageBox,
  Pagination,
  Progress,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  TimePicker,
  TimeSelect,
  Upload,
} from 'element-ui';

const components = [
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Container,
  Main,
  Link,
  Divider,
  Image,
  Tag,
];

function install(Vue: any, opts: any = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(InfiniteScroll);
  Vue.use(Loading.directive);

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000,
  };

  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$message = Message;
}

export default {
  install,
};
