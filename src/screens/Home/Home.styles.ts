import { makeUseStyles } from 'react-native-stylex';
import { CONTENT_PADDING_H } from '../../core/styling/env/constants';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
    paddingHorizontal: CONTENT_PADDING_H,
  },
  tabsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
    rowGap: 30,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: palette.background.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    ...typography.button,
  },
  iconColor: {
    color: palette.text.primary,
  },
}));
