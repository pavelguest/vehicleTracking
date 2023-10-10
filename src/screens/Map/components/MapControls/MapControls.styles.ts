import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette }) => ({
  topRoot: {
    position: 'absolute',
    top: 200,
    right: 15,
    zIndex: 0,
  },
  btn: {
    width: 40,
    height: 40,
    marginBottom: 20,
    backgroundColor: palette.background.button,
    borderRadius: 29,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.12,
    shadowColor: palette.background.primary,
    elevation: 6,
  },
  iconColor: {
    color: palette.background.icon,
  },
}));
