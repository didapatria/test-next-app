export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

export const TOAST_HREF_TARGET = {
  BLANK: '_blank',
  SELF: '_self',
} as const;

export type ToastHrefTarget = (typeof TOAST_HREF_TARGET)[keyof typeof TOAST_HREF_TARGET];

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  href?: string;
  hrefTarget?: ToastHrefTarget;
  duration?: number;
  timestamp: number;
  isVisible?: boolean;
  isExiting?: boolean;
}
