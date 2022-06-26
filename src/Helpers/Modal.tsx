import { createPortal } from 'react-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { toggle } from '../Reducers/Modal';
import "./Modal.css"

const Modal=()=> {
    const open = useAppSelector(state => state.ModalReducer.open);
    const dispatch = useAppDispatch();
    const message:string|null=useAppSelector(state => state.ModalReducer.message)
    const portal:HTMLElement=document.getElementById("portal") as HTMLElement; 
    return <>
        {open && createPortal(<div className='overlay'>
            <div className="modal__container">
            <h1><button className="closemodal" onClick={() => dispatch(toggle(null))}>X</button></h1>
                <div className="modal__body">{message}</div>
               
            </div>
        </div>, portal)}
    </>
}
export default Modal;