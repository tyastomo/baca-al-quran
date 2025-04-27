'use client';

import { useState } from 'react';
type AyatCardProps = {
    ayat: {
      nomorAyat: number;
      teksArab: string;
      teksLatin: string;
      teksIndonesia: string;
      tafsir?: string;  // Menambahkan tafsir
    };
  };

function toArabicNumber(number: number): string {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
}

export default function AyatCard({ ayat }: { ayat: AyatCardProps }) {
const [isTafsirVisible, setIsTafsirVisible] = useState(false);

  const toggleTafsir = () => {
    setIsTafsirVisible(!isTafsirVisible);
  };
  return (
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

      <div className="p-4 ">

      {ayat.tafsir && (
        <button
          onClick={toggleTafsir}
          className="text-sm text-blue-600 hover:underline focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 dark:text-green-300"
        >
          {isTafsirVisible ? 'Sembunyikan Tafsir' : 'Tafsir'}
        </button>
      )}

      {/* Tafsir dengan Animasi */}
      {ayat.tafsir && isTafsirVisible && (
        <div
          className="text-justify text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-500 ease-in-out transform opacity-0 scale-95"
          style={{
            opacity: isTafsirVisible ? 1 : 0,
            transform: isTafsirVisible ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            {ayat.tafsir}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
