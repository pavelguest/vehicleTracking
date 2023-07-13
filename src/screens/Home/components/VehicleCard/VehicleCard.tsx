import React from 'react';
import { memo, useCallback } from 'react';
import { TVehicleCardProps } from './VehicleCard.types';
import { View } from 'react-native';
import { Touchable } from '../../../../components/Touchable';
import { Text } from '../../../../components/Text';
import { useStyles } from './VehicleCard.styles';
import { useNavigation } from '../../../../navigation/navigation';
import { useTranslation } from 'react-i18next';

const VehicleCard: React.FC<TVehicleCardProps> = ({ vehicle }) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleNavigateToVehicleDetails = useCallback(() => {
    navigation.navigate('VehicleDetails', { id: vehicle.id });
  }, [navigation, vehicle.id]);

  return (
    <Touchable
      style={styles.container}
      onPress={handleNavigateToVehicleDetails}>
      <View style={styles.additionalInfoContainer}>
        <View style={styles.additionalInfoItem}>
          <Text style={styles.itemTitle}>
            {`${t('home.vehicleName')}: ${vehicle.carBrand} #${vehicle.id}`}
          </Text>
        </View>
        <View style={styles.additionalInfoItem}>
          <Text style={styles.itemTitle}>
            {`${t('home.driverName')}: ${vehicle.driverName}`}
          </Text>
        </View>
        <View style={styles.additionalInfoItem}>
          <Text style={styles.itemTitle}>
            {`${t('home.vehicleCategory')}: ${t(
              `selectVehicleCategories.${vehicle.category}`,
            )}`}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

export default memo(VehicleCard);
