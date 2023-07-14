export type TCloseBehavior = 'dismiss' | 'dismissAll';

export type TModalProps = {
  title?: string;
  handleType?: 'default' | 'withBackArrow';
  closeBehavior?: TCloseBehavior;
  setHeader?: boolean;
  onChange?: (index: number) => void;
  touchBackdrop?: 'none' | 'close';
  clearState?: () => void;
};
