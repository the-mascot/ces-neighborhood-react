import { ReactComponent as NeighborhoodSvg } from 'src/assets/images/neighborhood_logo.svg';
import React, { memo } from 'react';

interface IIconProps {
  height?: number | string;
  width?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
  ownerState?: string;
  onClick?: () => void;
}

function NeighborhoodIcon(props: IIconProps) {
  return <NeighborhoodSvg {...props} />;
}

export const NeighborhoodLogo = React.memo(NeighborhoodIcon);
