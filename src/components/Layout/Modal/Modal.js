import React from 'react'
import Modal from 'react-modal';

// Define custom styles for the modal content and overlay.
const customStyles = {
    content: {
        top: '50%',  // Center the modal vertically.
        left: '50%', // Center the modal horizontally.
        right: 'auto',  // Use auto right positioning.
        bottom: 'auto', // Use auto bottom positioning.
        marginRight: '-50%', // Adjust the right margin to help center the modal.
        transform: 'translate(-50%, -50%)', // Use transform for precise centering.
        width: 'auto', // Automatic width based on content size.
        maxHeight: '90vh', // Maximum height to avoid overflow.
        overflow: 'auto', // Enable scrolling within the modal.
        border: 'none' // No border for a cleaner look.
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)' // Semi-transparent overlay.
    }
};

const ModalCustom = ({
    isOpen,  // Boolean indicating if the modal is open.
    onRequestClose,  // Function to call when the modal requests to be closed.
    children,  // Children components to render inside the modal.
}) => {

    return (
        <Modal
                isOpen={isOpen}  
                onRequestClose={onRequestClose}
                style={customStyles}
            >
                {children}
            </Modal>
    )
}

export default ModalCustom;  // Export the component for reuse.
