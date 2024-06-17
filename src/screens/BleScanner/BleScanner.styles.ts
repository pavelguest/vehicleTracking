import { makeUseStyles } from 'react-native-stylex';
import { CONTENT_PADDING_H } from '../../core/styling/env/constants';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
    paddingHorizontal: CONTENT_PADDING_H,
  },
  flatListContainer: {
    rowGap: 25,
    paddingTop: 15,
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
  beaconContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  listEmptyContainer: {
    alignItems: 'center',
  },
  bleItemTitle: {
    color: 'white',
  },
}));
