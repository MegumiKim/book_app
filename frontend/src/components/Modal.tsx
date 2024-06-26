import { ReactNode } from "react";

// Define a type for your component's props
type ModalProps = {
  isOpen: boolean;
  onClose: () => void; // assuming onClose doesn't need to receive any argument
  children: ReactNode; // ReactNode allows any type of react children
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="custom_modal_backdrop z-10">
      <div className="custom_modal">
        <button
          onClick={onClose}
          className="modal_close_btn btn btn-circle btn-outline"
        >
          close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
