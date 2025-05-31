import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import cn from 'clsx'
import './modal-window.css'

export interface ModalWindowProps {
    onClose: () => void
    children: React.ReactNode
}

const modalRoot = document.createElement('div');
document.body.appendChild(modalRoot);

/**
 * Modal Window component
 */
const ModalWindow: FC<ModalWindowProps> = ({ onClose, children }) => {
    const [visible, setVisible] = useState(true)
    const el = document.createElement('div')

    useEffect(() => {
        // console.debug('enter useEffec')
        modalRoot.appendChild(el);


        return () => {
            // console.debug('leave useEffec')
            modalRoot.removeChild(el);
        };
    }, [visible]);

    const onCloseHandle = () => {
        onClose()
        setVisible(false)
    }

    // console.debug('render')
    if (!visible) return null

    return ReactDOM.createPortal(
        <div className={cn('modalwindow-background')}
            >
            <div className={cn('modalwindow-container')}>
                <div className={cn('body')}>
                    {children}
                </div>
                <div className={cn('footer')}>
                    <button
                        type='button'
                        className={cn('close-button')}
                        onClick={onCloseHandle}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        el
    );
};

export default ModalWindow;