import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  header: {
    backgroundColor: palette.background.tabBar,
    borderBottomWidth: 1,
    borderBottomColor: palette.border.primary,
  },
  headerTransparent: {
    backgroundColor: 'transparent',
  },
  headerTitle: {
    ...typography.header,
  },
  headerBackColor: {
    color: palette.text.primary,
  },
  headerTintLight: {
    color: palette.background.activeIcon,
  },
  tintPrimary: {
    color: palette.background.icon,
  },
  tabBar: {
    backgroundColor: palette.background.tabBar,
    borderTopWidth: 1,
    borderTopColor: palette.border.primary,
  },
}));
