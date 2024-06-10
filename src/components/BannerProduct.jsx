import React, { useEffect, useRef, useState } from 'react'
import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img5.webp'

import image1Mobile from '../assets/banner/img1_mobile.jpg'
import image2Mobile from '../assets/banner/img2_mobile.webp'
import image3Mobile from '../assets/banner/img3_mobile.jpg'
import image4Mobile from '../assets/banner/img4_mobile.jpg'
import image5Mobile from '../assets/banner/img5_mobile.png'

function BannerProduct() {

    const [currentImage, setCurrentImage] = useState(0)
    const intervalRef = useRef();

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const resetInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentImage((preveImage) => (preveImage+1)% desktopImages.length)
        },3000)
    }

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % desktopImages.length);
        resetInterval();
    }

    // const nextImage = () => {

    //     if(desktopImages.length > currentImage){

    //         setCurrentImage(preve => preve+1)

    //     }
    // }


    const preveImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + desktopImages.length) % desktopImages.length);
        resetInterval();
    };


    // const preveImage = () => {

    //     if(currentImage !=0) {
    //         setCurrentImage(preve => preve-1)
    //     }

    // }

    useEffect(() => {
        resetInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    // useEffect(() => {
        
    //     const interval = setInterval(() => {

    //         if(desktopImages.length > currentImage){
    //             nextImage()
    //         }else{
    //             setCurrentImage(0)
    //         }

    //     },2000)

    //     return () => clearInterval(interval)

    // },[currentImage])


    return (
        <>

            <div className='container mx-auto px-4 rounded-sm'>

                <div className='h-60 md:h-80 bg-blue-200 relative'>

                    <div className='absolute z-10 h-full w-full md:flex items-center hidden'>

                        <div className='flex justify-between w-full text-2xl mx-3'>
                            <button onClick={preveImage} className='bg-white shadow-md rounded-full h-8 w-8 flex items-center justify-center my-auto'> <i class="fa-solid fa-angle-left"></i> </button>
                            <button onClick={nextImage} className='bg-white shadow-md rounded-full h-8 w-8 flex items-center justify-center my-auto'> <i class="fa-solid fa-angle-right"></i> </button>
                        </div>

                    </div>

                    {/* Desktop version */}

                    <div className='hidden  md:flex h-full w-full overflow-hidden'>
                        {
                            desktopImages.map((imageURL, index) => {
                                return (

                                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }} >
                                        <img src={imageURL} alt="No Img" className='w-full h-full' />
                                    </div>

                                )
                            })
                        }
                    </div>

                    {/* Mobile version */}

                    <div className='flex h-full w-full overflow-hidden md:hidden'>
                        {
                            mobileImages.map((imageURL, index) => {
                                return (

                                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }} >
                                        <img src={imageURL} alt="No Img" className='w-full h-full object-cover' />
                                    </div>

                                )
                            })
                        }
                    </div>



                </div>

            </div>

        </>
    )
}

export default BannerProduct