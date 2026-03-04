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

export default function Dashboard({ auth, availableTryouts = [], activeSession = null, recentResults = [], stats = { total_tryouts_completed: 0, average_score: 0, total_study_time: 0 } }) {
    // Safe access to stats to avoid NaN
    const totalStudyTime = stats?.total_study_time || 0;
    const studyHours = Math.floor(totalStudyTime / 3600);

    // Safe access for active session time
    const remainingTime = activeSession?.remaining_time || 0;
    const remainingMinutes = Math.floor(remainingTime / 60);

    return (
        <MainLayout title="Dashboard" isFullWidth={true}>
            <Head title="Dashboard" />

            {/* Hero Section (Full Width, Emerald Background) */}
            <div className="w-full bg-emerald-800 pb-24 md:pb-32 pt-10 md:pt-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-[28px] font-bold text-white mb-2 md:mb-3 tracking-tight">
                        Selamat datang {auth?.user?.name}!
                    </h1>
                    <p className="text-emerald-100 text-sm md:text-base">
                        Semoga aktivitas belajarmu menyenangkan.
                    </p>
                </div>
            </div>

            {/* Overlapping Content Box (Status Langganan/Tryout) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10 mb-8 md:mb-10">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
                    <h2 className="text-[15px] font-bold text-gray-800 mb-5 border-b border-gray-100 pb-3">Status Aktivitas</h2>

                    {activeSession ? (
                        <div className="border border-amber-200 bg-amber-50/50 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-gray-900 font-semibold mb-1">Anda memiliki ujian yang sedang berlangsung: {activeSession?.tryout_title}</h3>
                                <p className="text-gray-500 text-sm">Segera selesaikan sebelum waktu habis. Sisa waktu Anda: <span className="font-bold text-amber-600 font-mono">{remainingMinutes} menit</span></p>
                            </div>
                            <Link href={route('exam.take', activeSession.id)} className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-sm font-semibold whitespace-nowrap transition-colors">
                                Lanjutkan ujian
                            </Link>
                        </div>
                    ) : (
                        <div className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-gray-500 text-sm">
                                Anda belum memiliki aktivitas ujian yang sedang berlangsung. Pilih paket tryout yang tersedia dan mulailah perjalanan Anda meraih kampus impian.
                            </p>
                            <div className="flex gap-3">
                                <Link href={route('tryouts.index')} className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-sm font-semibold whitespace-nowrap transition-colors">
                                    Lihat Paket Tryout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Grid Content (2 Columns Asymmetrical) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Left Column (Aktivitas Belajar / Available Tryouts) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <DocumentTextIcon className="w-5 h-5 text-gray-500" />
                                <h2 className="text-[15px] font-bold text-gray-800">Aktivitas Belajar (Tryout)</h2>
                            </div>

                            <div className="p-6">
                                {(availableTryouts || []).length > 0 ? (
                                    <div className="space-y-4">
                                        {(availableTryouts || []).map((tryout) => (
                                            <div key={tryout?.id || Math.random()} className="border border-gray-200 rounded-lg p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors group">
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 mb-1">Tryout Tersedia • {tryout.total_questions} Soal</p>
                                                    <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                        {tryout.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Kesempatan: {tryout.attempts_count}/{tryout.max_attempts} • Durasi: {tryout.duration_minutes} Menit
                                                    </p>
                                                </div>
                                                <Link
                                                    href={route('tryout.show', tryout.slug)}
                                                    className={`px-6 py-2 rounded text-sm font-semibold transition-colors shrink-0 ${tryout.can_attempt
                                                        ? 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
                                                        : 'text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {tryout.can_attempt ? 'Mulai' : 'Lihat'}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-sm text-gray-500">Belum ada aktivitas tryout.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Aktivitas Lain / Stats & History) */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <ChartBarIcon className="w-5 h-5 text-gray-500" />
                                <h2 className="text-[15px] font-bold text-gray-800">Capaian Anda</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded text-emerald-600 flex items-center justify-center shrink-0">
                                        <DocumentTextIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 mb-0.5">Total Tryout Selesai</p>
                                        <p className="text-lg font-bold text-gray-900">{stats?.total_tryouts_completed || 0} Paket</p>
                                    </div>
                                </div>
                                <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded text-amber-600 flex items-center justify-center shrink-0">
                                        <ChartBarIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 mb-0.5">Rata-rata Nilai</p>
                                        <p className="text-lg font-bold text-gray-900">{stats?.average_score || 0}%</p>
                                    </div>
                                </div>
                                <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded text-amber-600 flex items-center justify-center shrink-0">
                                        <ClockIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 mb-0.5">Waktu Belajar</p>
                                        <p className="text-lg font-bold text-gray-900">{studyHours} Jam</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent History Box */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                <ClipboardDocumentListIcon className="w-5 h-5 text-gray-500" />
                                <h2 className="text-[15px] font-bold text-gray-800">Riwayat Terakhir</h2>
                            </div>
                            <div className="p-6">
                                {recentResults.length > 0 ? (
                                    <div className="space-y-4">
                                        {(recentResults || []).slice(0, 3).map((result) => (
                                            <div key={result?.id || Math.random()} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{result?.tryout?.title}</h3>
                                                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold ${(result?.percentage || 0) >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                        {result?.percentage || 0}%
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs text-gray-500">
                                                    <span>{result?.correct_count || 0}/{result?.total_questions || 0} Benar</span>
                                                    <Link href={route('exam.result', result.id)} className="text-emerald-600 font-semibold hover:underline">Detail</Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-gray-500">Belum ada riwayat.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}

function TryoutCard({ tryout }) {
    const getStatusBadge = () => {
        if (tryout.status === 'upcoming') {
            return (
                <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] md:text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    Akan Datang
                </span>
            );
        }
        if (tryout.status === 'ended') {
            return (
                <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] md:text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                    Berakhir
                </span>
            );
        }
        if (tryout.status === 'active' || !tryout.status) {
            return (
                <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] md:text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1 animate-pulse"></span>
                    Aktif
                </span>
            );
        }
        return null;
    };


    return (
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col h-full relative">
            {/* Minimalist Top Edge or Mini Thumbnail */}
            {tryout.thumbnail && (
                <div className="h-32 w-full overflow-hidden relative">
                    <img
                        src={`/storage/${tryout.thumbnail}`}
                        alt={tryout.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                        {getStatusBadge()}
                    </div>
                </div>
            )}

            {/* Content flex-1 pushing elements gracefully */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100/50">
                        <DocumentTextIcon className="w-5 h-5" />
                    </div>
                    {!tryout.thumbnail && (
                        <div>
                            {getStatusBadge()}
                        </div>
                    )}
                </div>

                {tryout.categories && tryout.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {tryout.categories.slice(0, 2).map((cat) => (
                            <span
                                key={cat.id}
                                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gray-50 text-gray-500 border border-gray-100"
                            >
                                {cat.name}
                            </span>
                        ))}
                    </div>
                )}

                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-4 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {tryout.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <ClipboardDocumentListIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.total_questions} Soal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span>{tryout.duration_minutes} Menit</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <span className="text-gray-900 font-bold">{tryout.attempts_count}/{tryout.max_attempts}</span> Selesai
                    </div>

                    <Link
                        href={route('tryout.show', tryout.slug)}
                        className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 group/btn ${tryout.can_attempt
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {tryout.can_attempt ? 'Mulai' : 'Lihat'}
                        {tryout.can_attempt && <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />}
                    </Link>
                </div>
            </div>
        </div>
    );
}
