import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h3,
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
}));
