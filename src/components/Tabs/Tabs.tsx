import React, { memo, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useStyles } from './Tabs.styles';
import { TTabsProps } from './Tabs.types';

const Tabs: React.FC<TTabsProps> = ({
  items,
  selectedIndex,
  onChange,
  barColor,
  indicatorColor,
  activeTextColor,
  inactiveTextColor,
}) => {
  const styles = useStyles();

  const [tabWidth, setTabWidth] = useState(0);
  const translateX = useSharedValue(0);

  const getTabWidth = useCallback(
    (width = 0) => {
      setTabWidth(width / items.length);
    },
    [items.length],
  );

  const handleTabPress = useCallback(
    (index: number) => {
      onChange(index);
      const position = index * tabWidth;
      translateX.value = position;
    },
    [onChange, tabWidth, translateX],
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(translateX.value, {
            duration: 200,
          }),
        },
      ],
    };
  });

  return (
    <View
      style={[styles.container, { backgroundColor: barColor }]}
      onLayout={event => getTabWidth(event.nativeEvent.layout.width)}>
      {items &&
        items.map((item, index) => (
          <TouchableOpacity onPress={() => handleTabPress(index)} key={index}>
            <View style={[styles.titleTabContainer, { width: tabWidth }]}>
              <Text
                style={[
                  styles.titleTab,
                  {
                    color:
                      index === selectedIndex
                        ? activeTextColor
                        : inactiveTextColor,
                  },
                ]}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      <Animated.View
        style={[
          styles.separator,
          { backgroundColor: indicatorColor, width: tabWidth },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default memo(Tabs);
