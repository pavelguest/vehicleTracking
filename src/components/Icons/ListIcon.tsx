import * as React from 'react';
import { memo } from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={19} height={18} fill="none" {...props}>
    <Path
      d="M6.5 1.5v2.25M12.5 1.5v2.25M5.75 9.75h6M5.75 12.75H9.5M12.5 2.625c2.498.135 3.75 1.087 3.75 4.612v4.636c0 3.09-.75 4.635-4.5 4.635h-4.5c-3.75 0-4.5-1.545-4.5-4.635V7.238c0-3.526 1.253-4.47 3.75-4.613h6Z"
      stroke={props.color}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ListIcon = memo(SvgComponent);
export default ListIcon;
