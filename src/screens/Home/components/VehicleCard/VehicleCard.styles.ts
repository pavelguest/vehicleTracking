import { makeUseStyles } from 'react-native-stylex';

export const useStyles = makeUseStyles(({ palette, typography }) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: palette.background.card,
  },
  additionalInfoContainer: {
    marginTop: 8,
    rowGap: 4,
  },
  additionalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  itemTitle: {
    ...typography.body2,
    lineHeight: 19,
    marginTop: 3,
    marginBottom: 2,
    color: palette.text.primary,
  },
}));
