import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch } from 'react-redux';
import { setCroppedImage } from '../../Redux/Actions/PetsAction';

function ImageCropper({ value }) {
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: value.aspect });
    const [completedCrop, setCompletedCrop] = useState(null);
    const dispatch = useDispatch()

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
                const previewUrl = window.URL.createObjectURL(blob);

                // const anchor = document.createElement('a');
                // anchor.download = 'cropPreview.png';
                // anchor.href = URL.createObjectURL(blob);
                // anchor.click();
                console.log(blob);
                dispatch(setCroppedImage(blob))
                // window.URL.revokeObjectURL(previewUrl);
            },
            'image/png',
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

    // useEffect(() => {
    //     dispatch(setCroppedImage(previewCanvasRef))
    // }, [previewCanvasRef])

    return (

        <div className="">
            <div>
                <button
                    type="button"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={() =>
                        generateDownload(previewCanvasRef.current, completedCrop)
                    }
                >
                    Download cropped image
                </button>
            </div>
            <div>
                <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
            <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
            />

            <div>
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        width: "15em",
                        height: "15em"
                    }}
                />
            </div>

        </div>
    );
}


export default ImageCropper
