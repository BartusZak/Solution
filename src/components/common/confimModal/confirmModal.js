import React from 'react'
import './confirmModal.scss';
import Modal from 'react-responsive-modal';
import FancyModal from './../fancy-modal/fancy-modal';

const confirmModal = ({denyName, open, content, onClose, header,
    operation, operationName, children}) => (
    <FancyModal
    key={2}
    open={open}
    classNames={{ modal: "Modal Modal-add-owner" }}
    contentLabel={content}
    onClose={onClose}
    >
        <div className="delete-content-modal">
            <h2>{header}</h2>
            <div>
                <button className="option-btn green-btn" onClick={operation}>{operationName}</button>
                <button className="option-btn"
                onClick={onClose}>{denyName}</button>
            </div>
        </div>
        {children}
    </FancyModal>
);
confirmModal.defaultProps = {
    denyName: "Anuluj"
}
export default confirmModal;
