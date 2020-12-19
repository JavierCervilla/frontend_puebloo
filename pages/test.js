import React, { useState } from 'react'
import axios from 'axios'
import { Form, Container, Button } from 'react-bootstrap'
import UploadFiles from '../components/UploadFiles/UploadFiles'
import MainLayout from '../layout/MainLayout'

const testUpload = () => {

    const SERVER_URL = 'http://localhost:5000' || 'http://192.168.1.47:5000'

    const [imgPaths, setImgPaths] = useState(null)
    const [imgCollection, setImgCollection] = useState(false)
    const [error, setError] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        if (imgCollection) {

            const formData = new FormData();

            for (const key of Object.keys(imgCollection)) {
                formData.append('images', imgCollection[key])
            }
            const data = new URLSearchParams(formData)
            try {
                const { data } = await axios.post(`${SERVER_URL}/api/fileupload`, formData, {})

                /* let headers = new Headers()
                headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
                headers.append('Access-Control-Allow-Credentials', 'true');
                const response = await fetch(
                    `${SERVER_URL}/api/fileupload`, {
                    method: 'POST',
                    headers,
                    data
                }) */
                //const data = await response.json()
                setImgPaths(data.imgpaths)
                console.log('imgPaths', imgPaths)
            } catch (error) {
                console.error(error)
                setError('Parece que ha ocurrido un error con la subida de imagenes, por favor. Inténtalo de nuevo.')
            }
        }

    }

    return (
        <MainLayout>
            <Form onSubmit={submitHandler} className="px-4" style={{ maxWidth: '700px' }} >
                {error && <h4>{error}</h4>}
                <UploadFiles
                    imgpaths={imgPaths}
                    setImgPaths={setImgPaths}
                    setImgCollection={setImgCollection}
                    imgCollection={imgCollection}
                />
                <Button type='submit'> subir</Button>
            </Form>
        </MainLayout>
    )
}

export default testUpload