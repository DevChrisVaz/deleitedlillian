import { useState } from 'react';

const useImage = (): any => {

    const [img, setImg] = useState<any>("");
    // const [exists, setExists] = useState<boolean>(false);
    // const [width, setWidth] = useState<number>(0);
    // const [height, setHeight] = useState<number>(0);

    return (data: any): any => {
        let image = new Image();
        image.onload = function() {
            setImg(data);
            // setExists(true);
            // setWidth(this.width);
            // setHeight(this.height);
        }
        image.onerror = function() {
            setImg('/assets/images/image-not-found.png');
            // setExists(false);
        }
        image.src = data;
        

        // return { img, exists, width, height };
        // return { img, exists };
        return img;
    }
}

export default useImage;
