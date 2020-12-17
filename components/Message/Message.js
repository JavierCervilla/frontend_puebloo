import { Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'


function Message({ variant, children }) {
    return (
        <Alert style={{ margin: '.25em' }} variant={variant}>{children}</Alert>
    )
}

Message.defaultProps = {
    variant: 'info',
}



export default Message