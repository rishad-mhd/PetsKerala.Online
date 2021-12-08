import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserImage } from '../../Redux/Actions/PetsAction';
import './ImageCropper.css'

function ImageCropper({ value, load }) {
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: value.aspect });
    const [completedCrop, setCompletedCrop] = useState();
    const dispatch = useDispatch()
    const [state, setState] = useState()
    const [progress, setProgress] = useState()
    load(progress)
    



    const onSelectFile = (e) => {
        setState(true)
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);

        }
    };


    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    const options = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            // console.log(percent, "%", loaded, "b", total);
            setProgress(true)
        }
    }

    const updateImage = (image) => {
        console.log('hi');
        let formdata = new FormData()
        if (image) {
            formdata.append('image', image)
        }
        axios.put('/users/update-user-image', formdata, options)
            .then((res) => {
                // window.location.reload()
                dispatch(setUserImage(null))
                console.log(res);
                setProgress(null)
            }).catch((err) => console.log(err))
    }

    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
                console.log(blob);
                updateImage(blob)
            },
            'image/jpeg',
            1
        );
    }

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );
    }, [completedCrop]);

    return (
        <div>
            <div>
                <label htmlFor="upload" onChange={onSelectFile} style={{ float: 'right', marginBottom: '-38px' }}>
                    <i class="fas fa-pencil-alt "></i>
                    <input style={{ display: 'none' }} id='upload' type="file" accept="image/*" />
                </label>
            </div>
            {/* {<div class="progres">
            <div class="progress-bar">{progress}25%</div>
            </div>} */}
            {state && <div className="transparent-div">
                <div className="image-cropper">
                    <div>
                        <ReactCrop
                            src={upImg}
                            onImageLoaded={onLoad}
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                        />
                        <div className="crop-button">
                            <button className="btn btn-outline-danger" onClick={() => {
                                // window.location.reload()
                                document.getElementById('upload').value = null
                                setState(false)
                            }}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                style={{ marginLeft: '1em' }}
                                disabled={!completedCrop?.width || !completedCrop?.height}
                                onClick={() => {
                                    generateDownload(previewCanvasRef.current, completedCrop)
                                    document.getElementById('upload').value = null
                                    setState(false)
                                }}>
                                Done
                            </button>
                        </div>
                    </div>

                    <div style={{
                        display: 'none'
                    }}>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                width: "15em",
                                height: "15em",
                            }}
                        />
                    </div>
                    <div>
                    </div>
                </div>
            </div>}
        </div>
    );
}


export default ImageCropper
