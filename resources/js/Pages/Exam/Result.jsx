import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    TrophyIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ChartBarIcon,
    ArrowLeftIcon,
    ArrowPathIcon,
    BookOpenIcon,
    ShareIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Result({ session, stats, rank, tryout }) {
    const score = session?.percentage || 0;

    const getScoreColor = (percentage) => {
        if (percentage >= 80) return 'text-emerald-600';
        if (percentage >= 60) return 'text-amber-600';
        return 'text-red-600';
    };

    const getScoreBg = (percentage) => {
        if (percentage >= 80) return 'bg-emerald-50 border-emerald-100 text-emerald-700';
        if (percentage >= 60) return 'bg-amber-50 border-amber-100 text-amber-700';
        return 'bg-red-50 border-red-100 text-red-700';
    };

    const getGradient = (percentage) => {
        if (percentage >= 80) return 'from-emerald-500 to-emerald-600';
        if (percentage >= 60) return 'from-amber-500 to-amber-600';
        return 'from-red-500 to-red-600';
    };

    const getGrade = (percentage) => {
        if (percentage >= 90) return { grade: 'A', label: 'Sangat Baik' };
        if (percentage >= 80) return { grade: 'B+', label: 'Baik Sekali' };
        if (percentage >= 70) return { grade: 'B', label: 'Baik' };
        if (percentage >= 60) return { grade: 'C', label: 'Cukup' };
        if (percentage >= 50) return { grade: 'D', label: 'Kurang' };
        return { grade: 'E', label: 'Perlu Belajar Lagi' };
    };

    const grade = getGrade(score);

    return (
        <MainLayout>
            <Head title={`Hasil - ${tryout.title || 'Ujian'}`} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
                        <SparklesIcon className="w-3.5 h-3.5" />
                        Laporan Hasil
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
                        {tryout.title || 'Hasil Ujian'}
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-medium bg-white inline-flex px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span>Diselesaikan pada {session.finished_at ? format(new Date(session.finished_at), 'dd MMMM yyyy, HH:mm', { locale: id }) : '-'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8 mb-8">
                    {/* Hero Score Card */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative group transition-all duration-300">
                            {/* Decorative Background Pattern */}
                            <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${getGradient(score)}`} />
                            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none transform rotate-12">
                                <TrophyIcon className="w-80 h-80 text-gray-900" />
                            </div>

                            <div className="p-6 md:p-12 relative z-10">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
                                    {/* Circular Score */}
                                    <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-500 ease-out">
                                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center bg-white shadow-[0_8px_40px_-10px_rgba(0,0,0,0.1)] border-8 border-gray-50 ring-1 ring-gray-100">
                                            <div className="text-center">
                                                <span className={`block text-5xl md:text-7xl font-black ${getScoreColor(score)} tracking-tighter`}>
                                                    {score}%
                                                </span>
                                                <span className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest mt-1">Nilai Akhir</span>
                                            </div>
                                        </div>
                                        {/* Grade Badge */}
                                        <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-black text-sm md:text-base shadow-lg shadow-gray-200 bg-gradient-to-r ${getGradient(score)} whitespace-nowrap border-4 border-white`}>
                                            Grade {grade.grade}
                                        </div>
                                    </div>

                                    {/* Text & Stats */}
                                    <div className="text-center md:text-left max-w-lg">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                                            {grade.label}
                                        </h2>
                                        <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-lg">
                                            {score >= 60
                                                ? "Kerja bagus! Kamu telah menyelesaikan ujian ini dengan hasil yang positif. Evaluasi kembali jawabanmu untuk memahami materi lebih dalam."
                                                : "Jangan berkecil hati. Jadikan hasil ini sebagai bahan evaluasi untuk mengidentifikasi area yang perlu ditingkatkan. Semangat belajar!"}
                                        </p>

                                        <div className="grid grid-cols-3 gap-3 md:gap-6">
                                            <div className="flex flex-col items-center p-3 md:p-5 bg-emerald-50/80 rounded-2xl border border-emerald-100 transition-colors">
                                                <span className="text-2xl md:text-3xl font-black text-emerald-600 mb-1">{stats.correct}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                                                    <span className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase tracking-wider">Benar</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center p-3 md:p-5 bg-red-50/80 rounded-2xl border border-red-100 transition-colors">
                                                <span className="text-2xl md:text-3xl font-black text-red-600 mb-1">{stats.incorrect}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <XCircleIcon className="w-3.5 h-3.5 text-red-600" />
                                                    <span className="text-[10px] md:text-xs font-bold text-red-700 uppercase tracking-wider">Salah</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center p-3 md:p-5 bg-gray-50/80 rounded-2xl border border-gray-100 transition-colors">
                                                <span className="text-2xl md:text-3xl font-black text-gray-600 mb-1">{stats.unanswered}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <BookOpenIcon className="w-3.5 h-3.5 text-gray-500" />
                                                    <span className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-wider">Kosong</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rank Card */}
                    {rank && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 h-full hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <ChartBarIcon className="w-24 h-24 text-indigo-600" />
                                </div>

                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                        <ChartBarIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight">Peringkat Global</h3>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">Posisi saat ini</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
                                    <div className="text-6xl font-black text-indigo-600 mb-2 tracking-tighter">
                                        <span className="text-4xl align-top opacity-50 mr-1">#</span>{rank.position}
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                                        dari {rank.total} Peserta
                                    </div>
                                </div>

                                <Link
                                    href={route('leaderboard.show', tryout.slug)}
                                    className="mt-8 flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all group/btn shadow-sm relative z-10"
                                >
                                    Lihat Leaderboard
                                    <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Duration Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 h-full hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ClockIcon className="w-24 h-24 text-blue-600" />
                            </div>

                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                    <ClockIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">Waktu Pengerjaan</h3>
                                    <p className="text-xs font-medium text-gray-500 mt-0.5">Durasi pengerjaan</p>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
                                <div className="text-6xl font-black text-blue-600 mb-2 tracking-tighter">
                                    {stats.duration}
                                </div>
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                    Menit
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-3 text-xs relative z-10">
                                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                                    <span className="block text-gray-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Mulai</span>
                                    <span className="font-bold text-gray-900 text-sm">{session.started_at ? format(new Date(session.started_at), 'HH:mm', { locale: id }) : '-'}</span>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                                    <span className="block text-gray-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Selesai</span>
                                    <span className="font-bold text-gray-900 text-sm">{session.finished_at ? format(new Date(session.finished_at), 'HH:mm', { locale: id }) : '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Violations (Conditional) */}
                    {session.total_violations > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-red-50 rounded-3xl border border-red-100 p-6 md:p-8 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <XCircleIcon className="w-24 h-24 text-red-600" />
                                </div>
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
                                        <XCircleIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-red-900 text-lg leading-tight">Pelanggaran</h3>
                                        <p className="text-xs font-medium text-red-600/80 mt-0.5">Integritas ujian</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
                                    <div className="text-6xl font-black text-red-600 mb-2 tracking-tighter">
                                        {session.total_violations}
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100/50 text-red-700 text-xs font-bold border border-red-200/50">
                                        Kali Terdeteksi
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Performance Analysis */}
                {stats.categories && stats.categories.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-10 overflow-hidden relative">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gray-50 rounded-full opacity-50 blur-3xl"></div>

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="font-bold text-xl md:text-2xl text-gray-900">Analisis Performa Topik</h3>
                                <p className="text-sm text-gray-500 mt-1">Detail kemampuan berdasarkan kategori soal</p>
                            </div>
                            <span className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200">
                                {stats.categories.length} Kategori
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                            {stats.categories.map((cat) => (
                                <div key={cat.id} className="group">
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="font-bold text-gray-700 group-hover:text-indigo-700 transition-colors flex items-center gap-2">
                                            {cat.name}
                                        </span>
                                        <div className="text-right">
                                            <span className={`text-xl font-black ${getScoreColor(cat.percentage)}`}>
                                                {cat.percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner ring-1 ring-gray-200/50">
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r ${getGradient(cat.percentage)} transition-all duration-1000 ease-out relative overflow-hidden`}
                                            style={{ width: `${cat.percentage}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-2.5 text-xs font-medium text-gray-400 group-hover:text-gray-500 transition-colors">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-400 transition-colors"></span>
                                            Benar: {cat.correct} dari {cat.total}
                                        </span>
                                        <span className={`${getScoreColor(cat.percentage)} bg-white px-2 py-0.5 rounded-md shadow-sm border border-gray-100`}>
                                            {cat.percentage >= 75 ? 'Sangat Baik' : cat.percentage >= 50 ? 'Cukup' : 'Perlu Tingkatkan'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 z-30 md:static md:bg-transparent md:border-none md:p-0">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
                        <Link
                            href={route('dashboard')}
                            className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-6 py-3.5 rounded-xl font-bold shadow-sm hover:shadow hover:-translate-y-0.5 transition-all flex items-center justify-center order-2 sm:order-1"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Dashboard
                        </Link>

                        {tryout.allow_review && (
                            <Link
                                href={route('exam.review', session.id)}
                                className="btn bg-blue-600 text-white hover:bg-blue-700 border border-transparent px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center order-1 sm:order-2 flex-1 sm:flex-none"
                            >
                                <BookOpenIcon className="w-5 h-5 mr-2" />
                                Lihat Pembahasan
                            </Link>
                        )}

                        {tryout.can_attempt && (
                            <Link
                                href={route('tryout.show', tryout.slug)}
                                className="btn bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center order-3 sm:order-3"
                            >
                                <ArrowPathIcon className="w-5 h-5 mr-2" />
                                Ulangi Ujian
                            </Link>
                        )}
                    </div>
                </div>
                {/* Spacer for mobile fixed bottom bar */}
                <div className="h-20 md:hidden"></div>
            </div>
        </MainLayout>
    );
}
