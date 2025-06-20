"use client";

import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


const ImageGallery = ({product}) => {

  
  const images = product?.images?.map((imgUrl) => ({
    original: imgUrl,
    thumbnail: imgUrl,
  })) || [];

  return (
    <div className=''>
        <ReactImageGallery items={images} thumbnailPosition='bottom' showNav={false} showPlayButton={false} showBullets={false} />
    </div>
  );
};

export default ImageGallery;
