import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationCircleIcon,
    DocumentTextIcon,
    ChartBarIcon,
    ArrowRightIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

export default function HistoryIndex({ sessions }) {
    const getStatusBadge = (status) => {
        const styles = {
            completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            timeout: 'bg-amber-50 text-amber-700 border-amber-200',
            violated: 'bg-red-50 text-red-700 border-red-200',
        };
        const labels = {
            completed: 'Selesai',
            timeout: 'Waktu Habis',
            violated: 'Diskualifikasi',
        };
        const icons = {
            completed: CheckCircleIcon,
            timeout: ExclamationCircleIcon,
            violated: XCircleIcon
        };

        const Icon = icons[status] || DocumentTextIcon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${styles[status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                <Icon className="w-3.5 h-3.5" />
                {labels[status] || status}
            </span>
        );
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '-';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}j ${minutes}m`;
        }
        return `${minutes}m ${secs}d`;
    };

    const getGrade = (percentage) => {
        if (percentage >= 85) return { grade: 'A', color: 'text-emerald-600', bg: 'bg-emerald-50' };
        if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
        if (percentage >= 55) return { grade: 'C', color: 'text-amber-600', bg: 'bg-amber-50' };
        if (percentage >= 40) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50' };
        return { grade: 'E', color: 'text-red-600', bg: 'bg-red-50' };
    };

    return (
        <MainLayout title="Riwayat Ujian" isFullWidth={true}>
            <Head title="Riwayat Ujian" />

            {/* Hero Section (Full Width, Emerald Background) */}
            <div className="w-full bg-emerald-800 pb-20 md:pb-28 pt-8 md:pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative z-10 w-full max-w-2xl text-center md:text-left">
                        <h1 className="text-2xl md:text-[32px] font-bold text-white mb-2 md:mb-3 tracking-tight">
                            Riwayat Ujian
                        </h1>
                        <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                            Pantau kemajuan belajar melalui riwayat pengerjaan tryout dan analisis hasil skor.
                        </p>
                    </div>
                    {/* Decoration/Icon */}
                    <div className="relative z-10 hidden md:block opacity-20 transform rotate-6">
                        <ChartBarIcon className="w-32 h-32 text-white" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                {/* Stats Summary (Floating Overlap) */}
                {sessions.data.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 -mt-10 md:-mt-14 relative z-20 mb-8">
                        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                                <DocumentTextIcon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{sessions.total}</span>
                            <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Total Tryout</span>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                                <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                                {sessions.data.filter(s => s.status === 'completed').length}
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Selesai</span>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                                <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                                {Math.round(
                                    sessions.data.reduce((sum, s) => sum + (s.total_questions > 0 ? (s.correct_count / s.total_questions) * 100 : 0), 0) /
                                    (sessions.data.length || 1)
                                )}%
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Rata-rata Skor</span>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                                <DocumentTextIcon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                                {sessions.data.reduce((sum, s) => sum + s.total_questions, 0)}
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Soal Dikerjakan</span>
                        </div>
                    </div>
                )}

                {sessions.data.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 md:p-16 text-center border border-gray-200 shadow-sm -mt-10 md:-mt-14 relative z-20 mb-8">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <DocumentTextIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Riwayat</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            Anda belum mengerjakan tryout apapun. Mulai kerjakan tryout sekarang untuk melihat progresmu.
                        </p>
                        <Link
                            href={route('tryouts.index')}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-sm active:scale-[0.98]"
                        >
                            Mulai Tryout
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Tryout
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Skor
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Durasi
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {sessions.data.map((session) => {
                                        const totalQuestions = session.total_questions || (session.correct_count + session.wrong_count + session.unanswered_count);
                                        const percentage = session.percentage !== undefined
                                            ? Math.round(parseFloat(session.percentage))
                                            : (totalQuestions > 0 ? Math.round((session.correct_count / totalQuestions) * 100) : 0);

                                        const { grade, color, bg } = getGrade(percentage);

                                        return (
                                            <tr key={session.id} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{session.tryout?.title}</div>
                                                    <div className="text-xs text-gray-500 mt-1 flex gap-2">
                                                        <span className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-600">{totalQuestions} butir soal</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                                                        {formatDate(session.finished_at || session.started_at)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border border-gray-200">
                                                        <span className={`text-base font-bold ${color}`}>{grade}</span>
                                                        <span className="text-sm font-bold text-gray-700 border-l border-gray-300 pl-2">{percentage}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 border border-gray-200 font-medium">
                                                        <ClockIcon className="w-4 h-4 text-gray-400" />
                                                        {formatDuration(session.duration_seconds)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {getStatusBadge(session.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route('exam.result', session.id)}
                                                            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 rounded-lg text-xs font-bold transition-colors"
                                                        >
                                                            Analisis
                                                        </Link>
                                                        {session.tryout?.allow_review && (
                                                            <Link
                                                                href={route('exam.review', session.id)}
                                                                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-bold transition-colors"
                                                            >
                                                                Pembahasan
                                                            </Link>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {sessions.data.map((session) => {
                                const totalQuestions = session.total_questions || (session.correct_count + session.wrong_count + session.unanswered_count);
                                const percentage = session.percentage !== undefined
                                    ? Math.round(parseFloat(session.percentage))
                                    : (totalQuestions > 0 ? Math.round((session.correct_count / totalQuestions) * 100) : 0);

                                const { grade, color, bg } = getGrade(percentage);

                                return (
                                    <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm mb-1">{session.tryout?.title}</h3>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <CalendarIcon className="w-3.5 h-3.5" />
                                                    {formatDate(session.finished_at || session.started_at)}
                                                </div>
                                            </div>
                                            {getStatusBadge(session.status)}
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 mb-5">
                                            <div className={`rounded-lg p-2.5 text-center border border-gray-100 ${bg}`}>
                                                <div className={`text-xl font-bold ${color}`}>{grade}</div>
                                                <div className="text-[10px] uppercase font-bold text-gray-500 mt-1 relative z-10">Grade</div>
                                            </div>
                                            <div className="rounded-lg bg-gray-50 p-2.5 text-center border border-gray-200">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {percentage}%
                                                </div>
                                                <div className="text-[10px] uppercase font-bold text-gray-500 mt-1">Akurasi</div>
                                            </div>
                                            <div className="rounded-lg bg-gray-50 p-2.5 text-center border border-gray-200">
                                                <div className="text-lg font-bold text-gray-900">
                                                    {formatDuration(session.duration_seconds)}
                                                </div>
                                                <div className="text-[10px] uppercase font-bold text-gray-500 mt-1">Durasi</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={route('exam.result', session.id)}
                                                className="flex-1 text-center px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm active:scale-[0.98]"
                                            >
                                                Lihat Analisis
                                            </Link>
                                            {session.tryout?.allow_review && (
                                                <Link
                                                    href={route('exam.review', session.id)}
                                                    className="flex-1 text-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all active:scale-[0.98]"
                                                >
                                                    Pembahasan
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {sessions.last_page > 1 && (
                            <div className="flex justify-center pt-8 mt-4">
                                <nav className="flex gap-2">
                                    {sessions.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${link.active
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : link.url
                                                    ? 'bg-white text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 border border-gray-200'
                                                    : 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed'
                                                }`}
                                            preserveState
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
