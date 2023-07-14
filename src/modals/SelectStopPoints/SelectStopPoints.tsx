import React, { memo } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useStyles } from './SelectStopPoints.styles';
import { TSelectStopPointsProps } from './SelectStopPoints.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Modal } from '../../components/Modal';
import { CONTENT_PADDING_BOTTOM } from '../../core/styling/env/constants';

const SelectStopPoints: React.FC<TSelectStopPointsProps> = ({
  title,
  modalRef,
  stopPointsData,
}) => {
  const styles = useStyles();
  const { bottom } = useSafeAreaInsets();

  const combinedContainerStyles = StyleSheet.compose(styles.container, {
    paddingBottom: bottom + CONTENT_PADDING_BOTTOM,
  });

  return (
    <Modal ref={modalRef} setHeader title={title}>
      <View style={combinedContainerStyles}>
        <Text style={styles.title}>{stopPointsData?.stoppointName}</Text>
      </View>
    </Modal>
  );
};

export default memo(SelectStopPoints);
