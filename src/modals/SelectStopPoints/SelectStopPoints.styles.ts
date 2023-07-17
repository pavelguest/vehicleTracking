import { makeUseStyles } from 'react-native-stylex';
import {
  CONTENT_PADDING_BOTTOM,
  CONTENT_PADDING_H,
} from '../../core/styling/env/constants';
import { WINDOW_HEIGHT } from '../../core/device-info';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    backgroundColor: palette.background.primary,
    flex: 1,
    height: WINDOW_HEIGHT * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: CONTENT_PADDING_BOTTOM,
    paddingHorizontal: CONTENT_PADDING_H,
  },
  title: {
    color: palette.text.primary,
    ...typography.h3,
  },
}));
