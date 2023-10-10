import React, { memo } from 'react';
import { View } from 'react-native';
import { Touchable } from '../../../../components/Touchable';
import { useStyles } from './MapControls.styles';
import { TMapControlsProps } from './MapControls.types';
import Plus from '../../../../components/Icons/Plus';
import Minus from '../../../../components/Icons/Minus';

const MapControls: React.FC<TMapControlsProps> = ({
  onClickZoomIn,
  onClickZoomOut,
}) => {
  const styles = useStyles();

  return (
    <>
      <View style={styles.topRoot}>
        <Touchable
          style={[styles.btn, styles.shadow]}
          activeOpacity={0.8}
          onPress={onClickZoomIn}>
          <Plus color={styles.iconColor.color} />
        </Touchable>
        <Touchable
          style={[styles.btn, styles.shadow]}
          activeOpacity={0.8}
          onPress={onClickZoomOut}>
          <Minus color={styles.iconColor.color} />
        </Touchable>
      </View>
    </>
  );
};

export default memo(MapControls);
