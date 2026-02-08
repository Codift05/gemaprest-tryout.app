import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    UserGroupIcon,
    DocumentTextIcon,
    ClipboardDocumentListIcon,
    AcademicCapIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
                        <Icon className="w-8 h-8" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Dashboard({ stats = {}, recentSessions = [], popularTryouts = [] }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-gray-600">Selamat datang! Berikut ringkasan aktivitas platform.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Total Siswa"
                    value={stats.total_students || 0}
                    icon={UserGroupIcon}
                    color="indigo"
                />
                <StatCard
                    title="Total Tryout"
                    value={stats.total_tryouts || 0}
                    icon={ClipboardDocumentListIcon}
                    color="purple"
                />
                <StatCard
                    title="Total Soal"
                    value={stats.total_questions || 0}
                    icon={DocumentTextIcon}
                    color="emerald"
                />
                <StatCard
                    title="Ujian Selesai"
                    value={stats.total_exam_sessions || 0}
                    icon={AcademicCapIcon}
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Sessions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Ujian Terbaru</h2>
                        <ChartBarIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="divide-y max-h-96 overflow-y-auto">
                        {recentSessions.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Belum ada ujian</div>
                        ) : (
                            recentSessions.map((session) => (
                                <div key={session.id} className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-medium text-gray-900">{session.user?.name || 'Anonim'}</p>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            session.percentage >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                            session.percentage >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {session.percentage || 0}%
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{session.tryout?.title}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Popular Tryouts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Tryout Populer</h2>
                    </div>
                    <div className="divide-y max-h-96 overflow-y-auto">
                        {popularTryouts.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Belum ada tryout</div>
                        ) : (
                            popularTryouts.map((tryout) => (
                                <div key={tryout.id} className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{tryout.title}</p>
                                        <p className="text-sm text-gray-500">{tryout.participant_count} peserta</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        tryout.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {tryout.is_published ? 'Aktif' : 'Draft'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="mt-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Sesi Aktif Sekarang</h3>
                    <p className="text-5xl font-bold">{stats.active_sessions || 0}</p>
                    <p className="text-indigo-100 mt-1">peserta sedang mengerjakan ujian</p>
                </div>
            </div>
        </AdminLayout>
    );
}