import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { 
    ClockIcon, 
    DocumentTextIcon, 
    TrophyIcon,
    ChartBarIcon,
    PlayIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Dashboard({ availableTryouts, activeSession, recentResults, stats }) {
    return (
        <MainLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Active Session Alert */}
                {activeSession && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <PlayIcon className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-amber-900">
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
                            className="btn btn-warning"
                        >
                            Lanjutkan
                        </Link>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card card-body">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.total_tryouts_completed}
                                </p>
                                <p className="text-sm text-gray-600">Tryout Selesai</p>
                            </div>
                        </div>
                    </div>

                    <div className="card card-body">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <ChartBarIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.average_score}%
                                </p>
                                <p className="text-sm text-gray-600">Rata-rata Nilai</p>
                            </div>
                        </div>
                    </div>

                    <div className="card card-body">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <ClockIcon className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.floor(stats.total_study_time / 3600)} jam
                                </p>
                                <p className="text-sm text-gray-600">Waktu Belajar</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Tryouts */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Tryout Tersedia</h2>
                        <Link
                            href={route('tryouts.index')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>

                    {availableTryouts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {availableTryouts.map((tryout) => (
                                <TryoutCard key={tryout.id} tryout={tryout} />
                            ))}
                        </div>
                    ) : (
                        <div className="card card-body text-center py-12">
                            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Tidak ada tryout yang tersedia saat ini.</p>
                        </div>
                    )}
                </section>

                {/* Recent Results */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Hasil Terbaru</h2>
                        <Link
                            href={route('history.index')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>

                    {recentResults.length > 0 ? (
                        <div className="card overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tryout
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Skor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Benar
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Waktu
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentResults.map((result) => (
                                        <tr key={result.id}>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {result.tryout.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`font-semibold ${
                                                    result.percentage >= 70 ? 'text-emerald-600' :
                                                    result.percentage >= 50 ? 'text-amber-600' : 'text-red-600'
                                                }`}>
                                                    {result.percentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {result.correct_count}/{result.total_questions}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {result.time_taken}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {formatDistanceToNow(new Date(result.finished_at), {
                                                    addSuffix: true,
                                                    locale: id,
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={route('exam.result', result.id)}
                                                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
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
                        <div className="card card-body text-center py-12">
                            <TrophyIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Belum ada riwayat tryout.</p>
                            <Link href={route('tryouts.index')} className="btn btn-primary mt-4">
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
        <div className="card overflow-hidden group hover:shadow-lg transition-shadow">
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                {tryout.thumbnail && (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-white text-lg line-clamp-2">
                        {tryout.title}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <DocumentTextIcon className="w-4 h-4" />
                        {tryout.total_questions} Soal
                    </div>
                    <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {tryout.duration_minutes} Menit
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <span className="text-gray-600">Percobaan: </span>
                        <span className="font-medium">
                            {tryout.attempts_count}/{tryout.max_attempts}
                        </span>
                    </div>

                    <Link
                        href={route('exam.show', tryout.slug)}
                        className={`btn btn-sm ${tryout.can_attempt ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        {tryout.can_attempt ? 'Mulai' : 'Lihat'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
