import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette }) => ({
  iconContainer: {
    backgroundColor: 'blue',
    width: 27,
    height: 27,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconColor: {
    color: palette.text.primary,
  },
}));
