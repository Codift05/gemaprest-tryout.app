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

export default function Result({ session, stats, rank }) {
    const tryout = session?.tryout || {};
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

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hasil Ujian</h1>
                        <p className="text-gray-500">{tryout.title || 'Ujian Selesai'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Score Card - Hero Section */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
                                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getScoreBg(score)}`} />
                                <div className="p-8 md:p-12 text-center">
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                                        <div className="relative">
                                            <div className="w-48 h-48 rounded-full border-8 border-gray-50 flex items-center justify-center bg-white shadow-inner">
                                                <div className="text-center">
                                                    <span className={`block text-6xl font-bold ${getScoreColor(score)}`}>
                                                        {score}%
                                                    </span>
                                                    <span className="text-gray-400 text-sm font-medium uppercase tracking-widest mt-1">Nilai Akhir</span>
                                                </div>
                                            </div>
                                            <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-bold shadow-lg bg-gradient-to-r ${getScoreBg(score)}`}>
                                                {grade.grade}
                                            </div>
                                        </div>

                                        <div className="text-center md:text-left max-w-sm">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                {grade.label}
                                            </h2>
                                            <p className="text-gray-500 leading-relaxed mb-6">
                                                {score >= 60
                                                    ? "Selamat! Anda telah menyelesaikan ujian dengan baik. Pertahankan dan tingkatkan terus prestasimu."
                                                    : "Jangan menyerah! Pelajari kembali materi yang belum dikuasai dan coba lagi untuk hasil yang lebih baik."}
                                            </p>

                                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                                                    <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                                                    <div className="text-left">
                                                        <span className="block text-xs text-emerald-800 font-bold uppercase">Benar</span>
                                                        <span className="block text-lg font-bold text-emerald-600">{stats.correct}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-100">
                                                    <XCircleIcon className="w-5 h-5 text-red-600" />
                                                    <div className="text-left">
                                                        <span className="block text-xs text-red-800 font-bold uppercase">Salah</span>
                                                        <span className="block text-lg font-bold text-red-600">{stats.incorrect}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                                                    <BookOpenIcon className="w-5 h-5 text-gray-600" />
                                                    <div className="text-left">
                                                        <span className="block text-xs text-gray-500 font-bold uppercase">Kosong</span>
                                                        <span className="block text-lg font-bold text-gray-600">{stats.unanswered}</span>
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
                            <div className="md:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                            <ChartBarIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Peringkat</h3>
                                            <p className="text-sm text-gray-500">Posisi kamu saat ini</p>
                                        </div>
                                    </div>
                                    <div className="text-center py-6">
                                        <span className="text-4xl font-bold text-indigo-600 block mb-1">
                                            #{rank.position}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            dari {rank.total} Peserta
                                        </span>
                                    </div>
                                    <Link
                                        href={route('leaderboard.show', tryout.slug)}
                                        className="btn btn-secondary w-full justify-center mt-2 group"
                                    >
                                        Lihat Leaderboard
                                        <ArrowLeftIcon className="w-4 h-4 ml-2 group-hover:-translate-y-1 transition-transform rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Duration Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <ClockIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Waktu Pengerjaan</h3>
                                        <p className="text-sm text-gray-500">Durasi ujianmu</p>
                                    </div>
                                </div>
                                <div className="text-center py-6">
                                    <span className="text-4xl font-bold text-blue-600 block mb-1">
                                        {stats.duration}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        Menit
                                    </span>
                                </div>
                                <div className="space-y-2 mt-2 text-xs text-gray-500">
                                    <div className="flex justify-between">
                                        <span>Mulai:</span>
                                        <span className="font-medium text-gray-900">{session.started_at ? format(new Date(session.started_at), 'HH:mm', { locale: id }) : '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Selesai:</span>
                                        <span className="font-medium text-gray-900">{session.finished_at ? format(new Date(session.finished_at), 'HH:mm', { locale: id }) : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Violations Card (Conditional) */}
                        {session.total_violations > 0 && (
                            <div className="md:col-span-1">
                                <div className="bg-red-50 rounded-2xl border border-red-100 p-6 h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm">
                                            <TrophyIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-red-900">Pelanggaran</h3>
                                            <p className="text-sm text-red-700">Catatan integritas</p>
                                        </div>
                                    </div>
                                    <div className="text-center py-6">
                                        <span className="text-4xl font-bold text-red-600 block mb-1">
                                            {session.total_violations}
                                        </span>
                                        <span className="text-red-600 text-sm font-medium">
                                            Kali Terdeteksi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Performance per Category */}
                    {stats.categories && stats.categories.length > 0 && (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
                            <h3 className="font-bold text-xl text-gray-900 mb-6">Analisis Performa</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {stats.categories.map((cat) => (
                                    <div key={cat.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-gray-700">{cat.name}</span>
                                            <span className={`font-bold ${getScoreColor(cat.percentage)}`}>
                                                {cat.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                                            <div
                                                className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreBg(cat.percentage)} transition-all duration-500`}
                                                style={{ width: `${cat.percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Benar: {cat.correct}</span>
                                            <span>Total: {cat.total} Soal</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center py-8">
                        <Link href={route('dashboard')} className="btn btn-secondary px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Kembali ke Dashboard
                        </Link>

                        {tryout.allow_review && (
                            <Link href={route('exam.review', session.id)} className="btn btn-primary px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                                <BookOpenIcon className="w-5 h-5 mr-2" />
                                Pembahasan Soal
                            </Link>
                        )}

                        {tryout.can_attempt && (
                            <Link
                                href={route('tryout.show', tryout.slug)}
                                className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
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
