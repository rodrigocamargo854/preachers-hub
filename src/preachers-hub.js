"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftsHub() {
    const [gifts, setGifts] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);

    useEffect(() => {
        fetch("/preachers")
            .then((res) => res.json())
            .then((data) => setGifts(data))
            .catch((err) => console.error("Erro ao carregar dons:", err));
    }, []);

    if (!gifts) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
                <p className="text-lg font-semibold">Carregando dons...</p>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-3xl font-extrabold text-white drop-shadow-md text-center mb-4">
                Os Sete Dons do Espírito Santo
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {gifts.map((gift, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all relative"
                    >
                        <h2 className="text-2xl font-bold text-gray-900">{gift.nome}</h2>
                        <button
                            className="mt-3 text-blue-500 font-medium underline hover:text-blue-700"
                            onClick={() => setSelectedGift(gift)}
                        >
                            Saiba mais
                        </button>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedGift && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedGift(null)}
                    >
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                                {selectedGift.nome}
                            </h2>
                            <p className="text-gray-700 text-lg font-medium leading-relaxed">
                                {selectedGift.descricao}
                            </p>
                            <p className="text-gray-800 text-lg font-semibold mt-3">
                                <strong>Referência Bíblica:</strong> {selectedGift.referencia_biblica}
                            </p>
                            <p className="text-gray-800 text-lg font-semibold mt-3">
                                <strong>Exemplo:</strong> {selectedGift.exemplo}
                            </p>
                            {selectedGift.video_formacao && (
                                <a
                                    href={selectedGift.video_formacao}
                                    target="_blank"
                                    className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all block"
                                >
                                    Assista à formação
                                </a>
                            )}
                            <button
                                className="mt-6 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-all"
                                onClick={() => setSelectedGift(null)}
                            >
                                Fechar
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
