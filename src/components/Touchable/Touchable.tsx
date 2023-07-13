import React, { memo } from 'react';

import { TouchableOpacity } from 'react-native';
import { TTouchable } from './Touchable.types';

const CTA_BTN_HIT_SLOP = { top: 15, left: 15, right: 15, bottom: 15 };

const Touchable: React.FC<TTouchable> = ({ children, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={0.4} hitSlop={CTA_BTN_HIT_SLOP} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default memo(Touchable);
