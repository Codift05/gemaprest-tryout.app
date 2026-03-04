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
    ArrowRightIcon,
    ExclamationCircleIcon
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
        <MainLayout isFullWidth={true}>
            <Head title={`Hasil - ${tryout.title || 'Ujian'}`} />

            {/* Full-width Emerald Header */}
            <div className="bg-emerald-800 pt-10 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            {tryout.title || 'Hasil Ujian'}
                        </h1>
                        <div className="inline-flex items-center gap-2 text-emerald-100/90 text-sm font-medium bg-emerald-900/40 px-4 py-2 rounded-full border border-emerald-700/50 backdrop-blur-sm">
                            <ClockIcon className="w-4 h-4" />
                            <span>{session.finished_at ? format(new Date(session.finished_at), 'dd MMM yyyy, HH:mm', { locale: id }) : '-'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 -mt-20 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                    {/* Hero Score Card */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden relative">
                            {/* Decorative Top Border Line instead of full background gradient */}
                            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${getGradient(score)}`} />

                            <div className="p-6 sm:p-10 md:p-12">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                                    {/* Circular Score */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center bg-white shadow-sm border-[6px] border-gray-50 ring-1 ring-gray-100">
                                            <div className="text-center">
                                                <span className={`block text-5xl md:text-7xl font-black ${getScoreColor(score)} tracking-tighter`}>
                                                    {score}%
                                                </span>
                                                <span className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Nilai Akhir</span>
                                            </div>
                                        </div>
                                        {/* Grade Badge */}
                                        <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-black text-sm shadow-md bg-gradient-to-r ${getGradient(score)} whitespace-nowrap`}>
                                            Grade {grade.grade}
                                        </div>
                                    </div>

                                    {/* Text & Stats */}
                                    <div className="text-center md:text-left max-w-lg">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                                            {grade.label}
                                        </h2>
                                        <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base">
                                            {score >= 60
                                                ? "Kerja bagus! Kamu telah menyelesaikan ujian ini dengan hasil yang positif. Evaluasi kembali jawabanmu untuk memahami materi lebih dalam."
                                                : "Jangan berkecil hati. Jadikan hasil ini sebagai bahan evaluasi untuk mengidentifikasi area yang perlu ditingkatkan. Semangat belajar!"}
                                        </p>

                                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                                            <div className="flex flex-col items-center p-3 md:p-4 bg-emerald-50 rounded-xl border border-emerald-100/50 transition-colors hover:bg-emerald-100/50">
                                                <span className="text-2xl font-black text-emerald-600 mb-1">{stats.correct}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                                                    <span className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase tracking-wider">Benar</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center p-3 md:p-4 bg-red-50 rounded-xl border border-red-100/50 transition-colors hover:bg-red-100/50">
                                                <span className="text-2xl font-black text-red-600 mb-1">{stats.incorrect}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <XCircleIcon className="w-3.5 h-3.5 text-red-600" />
                                                    <span className="text-[10px] md:text-xs font-bold text-red-700 uppercase tracking-wider">Salah</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-gray-100/80">
                                                <span className="text-2xl font-black text-gray-600 mb-1">{stats.unanswered}</span>
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
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 h-full hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-5 transition-opacity pointer-events-none">
                                    <TrophyIcon className="w-24 h-24 text-emerald-600" />
                                </div>

                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                                        <TrophyIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight">Peringkat Global</h3>
                                        <p className="text-[11px] font-medium text-gray-500 mt-0.5 uppercase tracking-wider">Posisimu</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
                                    <div className="text-5xl font-black text-emerald-600 mb-3 tracking-tighter">
                                        <span className="text-3xl align-top opacity-50 mr-1">#</span>{rank.position}
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-50 text-gray-600 text-xs font-bold border border-gray-200/80">
                                        dari {rank.total} Peserta
                                    </div>
                                </div>

                                <Link
                                    href={route('leaderboard.show', tryout.slug)}
                                    className="mt-6 flex items-center justify-center w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-emerald-700 hover:border-gray-300 transition-all text-sm font-semibold group/btn"
                                >
                                    Leaderboard
                                    <ArrowRightIcon className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Duration Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 h-full hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 border border-gray-100">
                                    <ClockIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">Waktu Pengerjaan</h3>
                                    <p className="text-[11px] font-medium text-gray-500 mt-0.5 uppercase tracking-wider">Durasi Asli</p>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
                                <div className="text-5xl font-black text-gray-800 mb-3 tracking-tighter">
                                    {stats.duration}
                                </div>
                                <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-50 text-gray-600 text-xs font-bold border border-gray-200/80">
                                    Menit
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3 text-xs relative z-10">
                                <div className="bg-gray-50/80 rounded-lg p-3 text-center border border-gray-100">
                                    <span className="block text-gray-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Mulai</span>
                                    <span className="font-bold text-gray-900 text-sm">{session.started_at ? format(new Date(session.started_at), 'HH:mm', { locale: id }) : '-'}</span>
                                </div>
                                <div className="bg-gray-50/80 rounded-lg p-3 text-center border border-gray-100">
                                    <span className="block text-gray-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Selesai</span>
                                    <span className="font-bold text-gray-900 text-sm">{session.finished_at ? format(new Date(session.finished_at), 'HH:mm', { locale: id }) : '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Violations Card */}
                    {session.total_violations > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-6 md:p-8 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                                    <XCircleIcon className="w-24 h-24 text-red-600" />
                                </div>
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 border border-red-100 shadow-sm">
                                        <ExclamationCircleIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-red-900 text-lg leading-tight">Pelanggaran</h3>
                                        <p className="text-[11px] font-medium text-red-600/80 mt-0.5 uppercase tracking-wider">Integritas</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
                                    <div className="text-5xl font-black text-red-600 mb-2 tracking-tighter">
                                        {session.total_violations}
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-red-100/50 text-red-700 text-xs font-bold border border-red-200/50 mt-1">
                                        Peringatan
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Performance Analysis section (using Dicoding clean styling) */}
                {stats.categories && stats.categories.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 md:p-8 mb-8 relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h3 className="font-bold text-xl text-gray-900">Analisis Performa Topik</h3>
                                <p className="text-sm text-gray-500 mt-1">Detail kemampuan berdasarkan kategori soal yang diujikan.</p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-50 text-gray-600 text-[11px] uppercase tracking-wider font-bold border border-gray-200/80 shrink-0 self-start sm:self-auto">
                                {stats.categories.length} Topik Uji
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {stats.categories.map((cat) => (
                                <div key={cat.id} className="group flex flex-col justify-end">
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="font-semibold text-gray-800 text-sm">
                                            {cat.name}
                                        </span>
                                        <div className="text-right flex items-baseline gap-2">
                                            <span className={`text-lg font-black ${getScoreColor(cat.percentage)}`}>
                                                {cat.percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden ring-1 ring-inset ring-gray-200/50">
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r ${getGradient(cat.percentage)} transition-all duration-1000 ease-out`}
                                            style={{ width: `${cat.percentage}%` }}
                                        />
                                    </div>

                                    <div className="flex justify-between mt-2 text-[11px] font-medium text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <span>Benar: <strong className="text-gray-700">{cat.correct}</strong>/{cat.total}</span>
                                        </span>
                                        <span className={`${getScoreColor(cat.percentage)} font-semibold`}>
                                            {cat.percentage >= 75 ? 'Sangat Baik' : cat.percentage >= 50 ? 'Cukup' : 'Tingkatkan'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href={route('dashboard')}
                        className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center flex-1 sm:flex-none"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Kembali ke Dashboard
                    </Link>

                    {tryout.allow_review && (
                        <Link
                            href={route('exam.review', session.id)}
                            className="btn bg-emerald-600 text-white hover:bg-emerald-700 border border-transparent px-6 py-3 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center flex-1 sm:flex-none"
                        >
                            <BookOpenIcon className="w-5 h-5 mr-2" />
                            Lihat Pembahasan
                        </Link>
                    )}

                    {tryout.can_attempt && (
                        <Link
                            href={route('tryout.show', tryout.slug)}
                            className="btn bg-gray-800 text-white hover:bg-gray-900 border border-transparent px-6 py-3 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center flex-1 sm:flex-none"
                        >
                            <ArrowPathIcon className="w-5 h-5 mr-2" />
                            Ulangi Tryout
                        </Link>
                    )}
                </div>

            </div>
        </MainLayout>
    );
}
