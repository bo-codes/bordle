// @ts-nocheck
import ReactDOM from "react-dom"
import { useEffect } from "react";
// import './Modal.css'

const Modal = (props) => {

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return ReactDOM.createPortal(
    <div>
      <div className="modal-background" onClick={props.onClose}></div>
      <div className="modal-content" >{props.children}</div>
    </div>,
    document.querySelector('.modal-container')
  )
}

export default Modal;
