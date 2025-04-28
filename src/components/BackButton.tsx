'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/')}
      className="flex items-center gap-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Daftar Surat</span>
    </button>
  )
}
