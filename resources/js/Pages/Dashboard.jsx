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

export default function Dashboard({ availableTryouts, activeSession, recentResults, stats }) {
    return (
        <MainLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-red-600/10 to-red-800/10 border border-gray-800/50">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 glass-dark rounded-2xl flex items-center justify-center">
                            <AcademicCapIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white">Selamat Datang Kembali!</h1>
                            <p className="text-gray-400">Lanjutkan persiapan UTBK kamu hari ini</p>
                        </div>
                    </div>
                </div>

                {/* Active Session Alert */}
                {activeSession && (
                    <div className="glass-card bg-amber-50/80 border border-amber-200/50 rounded-2xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center bg-amber-100/80">
                                <PlayIcon className="w-7 h-7 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-amber-900 text-lg">
                                    Ujian Sedang Berlangsung
                                </h3>
                                <p className="text-amber-700">
                                    {activeSession.tryout_title} - Sisa waktu:{' '}
                                    {Math.floor(activeSession.remaining_time / 60)} menit
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('exam.take', activeSession.id)}
                            className="btn-primary px-6 py-3 rounded-xl font-semibold bg-amber-500 hover:bg-amber-600"
                        >
                            Lanjutkan Ujian
                        </Link>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-2xl hover:shadow-red-glow transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/50 group-hover:scale-110 transition-transform">
                                <DocumentTextIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white">
                                    {stats.total_tryouts_completed}
                                </p>
                                <p className="text-sm text-gray-400">Tryout Selesai</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl hover:shadow-red-glow transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:scale-110 transition-transform">
                                <ChartBarIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white">
                                    {stats.average_score}%
                                </p>
                                <p className="text-sm text-gray-400">Rata-rata Nilai</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl hover:shadow-red-glow transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center shadow-lg shadow-red-700/50 group-hover:scale-110 transition-transform">
                                <ClockIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white">
                                    {Math.floor(stats.total_study_time / 3600)} jam
                                </p>
                                <p className="text-sm text-gray-400">Waktu Belajar</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Tryouts */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-white">Tryout Tersedia</h2>
                        <Link
                            href={route('tryouts.index')}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 group"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {availableTryouts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {availableTryouts.map((tryout) => (
                                <TryoutCard key={tryout.id} tryout={tryout} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-12 rounded-2xl text-center">
                            <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-4">
                                <DocumentTextIcon className="w-10 h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-400">Tidak ada tryout yang tersedia saat ini.</p>
                        </div>
                    )}
                </section>

                {/* Recent Results */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-white">Hasil Terbaru</h2>
                        <Link
                            href={route('history.index')}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 group"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {recentResults.length > 0 ? (
                        <div className="glass-card rounded-2xl overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-950/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Tryout
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Skor
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Benar
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Waktu
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {recentResults.map((result) => (
                                        <tr key={result.id} className="hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white">
                                                    {result.tryout.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${result.percentage >= 70 ? 'bg-emerald-100 text-emerald-700' :
                                                    result.percentage >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {result.percentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">
                                                {result.correct_count}/{result.total_questions}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">
                                                {result.time_taken}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">
                                                {formatDistanceToNow(new Date(result.finished_at), {
                                                    addSuffix: true,
                                                    locale: id,
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route('exam.result', result.id)}
                                                    className="text-red-500 hover:text-red-400 text-sm font-bold"
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
                        <div className="glass-card p-12 rounded-2xl text-center">
                            <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrophyIcon className="w-10 h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-400 mb-4">Belum ada riwayat tryout.</p>
                            <Link href={route('tryouts.index')} className="btn-primary px-6 py-3 rounded-xl inline-block">
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
        <div className="glass-card rounded-2xl overflow-hidden group hover:shadow-red-glow transition-all duration-300 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="h-44 bg-gradient-to-br from-red-600 to-red-800 relative overflow-hidden">
                {tryout.thumbnail && (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-black text-white text-lg line-clamp-2 drop-shadow-lg">
                        {tryout.title}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-lg">
                        <DocumentTextIcon className="w-4 h-4" />
                        {tryout.total_questions} Soal
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-lg">
                        <ClockIcon className="w-4 h-4" />
                        {tryout.duration_minutes} Menit
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <span className="text-gray-500">Percobaan: </span>
                        <span className="font-bold text-white">
                            {tryout.attempts_count}/{tryout.max_attempts}
                        </span>
                    </div>

                    <Link
                        href={route('exam.show', tryout.slug)}
                        className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${tryout.can_attempt
                            ? 'btn-primary'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {tryout.can_attempt ? 'Mulai' : 'Lihat'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
