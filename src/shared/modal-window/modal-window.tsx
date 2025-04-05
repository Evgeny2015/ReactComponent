import React, { FC } from 'react';
import cn from 'clsx';
import './modal-window.css';

export interface ModalWindowProps {
    visible: boolean;
    children: React.ReactNode;
};


/**
 * Modal Window component
 */
const ModalWindow: FC<ModalWindowProps> = ({ visible, children, ...props }) => {
  return (
    <div className={cn('modalwindow-background', {'window-hidden': !visible})}
        {...props}
        >
        <div className={cn('modalwindow-container')}>
            <div className={cn('body')}>
                    {children}
            </div>
            <div className={cn('footer')}>
                <button
                    type='button'
                    className={cn('close-button')}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
  );
};

export default ModalWindow;