import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(() => ({
  container: {
    flexDirection: 'row',
    height: 45,
  },
  titleTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  titleTab: {
    textTransform: 'uppercase',
    fontWeight: 'normal',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    marginVertical: 4,
    width: '100%',
    height: 1.5,
  },
}));
