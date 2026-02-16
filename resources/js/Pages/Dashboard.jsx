import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ClockIcon,
    DocumentTextIcon,
    ChartBarIcon,
    PlayIcon,
    ArrowRightIcon,
    SparklesIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Dashboard({ availableTryouts = [], activeSession = null, recentResults = [], stats = { total_tryouts_completed: 0, average_score: 0, total_study_time: 0 } }) {
    // Safe access to stats to avoid NaN
    const totalStudyTime = stats?.total_study_time || 0;
    const studyHours = Math.floor(totalStudyTime / 3600);

    // Safe access for active session time
    const remainingTime = activeSession?.remaining_time || 0;
    const remainingMinutes = Math.floor(remainingTime / 60);

    return (
        <MainLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-6 md:space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="bg-indigo-600 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-xl shadow-indigo-200 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="relative z-10 w-full max-w-2xl">
                        <h1 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4 tracking-tight leading-tight">
                            Selamat Datang Kembali!
                        </h1>
                        <p className="text-indigo-100 text-sm md:text-lg leading-relaxed">
                            Lanjutkan persiapan UTBK kamu hari ini dengan semangat baru.
                        </p>
                    </div>

                    {/* Decoration/Icon - Hidden on mobile, visible on medium screens and up */}
                    <div className="relative z-10 hidden md:block opacity-20 transform rotate-12 flex-shrink-0">
                        <SparklesIcon className="w-32 h-32 md:w-48 md:h-48 text-white" />
                    </div>
                </div>

                {/* Active Session Alert */}
                {activeSession && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between shadow-sm gap-4 md:gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left w-full md:w-auto">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <PlayIcon className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-900 text-base md:text-lg">
                                    Ujian Sedang Berlangsung
                                </h3>
                                <p className="text-amber-700 text-sm md:text-base">
                                    {activeSession?.tryout_title} - Sisa waktu:{' '}
                                    <span className="font-mono font-bold">
                                        {remainingMinutes} menit
                                    </span>
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('exam.take', activeSession.id)}
                            className="w-full md:w-auto px-6 py-2.5 md:px-8 md:py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg shadow-amber-200 hover:-translate-y-0.5 text-center text-sm md:text-base"
                        >
                            Lanjutkan Ujian
                        </Link>
                    </div>
                )}

                {/* Stats Grid - 3 Columns on Mobile as requested */}
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                    <div className="bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col items-center justify-center text-center aspect-square md:aspect-auto">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 mb-2 md:mb-0 md:mr-4">
                            <DocumentTextIcon className="w-5 h-5 md:w-7 md:h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="md:text-left">
                            <p className="text-lg md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {stats?.total_tryouts_completed || 0}
                            </p>
                            <p className="text-[10px] md:text-sm font-medium text-gray-500 leading-tight">Tryout Selesai</p>
                        </div>
                    </div>

                    <div className="bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col items-center justify-center text-center aspect-square md:aspect-auto">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300 mb-2 md:mb-0 md:mr-4">
                            <ChartBarIcon className="w-5 h-5 md:w-7 md:h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="md:text-left">
                            <p className="text-lg md:text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                {stats?.average_score || 0}%
                            </p>
                            <p className="text-[10px] md:text-sm font-medium text-gray-500 leading-tight">Rata-rata Nilai</p>
                        </div>
                    </div>

                    <div className="bg-white p-3 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col items-center justify-center text-center aspect-square md:aspect-auto">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300 mb-2 md:mb-0 md:mr-4">
                            <ClockIcon className="w-5 h-5 md:w-7 md:h-7 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="md:text-left">
                            <p className="text-lg md:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {studyHours} jam
                            </p>
                            <p className="text-[10px] md:text-sm font-medium text-gray-500 leading-tight">Waktu Belajar</p>
                        </div>
                    </div>
                </div>

                {/* Available Tryouts */}
                <section>
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Tryout Tersedia</h2>
                        <Link
                            href={route('tryouts.index')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold flex items-center gap-1 group bg-indigo-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl hover:bg-indigo-100 transition-colors"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {(availableTryouts || []).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {(availableTryouts || []).map((tryout) => (
                                <TryoutCard key={tryout?.id || Math.random()} tryout={tryout || {}} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border-2 border-dashed border-gray-100 p-8 md:p-12 rounded-3xl text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <DocumentTextIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Belum Ada Tryout</h3>
                            <p className="text-gray-500 text-sm md:text-base">Tidak ada tryout yang tersedia untukmu saat ini.</p>
                        </div>
                    )}
                </section>

                {/* Recent Results */}
                <section>
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Hasil Terbaru</h2>
                        <Link
                            href={route('history.index')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold flex items-center gap-1 group bg-indigo-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl hover:bg-indigo-100 transition-colors"
                        >
                            Lihat Semua
                            <ArrowRightIcon className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {recentResults.length > 0 ? (
                        <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50/50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 md:px-8 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Tryout
                                            </th>
                                            <th className="px-6 py-4 md:px-8 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Skor
                                            </th>
                                            <th className="px-6 py-4 md:px-8 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Benar
                                            </th>
                                            <th className="px-6 py-4 md:px-8 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Waktu
                                            </th>
                                            <th className="px-6 py-4 md:px-8 md:py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-4 md:px-8 md:py-5"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {(recentResults || []).map((result) => (
                                            <tr key={result?.id || Math.random()} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4 md:px-8 md:py-5">
                                                    <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm md:text-base whitespace-nowrap">
                                                        {result?.tryout?.title || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 md:px-8 md:py-5">
                                                    <span className={`inline-flex items-center px-2.5 py-1 md:px-3 rounded-lg text-xs font-bold ${(result?.percentage || 0) >= 70 ? 'bg-emerald-100 text-emerald-700' :
                                                        (result?.percentage || 0) >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {result?.percentage || 0}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 md:px-8 md:py-5 text-gray-600 font-medium text-sm whitespace-nowrap">
                                                    {result?.correct_count || 0}/{result?.total_questions || 0}
                                                </td>
                                                <td className="px-6 py-4 md:px-8 md:py-5 text-gray-600 font-medium text-sm whitespace-nowrap">
                                                    {result?.time_taken || '-'}
                                                </td>
                                                <td className="px-6 py-4 md:px-8 md:py-5 text-gray-600 text-sm whitespace-nowrap">
                                                    {result?.finished_at ? formatDistanceToNow(new Date(result.finished_at), {
                                                        addSuffix: true,
                                                        locale: id,
                                                    }) : '-'}
                                                </td>
                                                <td className="px-6 py-4 md:px-8 md:py-5 text-right whitespace-nowrap">
                                                    <Link
                                                        href={route('exam.result', result.id)}
                                                        className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold hover:underline"
                                                    >
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border-2 border-dashed border-gray-100 p-8 md:p-12 rounded-3xl text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <SparklesIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-4 md:mb-6 font-medium text-sm md:text-base">Belum ada riwayat tryout. Yuk mulai latihan!</p>
                            <Link href={route('tryouts.index')} className="px-6 py-2.5 md:px-8 md:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold inline-block shadow-md hover:shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 text-sm md:text-base">
                                Mulai Tryout Sekarang
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </MainLayout>
    );
}

function TryoutCard({ tryout }) {
    const getStatusBadge = () => {
        if (tryout.status === 'upcoming') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    Akan Datang
                </span>
            );
        }
        if (tryout.status === 'ended') {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                    Berakhir
                </span>
            );
        }
        if (tryout.status === 'active' || !tryout.status) { // Default to active if status is missing/null but tryout appears
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                    Aktif
                </span>
            );
        }
        return null;
    };


    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
            {/* Thumbnail */}
            <div className="h-40 md:h-48 bg-indigo-50 relative overflow-hidden group-hover:bg-indigo-100/50 transition-colors">
                {tryout.thumbnail ? (
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <DocumentTextIcon className="w-12 h-12 md:w-16 md:h-16 text-indigo-200" />
                    </div>
                )}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    {getStatusBadge()}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex flex-col flex-1">
                {/* Categories - Updated to handle if categories is missing/undefined */}
                {tryout.categories && tryout.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
                        {tryout.categories.slice(0, 2).map((cat) => (
                            <span
                                key={cat.id}
                                className="px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gray-50 text-gray-600 border border-gray-100"
                            >
                                {cat.name}
                            </span>
                        ))}
                    </div>
                )}

                <h3 className="font-bold text-gray-900 text-base md:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {tryout.title}
                </h3>

                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-4 md:mb-6 mt-auto pt-3 md:pt-4">
                    <div className="flex items-center gap-1 md:gap-1.5">
                        <ClipboardDocumentListIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                        <span>{tryout.total_questions} Soal</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5">
                        <ClockIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                        <span>{tryout.duration_minutes} Menit</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    {/* Attempts count if available */}
                    <div className="text-[10px] md:text-xs font-medium text-gray-500 bg-gray-50 px-2 md:px-2.5 py-1 md:py-1.5 rounded-lg border border-gray-100">
                        Percobaan: <span className="text-gray-900">{tryout.attempts_count}/{tryout.max_attempts}</span>
                    </div>


                    <Link
                        href={route('tryout.show', tryout.slug)}
                        className={`flex-1 py-2 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all flex items-center justify-center gap-2 group/btn ${tryout.can_attempt
                            ? 'bg-white border border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100' // Disabled style
                            }`}
                    >
                        {tryout.can_attempt ? 'Mulai' : 'Lihat'}
                        {tryout.can_attempt && <ArrowRightIcon className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-0.5 transition-transform" />}
                    </Link>
                </div>
            </div>
        </div>
    );
}
