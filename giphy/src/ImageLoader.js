import React, { useState } from 'react';
import clsx from 'clsx'

const ImageLoader = ({ src, alt, height, reference }) => {
    const [isLoading, setIsLoading] = useState(true);  // Track loading state
    const [hasError, setHasError] = useState(false);  // Track error state

    const handleImageLoad = () => {
        setIsLoading(false);  // Image has loaded, update the state
    };

    const handleImageError = () => {
        setHasError(true);  // Image failed to load, update the state
        setIsLoading(false);  // Set loading to false even in case of error
    };

    return (
        <div>
            {/* Conditional rendering for loading and error states */}
            {/* {isLoading && <img>Loading...</img>}
            {hasError && <p>Failed to load image</p>} */}

            {/* Image with event handlers */}
            <img
                src={src}
                ref={reference}
                alt={alt}
                width={400}
                onLoad={handleImageLoad}
                onError={handleImageError}
                height={height}
                className={clsx(isLoading ? `bg-amber-500` : "", "border-yellow-600 border-2 mb-2 rounded-md")}// Hide the image while loading
            />
        </div>
    );
};

export default ImageLoader;
