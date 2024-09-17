import { ReactNode } from 'react';
import './Modal.css';
import { useModal } from '../../../context/ModalContext';

interface IModalProps {
  children: ReactNode;
}

const Modal = ({ children }: IModalProps) => {
  const { activeModal } = useModal();
  if (activeModal === null) return null;
  return (
    <div className='modal-bg'>
      <div className='modal-container'>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
