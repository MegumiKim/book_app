const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="custom_modal_backdrop">
      <div className="custom_modal">
        {children}
        <button onClick={onClose} className="">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
