import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/utils";

const useImageHeight = (
  imgUrl: string,
  imgRef: React.RefObject<HTMLImageElement>,
  defaultHeight: number = 112
) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgHeight, setImgHeight] = useState<number>(defaultHeight);

  const updateImgHeight = () => {
    if (imgRef.current && imgRef.current.offsetHeight !== 0) {
      setImgHeight(imgRef.current.offsetHeight);
    }
  };

  // check if the image is valid
  const checkImg = useCallback(async () => {
    setLoading(true);
    // check if the image is valid
    const imgValid = await new Promise((resolve) => {
      const image = new Image();
      // if loaded successfully, resolve true and set the height
      image.onload = () => {
        updateImgHeight();
        resolve(true);
      };
      // else, return false
      image.onerror = () => resolve(false);
      image.src = imgUrl; // set image url
    });
    setLoading(false);
    if (!imgValid) {
      setImgError(true);
    }
  }, [imgUrl]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    setTimeout(() => {
      checkImg();
      return () => clearTimeout(timeout);
    }, 50);
    const resizeEvent = debounce(updateImgHeight, 100);
    window.addEventListener("resize", resizeEvent);
    return () => removeEventListener("resize", resizeEvent);
  }, []);

  return { imgError, loading, imgHeight };
};

export default useImageHeight;
