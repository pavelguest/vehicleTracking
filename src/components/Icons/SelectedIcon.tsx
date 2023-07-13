import * as React from 'react';
import { memo } from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={18} height={13} fill="none" {...props}>
    <Path
      d="M17 1 6 12 1 7"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SelectedIcon = memo(SvgComponent);
export default SelectedIcon;
