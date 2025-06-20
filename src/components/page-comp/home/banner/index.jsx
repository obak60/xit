import Image from "next/image";
import React from "react";


const Banner = () => {


    const data = [
        { id: 1, video: "https://prod.saralifestyle.com/Images/Content/5c98fe632c404caca7b41114f05f48d0.mp4", },
        // { id: 2, video: "https://prod.saralifestyle.com/Images/Content/5c98fe632c404caca7b41114f05f48d0.mp4", },
        // { id: 3, video: "https://prod.saralifestyle.com/Images/Content/5c98fe632c404caca7b41114f05f48d0.mp4", },
    ];

    const images = [
        {id: 1, image: "https://i.ibb.co/LqYRKY1/pngtree-red-festive-jewelry-poster-image-910515.jpg"},
        {id: 2, image: "https://i.ibb.co/yn6BbzSx/p.jpg"},
    ];

    return (
        <section className="container">
            <div className="h-full grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-2 md:gap-4 py-3 md:py-5 max-h-[600px]">
                <div className="lg:col-span-2 lg:row-span-2">
                    <video
                        src={data[0].video}
                        className="w-full h-full rounded-md object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label="Exclusive Collection Video"
                    ></video>
                </div>
                {/* <div>
                    <video src={data[1].video}
                        className="w-full h-full rounded-md object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label="Exclusive Collection Video"
                    ></video>
                </div>
                <div>
                    <video src={data[2].video}
                        className="w-full h-full rounded-md object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label="Exclusive Collection Video"
                    ></video>
                </div> */}
                {
                    images?.map(image =>
                        <Image key={image?.id} src={image?.image} className="w-full h-full object-cover rounded-md" width={300} height={400} alt="poster" />
                    )
                }
            </div>
        </section>
    );
};

export default Banner;