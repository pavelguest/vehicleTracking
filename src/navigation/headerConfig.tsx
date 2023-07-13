import React from 'react';

import { Text } from 'react-native';

import { useNavigation } from './navigation';
import { useStyles } from './navigation.styles';
import type { HeaderTitleProps } from './Navigation.types';
import ChevronLeftIcon from '../components/Icons/ChevronLeftIcon';
import { Touchable } from '../components/Touchable';

export const Title = ({ children }: HeaderTitleProps) => {
  const styles = useStyles();

  return (
    <Text numberOfLines={1} style={styles.headerTitle}>
      {children}
    </Text>
  );
};

export const useHeaderWithBackConfig = () => {
  const navigation = useNavigation();
  const styles = useStyles();

  return {
    headerShown: true,
    headerBackVisible: false,
    headerBackTitleVisible: false,
    headerStyle: styles.header,
    headerTitle: (props: HeaderTitleProps) => <Title {...props} />,
    headerTitleAlign: 'center' as const,
    headerLeft: () => (
      <Touchable onPress={navigation.goBack}>
        <ChevronLeftIcon color={styles.headerBackColor.color} />
      </Touchable>
    ),
  };
};

export const useHeaderConfig = () => {
  const styles = useStyles();

  return {
    headerShown: true,
    headerBackVisible: false,
    headerBackTitleVisible: false,
    headerStyle: styles.header,
    headerTitle: (props: HeaderTitleProps) => <Title {...props} />,
    headerTitleAlign: 'center' as const,
  };
};
