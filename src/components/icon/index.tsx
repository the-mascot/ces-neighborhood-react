import React, { JSX } from 'react';

import { ReactComponent as NeighborhoodSvg } from 'src/assets/images/neighborhood_logo.svg';

interface IIconProps {
  height?: number | string;
  width?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
  ownerState?: string;
  onClick?: () => void;
}

function NeighborhoodIcon(props: IIconProps): JSX.Element {
  return <NeighborhoodSvg {...props} />;
}

export const NeighborhoodLogo = React.memo(NeighborhoodIcon);
