import { Link } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import MainLayout from '@/Layouts/MainLayout';

export default function Error({ status }) {
    const title = {
        503: 'Layanan Tidak Tersedia',
        500: 'Server Error',
        404: 'Halaman Tidak Ditemukan',
        403: 'Akses Ditolak',
    }[status] || 'Error';

    const description = {
        503: 'Maaf, kami sedang melakukan pemeliharaan. Silakan coba lagi nanti.',
        500: 'Terjadi kesalahan pada server. Tim kami sedang menangani masalah ini.',
        404: 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.',
        403: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
    }[status] || 'Terjadi kesalahan yang tidak diketahui.';

    return (
        <MainLayout>
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ExclamationTriangleIcon className="w-12 h-12 text-red-600" />
                    </div>
                    
                    <h1 className="text-6xl font-bold text-gray-900 mb-2">{status}</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
                    <p className="text-gray-600 mb-8">{description}</p>
                    
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => window.history.back()}
                            className="btn btn-secondary"
                        >
                            Kembali
                        </button>
                        <Link href="/" className="btn btn-primary">
                            Ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
