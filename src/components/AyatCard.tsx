'use client';

import { useState } from 'react';

type AyatCardProps = {
  ayat: {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    tafsir?: string;
  };
};

function toArabicNumber(number: number): string {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
}

export default function AyatCard({ ayat }: { ayat: AyatCardProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="p-6 rounded-lg border hover:shadow-md transition dark:border-gray-700 space-y-4 relative">
        {/* Nomor Ayat */}
        <div className="absolute top-4 left-4 text-3xl dark:text-green-300 font-bold">
          {toArabicNumber(ayat.nomorAyat)}
        </div>

        {/* Teks Arab */}
        <div className="text-3xl text-right font-arabic leading-relaxed text-arabic dark:text-green-300">
          {ayat.teksArab}
        </div>

        {/* Teks Latin */}
        <div className="text-sm text-gray-500 italic mt-2 text-latin dark:text-green-300">
          {ayat.teksLatin}
        </div>

        {/* Teks Terjemahan */}
        <div className="text-base dark:text-gray-300">
          {ayat.teksIndonesia}
        </div>

        {/* Tombol Tampilkan Tafsir */}
        {ayat.tafsir && (
          <div className="pt-4">
            <button
              onClick={openModal}
              className="text-sm text-blue-600 hover:underline focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 dark:text-green-300"
            >
              Tafsir
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-300 text-center">Tafsir Ayat</h2>
      
      <div className="text-justify text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        {ayat.tafsir}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={closeModal}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
