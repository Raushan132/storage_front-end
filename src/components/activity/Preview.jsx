import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../redux/fetch/baseUrl'

const Preview = ({ fileId }) => {

    const [url, setUrl] = useState('')

    useEffect(() => {

        const preview = async (fileId) => {
            const res = await axios.get(`${baseUrl}/permission/download/${fileId}`, {
                headers: {
                    'Content-Type': 'form-data',
                },
                responseType: 'blob'
            })

            const blob = new Blob([res.data], { type: res.headers.getContentType() })
              const link = document.createElement('a')
            //   link.href = window.URL.createObjectURL(blob)
            //   link.download = res.headers.filename
            // get readableStream from blob

            // const readableStream = blob.stream();
            // const stream = readableStream.getReader();

            // while (true) {
            //     // for each iteration: value is the next blob fragment
            //     let { done, value } = await stream.read();
            //     if (done) {
            //         // no more data in the stream
            //         console.log('all blob processed.');
            //         break;
            //     }

            //     // do something with the data portion we've just read from the blob
            //     console.log(value);
            // }

            let reader = new FileReader();
            reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

            setUrl(reader.result)
            console.log(reader)
            reader.onload = function () {
               setUrl(reader.result); // data url
                // link.click();
            };
        }

        preview(fileId)


    }, [])

    return (
        <div>

             <img src={url} width="100%" height="900" alt="hello"/>
             {/* <iframe src={`data:image/jpeg;${url?.split(";")[1]}`} width="100%" height="900" /> */}
             <iframe src={url} width="100%" height="900" />

        </div>
    )
}

export default Preview