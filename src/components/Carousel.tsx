"use client";
import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

interface CarouselProps {
    slides: string[];
}

export default function Carousel({ slides }: CarouselProps) {
    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <div className="overflow-hidden relative">
            <div
                className="flex transition ease-out duration duration-400"
                style={{
                    transform: `translateX(-${current * 100}%)`, // Corrected the style property
                }}
            >
                {slides.map((s, index) => (
                    <img key={index} src={s} alt={`slide-${index}`} />
                ))}
            </div>
            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-1">
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>
            <div className="absolute bottom-0 py-4 flex justify-center gap-4 w-full">
                {slides.map((s, i) => {
                    return (
                        <div
                            onClick={() => {
                                setCurrent(i);
                            }}
                            key={"circle" + i}
                            className={`rounded-full w-3 h-3 cursor-pointer  ${i == current ? 'bg-white' : 'bg-gray-300'}`}> </div>
                    );

                })}
            </div>
        </div>
    );
}
