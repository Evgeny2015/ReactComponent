import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom'
import ModalWindow, { ModalWindowProps } from './modal-window';
import { Button } from 'antd';


export interface ModalProps extends ModalWindowProps {
  container?: HTMLElement
  visible: boolean
}

export const Modal: FC<ModalProps> = ({ container = document.body, visible, ...props }) => {
  return (
    <>
      {visible &&
        createPortal(
          <>
            <ModalWindow {...props} />
          </>
          , container)
      }
    </>
  )
};