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
    safety?: string; // Agregado para manejar el safety
}

const Card: React.FC<CardProps> = ({
    image,
    titulo,
    subtitulo,
    sb,
    mb,
    isPromoted,
    time,
    safety = "safe"
}) => {
    // Función para obtener el color del chip de safety
    const getSafetyChipColor = (safetyLevel: string) => {
        switch (safetyLevel.toLowerCase()) {
            case 'safe':
                return 'bg-green-500';
            case 'nsfw':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Función para capitalizar el texto
    const capitalize = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    return (
        <>
            {/* Desktop Version */}
            <div className={`
                hidden md:flex
                w-[250px] mx-h-[410px] rounded-2xl overflow-hidden shadow-lg flex-col
                ${isPromoted ? 'border-4 border-yellow-400' : 'border-4'}
            `}
                style={!isPromoted ? { borderColor: '#20315D' } : {}}>

                {/* Image Container */}
                <div className="relative w-full h-[265px] max-h-[265px] overflow-hidden flex-shrink-0">
                    <img
                        src={image}
                        alt={titulo}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "/assets/images/image_test_card.png"; // Imagen fallback
                        }}
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
                        <span className={`${getSafetyChipColor(safety)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                            {capitalize(safety)}
                        </span>
                        {isPromoted && (
                            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                                Promoted
                            </span>
                        )}
                    </div>
                </div>

                {/* Time Remaining Footer */}
                <div className={`${isPromoted ? 'bg-yellow-400' : 'bg-[#20315D]'} text-center flex-shrink-0 h-auto`}>
                    <div className="flex items-center justify-center gap-2 py-2">
                        <span className={`font-lato font-bold text-[16px] ${isPromoted ? 'text-[#0E172C]' : 'text-white'}`}>
                            {time}
                        </span>
                        <HiOutlineClock className={`w-4 h-4 ${isPromoted ? 'text-[#0E172C]' : 'text-white'}`} />
                    </div>
                </div>
            </div>

            {/* Mobile Version - Layout horizontal */}
            <div className={`
                md:hidden flex flex-row
                w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg
                ${isPromoted ? 'border-4 border-yellow-400' : 'border-4'}
            `}
                style={!isPromoted ? { borderColor: '#20315D' } : {}}>

                {/* Image Container - Lado izquierdo */}
                <div className="relative w-[120px] h-[160px] flex-shrink-0 overflow-hidden">
                    <img
                        src={image}
                        alt={titulo}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "/assets/images/image_test_card.png"; // Imagen fallback
                        }}
                    />
                </div>

                {/* Content Container - Lado derecho */}
                <div className="bg-slate-800 text-white p-3 flex-1 flex flex-col justify-between">
                    {/* Top Section */}
                    <div>
                        {/* Status Tags - Arriba */}
                        <div className="flex gap-1 mb-2">
                            <span className={`${getSafetyChipColor(safety)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                                {capitalize(safety)}
                            </span>
                            {isPromoted && (
                                <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-medium">
                                    Promoted
                                </span>
                            )}
                        </div>

                        {/* Title and Subtitle */}
                        <div className="mb-2">
                            <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2 leading-tight">
                                {titulo}
                            </h3>
                            <p className="font-lato text-xs text-[#C6C6C6]">
                                {subtitulo}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div>
                        {/* Pricing */}
                        <div className="flex flex-col mb-2">
                            <span className="text-white font-bold text-lg">
                                SB: ${sb.toLocaleString()}
                            </span>
                            <span className="text-gray-300 text-sm">
                                MB: ${mb.toLocaleString()}
                            </span>
                        </div>

                        {/* Time Remaining */}
                        <div className="flex items-center gap-1">
                            <HiOutlineClock className="w-3 h-3 text-gray-300" />
                            <span className="font-lato text-xs text-gray-300">
                                {time}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;