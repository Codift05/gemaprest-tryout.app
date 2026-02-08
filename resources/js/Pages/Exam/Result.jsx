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

    const grade = getGrade(session.percentage);

    return (
        <MainLayout>
            <Head title={`Hasil - ${session.tryout.title}`} />

            <div className="max-w-4xl mx-auto">
                {/* Score Card */}
                <div className="card overflow-hidden mb-6">
                    <div
                        className={`bg-gradient-to-br ${getScoreBg(session.percentage)} p-8 text-white text-center`}
                    >
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TrophyIcon className="w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Ujian Selesai!</h1>
                        <p className="text-white/80">{session.tryout.title}</p>
                    </div>

                    <div className="p-6">
                        {/* Main Score Display */}
                        <div className="flex items-center justify-center gap-8 py-6 border-b">
                            <div className="text-center">
                                <p className={`text-6xl font-bold ${getScoreColor(session.percentage)}`}>
                                    {session.percentage}%
                                </p>
                                <p className="text-gray-600 mt-1">Nilai Akhir</p>
                            </div>
                            <div className="text-center">
                                <div
                                    className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
                                        session.percentage >= 60
                                            ? 'bg-emerald-100 text-emerald-600'
                                            : 'bg-red-100 text-red-600'
                                    }`}
                                >
                                    {grade.grade}
                                </div>
                                <p className="text-gray-600 mt-2">{grade.label}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                            <div className="text-center p-4 bg-emerald-50 rounded-xl">
                                <CheckCircleIcon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-emerald-600">{stats.correct}</p>
                                <p className="text-sm text-emerald-700">Benar</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-xl">
                                <XCircleIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-red-600">{stats.incorrect}</p>
                                <p className="text-sm text-red-700">Salah</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <BookOpenIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-gray-600">{stats.unanswered}</p>
                                <p className="text-sm text-gray-700">Tidak Dijawab</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <ClockIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-blue-600">{stats.duration}</p>
                                <p className="text-sm text-blue-700">Menit</p>
                            </div>
                        </div>

                        {/* Rank Info */}
                        {rank && (
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <ChartBarIcon className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                Peringkat #{rank.position}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                dari {rank.total} peserta
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('leaderboard.show', session.tryout.slug)}
                                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                                    >
                                        Lihat Leaderboard →
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Category Breakdown */}
                        {stats.categories && stats.categories.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    Performa per Kategori
                                </h3>
                                <div className="space-y-3">
                                    {stats.categories.map((cat) => (
                                        <div key={cat.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-700">{cat.name}</span>
                                                <span className={getScoreColor(cat.percentage)}>
                                                    {cat.correct}/{cat.total} ({cat.percentage}%)
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r ${getScoreBg(cat.percentage)}`}
                                                    style={{ width: `${cat.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Session Info */}
                        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-gray-500">Waktu Mulai:</span>
                                    <p className="font-medium text-gray-900">
                                        {format(new Date(session.started_at), 'dd MMM yyyy, HH:mm', { locale: id })}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Waktu Selesai:</span>
                                    <p className="font-medium text-gray-900">
                                        {format(new Date(session.finished_at), 'dd MMM yyyy, HH:mm', { locale: id })}
                                    </p>
                                </div>
                            </div>
                            {session.total_violations > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-amber-600">
                                        ⚠️ Terdeteksi {session.total_violations} pelanggaran selama ujian
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href={route('dashboard')} className="btn btn-secondary">
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Dashboard
                    </Link>
                    
                    {session.tryout.allow_review && (
                        <Link href={route('exam.review', session.id)} className="btn btn-primary">
                            <BookOpenIcon className="w-5 h-5 mr-2" />
                            Lihat Pembahasan
                        </Link>
                    )}

                    {session.tryout.can_attempt && (
                        <Link
                            href={route('tryout.show', session.tryout.slug)}
                            className="btn btn-secondary"
                        >
                            <ArrowPathIcon className="w-5 h-5 mr-2" />
                            Coba Lagi
                        </Link>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
