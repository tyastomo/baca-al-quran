import AyatCard from '@/components/AyatCard'; // pastikan pathnya sesuai
import BackButton from '@/components/BackButton';
import BackToTopButton from '@/components/BackToTopButton';

type Ayat = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: string;
}

type SuratDetail = {
  nama: string;
  namaLatin: string;
  arti: string;
  deskripsi: string;
  ayat: Ayat[];
  suratSebelumnya?: { nomor: number; namaLatin: string };
  suratSelanjutnya?: { nomor: number; namaLatin: string };
  audioFull: {
    '01': string
  };
}

type Tafsir = {
  ayat: number;
  teks: string;
}

async function getSuratDetail(id: string): Promise<SuratDetail> {
  const res = await fetch(`https://equran.id/api/v2/surat/${id}`);
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
  return data.data;
}

async function getTafsir(id: string): Promise<Tafsir[]> {
  const res = await fetch(`https://equran.id/api/v2/tafsir/${id}`);
  if (!res.ok) throw new Error('Failed to fetch tafsir');
  const data = await res.json();
  return data.data.tafsir;
}

export default async function SuratPage({ params }: { params: { id: string } }) {
  const surat = await getSuratDetail(params.id);
  const tafsir = await getTafsir(params.id);

  const cleanHTML = (text: string) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }
  
  const ayatWithTafsir = surat.ayat.map((ayat) => {
    const tafsirAyat = tafsir.find(t => t.ayat === ayat.nomorAyat);
    return { ...ayat, tafsir: tafsirAyat ? tafsirAyat.teks : '' };
  });

  return (
    <div className="space-y-8 sm:p-6 max-w-6xl mx-auto">
      <BackToTopButton />
      <BackButton />
      <div className="flex justify-between items-center mt-10">
        {surat.suratSebelumnya && (
          <a
            href={`/surat/${surat.suratSebelumnya.nomor}`}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
          >
            ← Surat Sebelumnya
          </a>
        )}
        {surat.suratSelanjutnya && (
          <a
            href={`/surat/${surat.suratSelanjutnya.nomor}`}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition ml-auto"
          >
            Surat Selanjutnya →
          </a>
        )}
      </div>
      {/* Header Surat */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold font-arabic dark:text-green-400">{surat.nama}</h2>
        <h3 className="text-2xl font-semibold dark:text-green-400">{surat.namaLatin} ({surat.arti})</h3>
      </div>

      {/* Deskripsi Surat */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border text-justify text-gray-700 dark:text-gray-300 leading-relaxed">
        {cleanHTML(surat.deskripsi)}
        <div className="mt-6 mb-5">
        <audio
          controls
          src={surat?.audioFull['01']}
          className="w-full"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
      </div>

      {/* Ayat-ayat */}
      <div className="space-y-6">
        {ayatWithTafsir.map((ayat) => (
          <AyatCard key={ayat.nomorAyat} ayat={ayat} />
        ))}
      </div>

      {/* Navigasi Surat */}
    </div>
  );
}
