import React from 'react';
import Modal from 'react-modal';
import {Button} from "@mui/material";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
const FormModal = ( props) => {
    const {buttonLabel,buttonColor, children, formTitle} = props
    const [modalIsOpen, setIsOpen] = React.useState(false);
    console.log(buttonLabel)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Button color={buttonColor} onClick={openModal}>
                {buttonLabel}
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel={formTitle}
                style={customStyles}>
                {children}
                            </Modal>
        </>
    );
};

export default FormModal;