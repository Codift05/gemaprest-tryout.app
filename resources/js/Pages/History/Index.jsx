import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function HistoryIndex({ sessions }) {
    const getStatusBadge = (status) => {
        const styles = {
            completed: 'bg-green-100 text-green-800',
            timeout: 'bg-yellow-100 text-yellow-800',
            violated: 'bg-red-100 text-red-800',
        };
        const labels = {
            completed: 'Selesai',
            timeout: 'Waktu Habis',
            violated: 'Diskualifikasi',
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
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
        if (percentage >= 85) return { grade: 'A', color: 'text-green-600' };
        if (percentage >= 70) return { grade: 'B', color: 'text-blue-600' };
        if (percentage >= 55) return { grade: 'C', color: 'text-yellow-600' };
        if (percentage >= 40) return { grade: 'D', color: 'text-orange-600' };
        return { grade: 'E', color: 'text-red-600' };
    };

    return (
        <MainLayout>
            <Head title="Riwayat Ujian" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Riwayat Ujian</h1>
                    <p className="mt-2 text-gray-400">Daftar tryout yang pernah Anda kerjakan</p>
                </div>

                {sessions.data.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Riwayat</h3>
                        <p className="text-gray-500 mb-6">Anda belum mengerjakan tryout apapun.</p>
                        <Link
                            href={route('tryouts.index')}
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Mulai Tryout
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tryout
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Skor
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Durasi
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sessions.data.map((session) => {
                                        const percentage = session.total_questions > 0
                                            ? Math.round((session.correct_count / session.total_questions) * 100)
                                            : 0;
                                        const { grade, color } = getGrade(percentage);

                                        return (
                                            <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{session.tryout?.title}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {session.total_questions} soal
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(session.finished_at || session.started_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className={`text-lg font-bold ${color}`}>{grade}</div>
                                                    <div className="text-sm text-gray-500">{percentage}%</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                    {formatDuration(session.duration_seconds)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {getStatusBadge(session.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link
                                                            href={route('exam.result', session.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                                        >
                                                            Hasil
                                                        </Link>
                                                        {session.tryout?.allow_review && (
                                                            <Link
                                                                href={route('exam.review', session.id)}
                                                                className="text-green-600 hover:text-green-900 text-sm font-medium"
                                                            >
                                                                Review
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
                                const percentage = session.total_questions > 0
                                    ? Math.round((session.correct_count / session.total_questions) * 100)
                                    : 0;
                                const { grade, color } = getGrade(percentage);

                                return (
                                    <div key={session.id} className="bg-white rounded-xl shadow-lg p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{session.tryout?.title}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {formatDate(session.finished_at || session.started_at)}
                                                </p>
                                            </div>
                                            {getStatusBadge(session.status)}
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div className="text-center">
                                                <div className={`text-2xl font-bold ${color}`}>{grade}</div>
                                                <div className="text-xs text-gray-500">{percentage}%</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {session.correct_count}/{session.total_questions}
                                                </div>
                                                <div className="text-xs text-gray-500">Benar</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {formatDuration(session.duration_seconds)}
                                                </div>
                                                <div className="text-xs text-gray-500">Durasi</div>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <Link
                                                href={route('exam.result', session.id)}
                                                className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                            >
                                                Lihat Hasil
                                            </Link>
                                            {session.tryout?.allow_review && (
                                                <Link
                                                    href={route('exam.review', session.id)}
                                                    className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    Review
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {sessions.last_page > 1 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {sessions.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${!link.url && 'opacity-50 cursor-not-allowed'} ${index === 0 ? 'rounded-l-md' : ''
                                                } ${index === sessions.links.length - 1 ? 'rounded-r-md' : ''}`}
                                            preserveScroll
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                )}

                {/* Stats Summary */}
                {sessions.data.length > 0 && (
                    <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Statistik</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-indigo-600">{sessions.total}</div>
                                <div className="text-sm text-gray-500">Total Tryout</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {sessions.data.filter(s => s.status === 'completed').length}
                                </div>
                                <div className="text-sm text-gray-500">Selesai</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {sessions.data.length > 0
                                        ? Math.round(
                                            sessions.data.reduce((sum, s) => sum + (s.total_questions > 0 ? (s.correct_count / s.total_questions) * 100 : 0), 0) /
                                            sessions.data.length
                                        )
                                        : 0}%
                                </div>
                                <div className="text-sm text-gray-500">Rata-rata</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {sessions.data.reduce((sum, s) => sum + s.total_questions, 0)}
                                </div>
                                <div className="text-sm text-gray-500">Soal Dikerjakan</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
