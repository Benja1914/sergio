import React from 'react';
import { HiOutlineClock } from "react-icons/hi";

interface CardProps {
    image: string;
    titulo: string;
    subtitulo: string;
    sb: number;
    mb: number;
    isPromoted: boolean;
    time: string;
}

const Card: React.FC<CardProps> = ({
    image,
    titulo,
    subtitulo,
    sb,
    mb,
    isPromoted,
    time
}) => {
    return (
        <div className={`
      w-[250px] mx-h-[410px] rounded-2xl overflow-hidden shadow-lg flex flex-col
      ${isPromoted ? 'border-4 border-yellow-400' : 'border-4'}
    `}
            style={!isPromoted ? { borderColor: '#20315D' } : {}}>

            {/* Image Container */}
            <div className="relative w-full h-[265px] max-h-[265px] overflow-hidden flex-shrink-0">
                <img
                    src={image}
                    alt={titulo}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Container */}
            <div className="bg-slate-800 text-white p-4 flex-1 flex flex-col">
                {/* Title and Subtitle */}
                <div className="mb-2">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate leading-none">
                        {titulo}
                    </h3>
                    <p className="font-lato text-[14px] text-[#C6C6C6]">
                        {subtitulo}
                    </p>
                </div>

                {/* Pricing */}
                <div className="flex flex-col mb-2">
                    <span className="text-white font-bold text-xl">
                        SB: ${sb.toLocaleString()}
                    </span>

                    <span className="text-gray-300 text-base">
                        MB: ${mb.toLocaleString()}
                    </span>
                </div>

                {/* Status Tags */}
                <div className="flex gap-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Safe
                    </span>
                    {isPromoted && (
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                            Promoted
                        </span>
                    )}
                </div>
            </div>

            {/* Time Remaining Footer */}
            <div className={`${isPromoted ? 'bg-yellow-400' : 'bg-[#20315D]'} text-center flex-shrink-0 h-auto`}>                <div className="flex items-center justify-center gap-2">
                <span
                    className={`font-lato font-bold text-[16px] ${isPromoted ? 'text-[#0E172C]' : 'text-white'}`}
                >
                    {time}
                </span>
                <span
                    className={`font-lato font-bold text-[16px] ${isPromoted ? 'text-[#0E172C]' : 'text-white'}`}
                >
                    <HiOutlineClock className="inline w-4 h-4 align-middle" />
                </span>
            </div>
            </div>
        </div>
    );
};

export default Card;