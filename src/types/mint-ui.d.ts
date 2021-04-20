/// <reference types="vue" />

// Toast
interface IToastOptions {
  duration?: number;
  message?: string;
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
  iconClass?: string;
}

declare class ToastComponent extends Vue {
  close(): void;
}

declare interface IToast {
  (options?: string | IToastOptions): ToastComponent;
}

// Indicator
interface IIndicatorOptions {
  text?: string;
  spinnerType?: 'snake' | 'fading-circle' | 'double-bounce' | 'triple-bounce';
}

declare interface IIndicator {
  open(options?: string | IIndicatorOptions): void;
  close(): void;
}

// MessageBox
interface IMessageBoxOptions {
  title?: string;
  message?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  confirmButtonHighlight?: boolean;
  confirmButtonClass?: string;
  cancelButtonText?: string;
  cancelButtonHighlight?: boolean;
  cancelButtonClass?: string;
  closeOnClickModal?: boolean;
  showInput?: boolean;
  inputType?: string;
  inputValue?: string;
  inputPlaceholder?: string;
}

interface IMessageBoxPromiseValue {
  value?: string;
  action?: string;
}

declare interface IMessageBox {
  (options?: string | IMessageBoxOptions): void;
  alert(
    message: string,
    title: string,
    options: IMessageBoxOptions
  ): Promise<IMessageBoxPromiseValue>;
  confirm(
    message: string,
    title: string,
    options: IMessageBoxOptions
  ): Promise<IMessageBoxPromiseValue>;
  prompt(
    message: string,
    title: string,
    options: IMessageBoxOptions
  ): Promise<IMessageBoxPromiseValue>;
  close(): void;
}

// Switch
declare class SwitchComponent extends Vue {
  name: string;
  value?: boolean;
}

declare module 'mint-ui' {
  export const Toast: IToast;
  export const Indicator: IIndicator;
  export const MessageBox: IMessageBox;
  export const Switch: SwitchComponent;
}
