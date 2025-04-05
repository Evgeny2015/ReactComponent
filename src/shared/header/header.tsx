import React, { FC } from 'react';
import cn from 'clsx';
import './header.css';
import Logo from '../logo/logo';

export interface HeaderProps {

};


/**
 * Header component
 */
const Header: FC<HeaderProps> = ({ ...props }) => {
  return (
    <header className={cn('header')}
    {...props}
    >
      <div>
        <Logo size={25} />
      </div>
    </header>
  );
};

export default Header;