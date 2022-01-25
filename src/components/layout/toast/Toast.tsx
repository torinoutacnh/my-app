import React, { FC } from "react"
import { ToastContainer, Toast } from "react-bootstrap"

export const CustomToast: FC<{ title: string, message: string, show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({ title, message, show, setShow }) => {
    return (
        <ToastContainer position="top-end" className="p-3 mt-50">
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                    <strong className="me-auto">{title}</strong>
                    {/* <small className="text-muted">just now</small> */}
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}