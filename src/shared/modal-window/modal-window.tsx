import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import cn from 'clsx'
import './modal-window.css'

export interface ModalWindowProps {
    visible: boolean;
    children: React.ReactNode;
    onClose: () => void
};

/**
 * Modal Window component
 */
const ModalWindow: FC<ModalWindowProps> = ({ visible, children, onClose }) => {
  return (
    <div className={cn('modalwindow-background', {'window-hidden': !visible})}
        >
        <div className={cn('modalwindow-container')}>
            <div className={cn('body')}>
                    {children}
                </div>
                <div className={cn('footer')}>
                    <button
                        type='button'
                        className={cn('close-button')}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
  );
};

export default ModalWindow;