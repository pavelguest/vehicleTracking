import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  containerTitle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: palette.background.card,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 5,
  },
  chosen: {
    backgroundColor: palette.background.activeIcon,
  },
  filterTitle: {
    ...typography.body2,
  },
  iconContainer: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.background.card,
    borderRadius: 35,
  },
  iconColor: {
    color: palette.text.primary,
  },
}));
