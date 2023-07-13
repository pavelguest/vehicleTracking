import { WINDOW_WIDTH } from '../../device-info';

export const CONTENT_PADDING_H =
  WINDOW_WIDTH > 330 ? (WINDOW_WIDTH > 360 ? 26 : 20) : 14;
export const CONTENT_WIDTH = WINDOW_WIDTH - 2 * CONTENT_PADDING_H;
export const CONTENT_PADDING_BOTTOM = 20;
