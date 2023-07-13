import { makeUseStyles } from 'react-native-stylex';
import {
  CONTENT_PADDING_H,
  CONTENT_WIDTH,
} from '../../core/styling/env/constants';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
    paddingHorizontal: CONTENT_PADDING_H,
  },
  scrollContainer: {
    flexGrow: 1,
    rowGap: 16,
    paddingTop: CONTENT_PADDING_H,
    paddingBottom: 72,
  },
  filterContainer: {
    paddingTop: CONTENT_PADDING_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  map: {
    marginTop: CONTENT_PADDING_H,
    width: CONTENT_WIDTH,
    height: '100%',
  },
  mapIconContainer: {
    height: 35,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: palette.background.card,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 5,
  },
  mapIconTitle: {
    ...typography.body2,
  },
  iconColor: {
    color: palette.text.primary,
  },
}));
