import React, { memo, useCallback, useMemo, useState } from 'react';

import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-stylex';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetBackgroundProps,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/core';
import { useStyles } from './Modal.styles';
import { TCloseBehavior, TModalProps } from './Modal.types';
import { Touchable } from '../Touchable';
import CloseIcon from '../Icons/CloseIcon';
import ChevronLeftIcon from '../Icons/ChevronLeftIcon';

export const BottomSheetBackground = memo(
  ({ style }: BottomSheetBackgroundProps) => {
    const styles = useStyles();
    return <View style={StyleSheet.compose(styles.background, style)} />;
  },
);

export const BottomSheetHandle = memo(
  ({
    title,
    closeBehavior,
    clearState,
  }: {
    title: string;
    closeBehavior: TCloseBehavior;
    clearState?: () => void;
  }) => {
    const theme = useTheme();
    const styles = useStyles();

    const behavior = useBottomSheetModal();

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Touchable
          style={styles.icon}
          onPress={() => {
            behavior[closeBehavior]();
            clearState && clearState();
          }}>
          <CloseIcon color={theme.palette.text.primary} />
        </Touchable>
      </View>
    );
  },
);

export const BottomSheetHandleWithBackArrow = memo(
  ({
    title,
    closeBehavior,
  }: {
    title: string;
    closeBehavior: TCloseBehavior;
  }) => {
    const theme = useTheme();
    const styles = useStyles();

    const behavior = useBottomSheetModal();

    return (
      <View style={styles.header}>
        <Touchable
          style={styles.iconLeft}
          onPress={() => behavior[closeBehavior]()}>
          <ChevronLeftIcon color={theme.palette.text.primary} />
        </Touchable>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  },
);

const Modal = React.forwardRef<
  BottomSheetModal,
  React.PropsWithChildren<TModalProps>
>(
  (
    {
      children,
      title = '',
      handleType = 'default',
      closeBehavior = 'dismiss',
      setHeader = false,
      onChange,
      touchBackdrop = 'close',
      clearState,
    },
    ref,
  ) => {
    const styles = useStyles();
    const snapPoints = useMemo(() => ['5%', 'CONTENT_HEIGHT'], []);
    const [isShowing, setIsShowing] = useState<boolean>(false);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={touchBackdrop}
          appearsOnIndex={1}
          onPress={() => clearState && clearState()}
        />
      ),
      [clearState, touchBackdrop],
    );

    const renderHeader = useCallback(
      () =>
        setHeader ? (
          <BottomSheetHandle
            closeBehavior={closeBehavior}
            clearState={clearState}
            title={title}
          />
        ) : (
          <></>
        ),
      [clearState, closeBehavior, setHeader, title],
    );

    // useEffect for intercepting the hardware back gesture/button.
    // With the hook, first back gesture will close the modal,
    // second will pass the gesture further (usually to dismiss the screen)
    // Author: Vishal Parmar, https://stackoverflow.com/a/72683259
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          if (isShowing) {
            //@ts-ignore
            ref.current?.dismiss();
            clearState && clearState();
            return true;
          } else {
            return false;
          }
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [clearState, isShowing, ref]),
    );

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(snapPoints);

    return (
      <BottomSheetModal
        style={styles.container}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        enableOverDrag={false}
        ref={ref}
        index={1}
        keyboardBlurBehavior="restore"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        stackBehavior={handleType === 'withBackArrow' ? 'push' : 'replace'}
        handleComponent={renderHeader}
        backgroundComponent={BottomSheetBackground}
        backdropComponent={renderBackdrop}
        onChange={idx => {
          setIsShowing(idx < 1 ? false : true);
          if (onChange) onChange(idx);
        }}>
        <View onLayout={handleContentLayout}>{children}</View>
      </BottomSheetModal>
    );
  },
);

export default memo(Modal);
