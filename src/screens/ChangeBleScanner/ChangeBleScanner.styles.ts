import { makeUseStyles } from 'react-native-stylex';
import { CONTENT_PADDING_H } from '../../core/styling/env/constants';

export const useStyles = makeUseStyles(({ palette }) => ({
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
    paddingHorizontal: CONTENT_PADDING_H,
  },
  bleItemTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
}));
