import * as React from 'react';
import { memo } from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M2 4.667h12M4 8h8M6.667 11.334h2.666"
    />
  </Svg>
);
const FilterIcon = memo(SvgComponent);
export default FilterIcon;
