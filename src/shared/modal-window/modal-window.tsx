import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import cn from 'clsx'
import './modal-window.css'

export interface ModalWindowProps {
    onClose: () => void
    children: React.ReactNode
}

/**
 * Modal Window component
 */
const ModalWindow: FC<ModalWindowProps> = ({ onClose, children }) => {
    const [visible, setVisible] = useState(true)

    const onCloseHandle = () => {
        onClose()
        setVisible(false)
    }

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
        document.body
    );
};

export default ModalWindow;