import * as React from 'react';
import { memo } from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      d="M9 10.073a2.34 2.34 0 1 0 0-4.68 2.34 2.34 0 0 0 0 4.68Z"
      stroke={props.color}
    />
    <Path
      d="M2.715 6.367c1.478-6.494 11.1-6.487 12.57.008.863 3.81-1.508 7.035-3.585 9.03a3.895 3.895 0 0 1-5.407 0c-2.07-1.995-4.44-5.227-3.578-9.037Z"
      stroke={props.color}
    />
  </Svg>
);

const LocationIcon = memo(SvgComponent);
export default LocationIcon;
