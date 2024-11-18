import { useState, useEffect, useCallback } from "react";
import { debounce, checkImageValidity } from "@/utils";

const useImageHeight = (
  imgUrl: string,
  imgRef: React.RefObject<HTMLImageElement>,
  defaultHeight: number = 112
) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgHeight, setImgHeight] = useState<number>(defaultHeight);

  // check if the image is valid
  const checkImg = useCallback(async () => {
    setLoading(true);
    const imgValid = await checkImageValidity(imgUrl);
    setLoading(false);
    if (!imgValid) {
      setImgError(true);
    }
  }, [imgUrl]);

  // get the image's offsetHeight
  const handleUpdateHeight = useCallback(() => {
    if (imgRef.current && imgRef.current.offsetHeight !== 0) {
      setImgHeight(imgRef.current.offsetHeight);
    }
  }, [imgRef.current]);

  useEffect(() => {
    const loadImg = () => {
      checkImg();
      const timeout = setTimeout(() => {
        handleUpdateHeight();
        return clearTimeout(timeout);
      }, 10);
    };

    loadImg();

    const debouncedHandleImgHeight = debounce(
      handleUpdateHeight,
      300
    );
    window.addEventListener("resize", debouncedHandleImgHeight);
    return () => {
      window.removeEventListener("resize", debouncedHandleImgHeight);
    };
  }, []);

  return { imgError, loading, imgHeight };
};

export default useImageHeight;
