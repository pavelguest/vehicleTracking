import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" strokeWidth={1.5} {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16 16.01.01-.011M6 16.01l.01-.011M20 22V8m0 0h-2V2h4v6h-2Z"
    />
    <Path
      fill={props.color}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 20v2h2v-2H4ZM14 20v2h2v-2h-2Z"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 20H2.6a.6.6 0 0 1-.6-.6v-6.8a.6.6 0 0 1 .6-.6H16M14 8H6m8-6H6a4 4 0 0 0-4 4v2"
    />
  </Svg>
);
const StopPoint = memo(SvgComponent);
export default StopPoint;
