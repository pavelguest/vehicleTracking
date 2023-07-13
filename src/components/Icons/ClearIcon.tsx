import * as React from 'react';
import { memo } from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 14.666c3.667 0 6.667-3 6.667-6.666 0-3.667-3-6.667-6.667-6.667S1.333 4.333 1.333 8c0 3.666 3 6.666 6.667 6.666ZM6.113 9.887l3.774-3.774M9.887 9.887 6.113 6.113"
    />
  </Svg>
);
const ClearIcon = memo(SvgComponent);
export default ClearIcon;
