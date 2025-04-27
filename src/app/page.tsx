'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Surat = {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  jumlahAyat: number;
}

export default function Home() {
  const [suratList, setSuratList] = useState<Surat[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchSurat = async () => {
      const res = await fetch('https://equran.id/api/v2/surat')
      const data = await res.json()
      setSuratList(data.data)
    }
    fetchSurat()
  }, [])

  const filteredSurat = suratList.filter((surat) =>
    surat.namaLatin.toLowerCase().includes(search.toLowerCase())
  )

  const toArabicNumber = (number: number): string => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('')
  }

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Cari surat..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded border focus:outline-none focus:ring focus:border-green-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSurat.map((surat) => (
          <Link
            href={`/surat/${surat.nomor}`}
            key={surat.nomor}
            className="flex items-center gap-4 p-4 rounded-lg border shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold">
              {toArabicNumber(surat.nomor)}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-lg">{surat.namaLatin}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{surat.arti} • {surat.jumlahAyat} Ayat</div>
            </div>
            <div className="text-2xl font-arabic">{surat.nama}</div>
          </Link>
        ))}
      </div>

      {filteredSurat.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Tidak ditemukan surat yang cocok.
        </div>
      )}
    </div>
  )
}
