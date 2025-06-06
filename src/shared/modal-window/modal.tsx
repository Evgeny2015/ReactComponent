import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom'
import ModalWindow, { ModalWindowProps } from './modal-window';


export interface ModalProps extends ModalWindowProps {
  container?: HTMLElement;
}


export const Modal: FC<ModalProps> = ({ container = document.body, visible, onClose, ...props }) => {
  const [state, setState] = useState(visible);


  const handleOnClose = (): void => {
    onClose?.()
    setState(false)
  };

  if (!visible) return null;

  return createPortal(<ModalWindow onClose={handleOnClose} visible={visible} {...props} />, container);
};