import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    borderRadius: 24,
    paddingTop: 16,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    backgroundColor: palette.background.primary,
    borderRadius: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 25,
  },
  withShadowContainer: {
    backgroundColor: palette.background.primary,
  },
  title: {
    color: palette.text.primary,
    ...typography.h2,
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
  iconLeft: {
    position: 'absolute',
    left: 20,
  },
  arrowLeft: {
    transform: [{ rotateY: '180deg' }],
  },
}));
