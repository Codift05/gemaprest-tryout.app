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

            <div className="min-h-screen bg-gray-50/50 py-12 font-sans">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase mb-3">
                            Laporan Hasil
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                            {tryout.title || 'Hasil Ujian'}
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                            <ClockIcon className="w-4 h-4" />
                            <span>Diselesaikan pada {session.finished_at ? format(new Date(session.finished_at), 'dd MMMM yyyy, HH:mm', { locale: id }) : '-'}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Hero Score Card */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-all duration-300">
                                {/* Decorative Background Pattern */}
                                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${getScoreBg(score)}`} />
                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                    <TrophyIcon className="w-64 h-64 text-gray-900" />
                                </div>

                                <div className="p-8 md:p-10 relative z-10">
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                                        {/* Circular Score */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-48 h-48 rounded-full flex items-center justify-center bg-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)] border-4 border-gray-50">
                                                <div className="text-center">
                                                    <span className={`block text-6xl font-black ${getScoreColor(score)} tracking-tighter`}>
                                                        {score}%
                                                    </span>
                                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Nilai Akhir</span>
                                                </div>
                                            </div>
                                            {/* Grade Badge */}
                                            <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-6 py-1.5 rounded-full text-white font-bold text-sm shadow-lg bg-gradient-to-r ${getScoreBg(score)} whitespace-nowrap`}>
                                                Grade {grade.grade}
                                            </div>
                                        </div>

                                        {/* Text & Stats */}
                                        <div className="text-center md:text-left max-w-lg">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                                {grade.label}
                                            </h2>
                                            <p className="text-gray-500 leading-relaxed mb-8">
                                                {score >= 60
                                                    ? "Kerja bagus! Kamu telah menyelesaikan ujian ini dengan hasil yang positif. Evaluasi kembali jawabanmu untuk memahami materi lebih dalam."
                                                    : "Jangan berkecil hati. Jadikan hasil ini sebagai bahan evaluasi untuk mengidentifikasi area yang perlu ditingkatkan. Semangat belajar!"}
                                            </p>

                                            <div className="grid grid-cols-3 gap-3 md:gap-4">
                                                <div className="flex flex-col items-center md:items-start p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                                                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Benar</span>
                                                    </div>
                                                    <span className="text-2xl font-bold text-emerald-600">{stats.correct}</span>
                                                </div>
                                                <div className="flex flex-col items-center md:items-start p-4 bg-red-50/50 rounded-2xl border border-red-100/50 hover:bg-red-50 transition-colors">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <XCircleIcon className="w-4 h-4 text-red-600" />
                                                        <span className="text-xs font-bold text-red-800 uppercase tracking-wide">Salah</span>
                                                    </div>
                                                    <span className="text-2xl font-bold text-red-600">{stats.incorrect}</span>
                                                </div>
                                                <div className="flex flex-col items-center md:items-start p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <BookOpenIcon className="w-4 h-4 text-gray-500" />
                                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Kosong</span>
                                                    </div>
                                                    <span className="text-2xl font-bold text-gray-600">{stats.unanswered}</span>
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
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-all duration-300 flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                            <ChartBarIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 leading-tight">Peringkat Global</h3>
                                            <p className="text-xs text-gray-500">Posisi di leaderboard</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col items-center justify-center py-4">
                                        <div className="text-5xl font-black text-indigo-600 mb-1 tracking-tight">
                                            #{rank.position}
                                        </div>
                                        <p className="text-sm font-medium text-gray-400">
                                            dari <span className="text-gray-900">{rank.total}</span> Peserta
                                        </p>
                                    </div>

                                    <Link
                                        href={route('leaderboard.show', tryout.slug)}
                                        className="mt-6 flex items-center justify-center w-full px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-semibold text-sm hover:bg-indigo-100 transition-colors group"
                                    >
                                        Lihat Leaderboard
                                        <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Duration Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-all duration-300 flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <ClockIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 leading-tight">Waktu Pengerjaan</h3>
                                        <p className="text-xs text-gray-500">Total durasi ujian</p>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center py-4">
                                    <div className="text-5xl font-black text-blue-600 mb-1 tracking-tight">
                                        {stats.duration}
                                    </div>
                                    <p className="text-sm font-medium text-gray-400">
                                        Menit
                                    </p>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                                        <span className="block text-gray-500 mb-1">Mulai</span>
                                        <span className="font-bold text-gray-900">{session.started_at ? format(new Date(session.started_at), 'HH:mm', { locale: id }) : '-'}</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                                        <span className="block text-gray-500 mb-1">Selesai</span>
                                        <span className="font-bold text-gray-900">{session.finished_at ? format(new Date(session.finished_at), 'HH:mm', { locale: id }) : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Violations (Conditional) */}
                        {session.total_violations > 0 && (
                            <div className="lg:col-span-1">
                                <div className="bg-red-50 rounded-3xl border border-red-100 p-6 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm">
                                            <TrophyIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-red-900 leading-tight">Pelanggaran</h3>
                                            <p className="text-xs text-red-600/80">Catatan integritas</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col items-center justify-center py-4">
                                        <div className="text-5xl font-black text-red-600 mb-1 tracking-tight">
                                            {session.total_violations}
                                        </div>
                                        <p className="text-sm font-medium text-red-600/80">
                                            Kali Terdeteksi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Performance Analysis */}
                    {stats.categories && stats.categories.length > 0 && (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-xl text-gray-900">Analisis Performa Topik</h3>
                                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    {stats.categories.length} Kategori
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {stats.categories.map((cat) => (
                                    <div key={cat.id} className="group">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{cat.name}</span>
                                            <div className="text-right">
                                                <span className={`text-lg font-bold ${getScoreColor(cat.percentage)}`}>
                                                    {cat.percentage}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${getScoreBg(cat.percentage)} transition-all duration-1000 ease-out`}
                                                style={{ width: `${cat.percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-1 text-xs text-gray-400 group-hover:text-gray-500">
                                            <span>Skor: {cat.correct} / {cat.total}</span>
                                            <span>{cat.percentage >= 60 ? 'Kompeten' : 'Perlu Peningkatan'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center py-8">
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Kembali ke Dashboard
                        </Link>

                        {tryout.allow_review && (
                            <Link
                                href={route('exam.review', session.id)}
                                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold text-white bg-blue-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <BookOpenIcon className="w-5 h-5 mr-2" />
                                Lihat Pembahasan
                            </Link>
                        )}

                        {tryout.can_attempt && (
                            <Link
                                href={route('tryout.show', tryout.slug)}
                                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <ArrowPathIcon className="w-5 h-5 mr-2" />
                                Ulangi Ujian
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
