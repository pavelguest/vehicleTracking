import React, { memo } from 'react';
import { View } from 'react-native';
import { TVehicleFilterProps } from './VehicleFilter.types';
import { useStyles } from './VehicleFilter.styles';
import { Touchable } from '../../../../components/Touchable';
import { Text } from '../../../../components/Text';
import FilterIcon from '../../../../components/Icons/FilterIcon';
import ClearIcon from '../../../../components/Icons/ClearIcon';
import { useStore } from '../../../../store';

const VehicleFilter: React.FC<TVehicleFilterProps> = ({
  title,
  chosen,
  handlePress,
}) => {
  const styles = useStyles();

  const { vehiclesStore } = useStore();

  return (
    <View style={styles.container}>
      <Touchable onPress={handlePress}>
        <View style={[styles.containerTitle, chosen && styles.chosen]}>
          <Text style={styles.filterTitle}>{title}</Text>
          <FilterIcon color={styles.iconColor.color} />
        </View>
      </Touchable>
      {chosen && (
        <Touchable
          style={styles.iconContainer}
          onPress={() => vehiclesStore.clearFilters()}>
          <ClearIcon color={styles.iconColor.color} />
        </Touchable>
      )}
    </View>
  );
};

export default memo(VehicleFilter);
