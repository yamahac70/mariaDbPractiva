// src/components/Modal.jsx
import React from "react";

export default function Modal({ isOpen, onClose, titulo, children }) {
  // comprobar si el modal esta abierto
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {titulo && <h3 className="font-bold text-lg mb-4">{titulo}</h3>}

       
        <div>{children}</div>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </div>
  );
}