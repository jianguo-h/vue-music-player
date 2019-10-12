import { IApi } from '../api';
import { Toast, Indicator, MessageBox } from 'mint-ui';

declare module 'vue/types/vue' {
  interface Vue {
    api: IApi;
    $Toast: Toast;
    $Indicator: Indicator;
    $MessageBox: MessageBox;
  }
}
