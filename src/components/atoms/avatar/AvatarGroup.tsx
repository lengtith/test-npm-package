import React, { createContext, PropsWithChildren, ReactElement } from "react";
import Avatar, { AvatarProps } from './Avatar'; // Assuming Avatar component is in the same directory

interface AvatarGlobalProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isDisabled?: boolean;
  isBordered?: boolean;
  className?: string;
}

export const AvatarContext = createContext<AvatarGlobalProps | null>(null);

interface AvatarGroupProps extends AvatarGlobalProps {
  max?: number;
}

const AvatarGroup: React.FC<PropsWithChildren<AvatarGroupProps>> = ({
  max = 2, // Default to showing only 2 avatars
  size,
  color,
  radius,
  isDisabled,
  isBordered,
  className,
  children
}) => {
  // Convert children to an array of React elements
  const avatars = React.Children.toArray(children);

  // Modify each Avatar to include the hover scale effect
  const displayedAvatars = avatars.slice(0, max).map((child) => {
    if (React.isValidElement<AvatarProps>(child)) {
      return React.cloneElement(child, {
        className: `${child.props.className || ''} transition-all duration-300 ease-in-out hover:-translate-x-1 hover:border-2 hover:border-blue-500`,
      });
    }
    return child;
  });

  const extraCount = avatars.length - max;

  return (
    <AvatarContext.Provider
      value={{
        size,
        color,
        radius,
        isDisabled,
        isBordered,
        className,
      }}
    >
      <div className={`flex -space-x-1 ${className}`}>
        {displayedAvatars}
        {extraCount > 0 && (
          <Avatar
            name={`+${extraCount}`}
            className="flex items-center justify-center bg-gray-200 text-gray-900 transition-all duration-300 ease-in-out hover:border-2 hover:border-blue-500"
            isBordered={isBordered}
            color={color}
          >
            +{extraCount}
          </Avatar>
        )}
      </div>
    </AvatarContext.Provider>
  );
};

export default AvatarGroup;
