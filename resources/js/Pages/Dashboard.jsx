import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ClockIcon,
    DocumentTextIcon,
    TrophyIcon,
    ChartBarIcon,
    PlayIcon,
    ArrowRightIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Dashboard({ availableTryouts = [], activeSession = null, recentResults = [], stats = { total_tryouts_completed: 0, average_score: 0, total_study_time: 0 } }) {
    return (
        <MainLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                    <div className="relative flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <AcademicCapIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Selamat Datang Kembali!</h1>
                            <p className="text-gray-600 mt-1">Lanjutkan persiapan UTBK kamu hari ini dengan semangat baru.</p>
                        </div>
                    </div>
                </div>

                {/* Active Session Alert */}
                {activeSession && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <PlayIcon className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-amber-900 text-lg">
                                    Ujian Sedang Berlangsung
                                </h3>
                                <p className="text-amber-700">
                                    {activeSession?.tryout_title} - Sisa waktu:{' '}
                                    {Math.floor((activeSession?.remaining_time || 0) / 60)} menit
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('exam.take', activeSession.id)}
                            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
                        >
                            Lanjutkan Ujian
                        </Link>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <DocumentTextIcon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats?.total_tryouts_completed || 0}
                                </p>
                                <p className="text-sm text-gray-500">Tryout Selesai</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                <ChartBarIcon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats?.average_score || 0}%
                                </p>
                                <p className="text-sm text-gray-500">Rata-rata Nilai</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                <ClockIcon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {Math.floor((stats?.total_study_time || 0) / 3600)} jam
                                </p>
                                <p className="text-sm text-gray-500">Waktu Belajar</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Tryouts */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Tryout Tersedia</h2>
                        <Link
                            href={route('tryouts.index')}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 group"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {(availableTryouts || []).length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(availableTryouts || []).map((tryout) => (
                                <TryoutCard key={tryout?.id || Math.random()} tryout={tryout || {}} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-100 p-12 rounded-2xl text-center shadow-sm">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DocumentTextIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">Tidak ada tryout yang tersedia saat ini.</p>
                        </div>
                    )}
                </section>

                {/* Recent Results */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Hasil Terbaru</h2>
                        <Link
                            href={route('history.index')}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 group"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {recentResults.length > 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Tryout
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Skor
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Benar
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Waktu
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {(recentResults || []).map((result) => (
                                        <tr key={result?.id || Math.random()} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">
                                                    {result?.tryout?.title || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${(result?.percentage || 0) >= 70 ? 'bg-emerald-100 text-emerald-800' :
                                                    (result?.percentage || 0) >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {result?.percentage || 0}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {result?.correct_count || 0}/{result?.total_questions || 0}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {result?.time_taken || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {result?.finished_at ? formatDistanceToNow(new Date(result.finished_at), {
                                                    addSuffix: true,
                                                    locale: id,
                                                }) : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route('exam.result', result.id)}
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                                                >
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-100 p-12 rounded-2xl text-center shadow-sm">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrophyIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-4">Belum ada riwayat tryout.</p>
                            <Link href={route('tryouts.index')} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium inline-block shadow-sm transition-all hover:shadow-md">
                                Mulai Tryout Pertama
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </MainLayout>
    );
}

function TryoutCard({ tryout }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                {tryout.thumbnail && (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-lg line-clamp-2 drop-shadow-md">
                        {tryout.title}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                        <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                        {tryout.total_questions} Soal
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        {tryout.duration_minutes} Menit
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <span className="text-gray-500">Percobaan: </span>
                        <span className="font-bold text-gray-900">
                            {tryout.attempts_count}/{tryout.max_attempts}
                        </span>
                    </div>

                    <Link
                        href={route('tryout.show', tryout.slug)}
                        className={`px-5 py-2 rounded-xl font-medium text-sm transition-all shadow-sm ${tryout.can_attempt
                            ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {tryout.can_attempt ? 'Mulai' : 'Lihat'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
