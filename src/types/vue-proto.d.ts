/* eslint-disable @typescript-eslint/naming-convention */
import { IApi } from '../api';
import { Toast, Indicator, MessageBox } from 'mint-ui';

declare module 'vue/types/vue' {
  interface Vue {
    api: IApi;
    $Toast: typeof Toast;
    $Indicator: typeof Indicator;
    $MessageBox: typeof MessageBox;
  }
}
