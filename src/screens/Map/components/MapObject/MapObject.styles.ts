import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette }) => ({
  iconContainer: {
    backgroundColor: '#147EFB',
    width: 22,
    height: 22,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconColor: {
    color: palette.text.primary,
  },
}));
