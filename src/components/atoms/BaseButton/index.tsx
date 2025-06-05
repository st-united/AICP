import { Button as AntdButton } from 'antd';
import clsx from 'clsx';
import React from 'react';

import type { ButtonProps } from 'antd/es/button';

type VersionBtnType = 'primary' | 'secondary' | 'default';

interface CustomButtonProps extends ButtonProps {
  className?: string;
  version?: VersionBtnType;
  outline?: boolean;
  shadow?: boolean;
}

const baseClass = 'flex items-center h-full w-full px-6 rounded-full font-semibold';

const getVersionClasses = (version: VersionBtnType, outline: boolean, shadow: boolean): string => {
  const styles = {
    primary: clsx({
      '!bg-white !text-primary !border-primary': outline,
      'bg-primary !text-white hover:!bg-primary/90 focus:!bg-primary/90 border !border-primary':
        !outline,
      'shadow-light hover:!shadow-light/10': !outline && shadow,
    }),

    secondary: clsx({
      '!shadow-md !text-secondary !border-none focus:border-disabled': shadow,
      '!bg-white !text-primary !border-none focus:border-primary': !shadow,
    }),

    default: '',
  };

  return styles[version] ?? '';
};

const BaseButton: React.FC<CustomButtonProps> = ({
  className,
  version = 'default',
  outline = false,
  shadow = false,
  ...props
}) => {
  const versionClass = getVersionClasses(version, outline, shadow);

  return <AntdButton {...props} className={clsx(baseClass, versionClass, className)} />;
};

export default BaseButton;
