import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    UserGroupIcon,
    DocumentTextIcon,
    ClipboardDocumentListIcon,
    AcademicCapIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color, subValue }) => {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                </div>
                {subValue && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                        {subValue}
                    </span>
                )}
            </div>
            <div>
                <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
                <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
            </div>
        </div>
    );
};

export default function Dashboard({ stats = {}, recentSessions = [], popularTryouts = [] }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-gray-500 mt-1">Ringkasan aktivitas dan performa platform Tryout UTBK.</p>
            </div>

            {/* Active Sessions Banner */}
            <div className="mb-8 relative overflow-hidden rounded-2xl bg-indigo-600 p-8 text-white shadow-xl shadow-indigo-200">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-indigo-200 font-medium">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            Realtime Activity
                        </div>
                        <h2 className="text-3xl font-bold">Sesi Ujian Aktif</h2>
                        <p className="text-indigo-100">Peserta yang sedang mengerjakan ujian saat ini.</p>
                    </div>
                    <div className="text-center md:text-right">
                        <span className="text-6xl font-bold tracking-tighter">{stats.active_sessions || 0}</span>
                        <span className="block text-sm font-medium text-indigo-200 uppercase tracking-widest">Peserta</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    title="Bank Soal"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Sessions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-gray-400" />
                            Aktivitas Terbaru
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-50 overflow-y-auto max-h-[400px]">
                        {recentSessions.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p>Belum ada aktivitas ujian terbaru.</p>
                            </div>
                        ) : (
                            recentSessions.map((session) => (
                                <div key={session.id} className="p-4 hover:bg-gray-50 transition-colors group">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs ring-2 ring-white">
                                                {session.user?.name?.charAt(0) || '?'}
                                            </div>
                                            <span className="font-semibold text-gray-900">{session.user?.name || 'Anonim'}</span>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${session.percentage >= 80 ? 'bg-emerald-50 text-emerald-600' :
                                                session.percentage >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {session.percentage || 0}%
                                        </span>
                                    </div>
                                    <div className="pl-11 flex justify-between items-center">
                                        <p className="text-sm text-gray-500 truncate max-w-[250px]">{session.tryout?.title}</p>
                                        <span className="text-xs text-gray-400">Baru saja</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Popular Tryouts */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2">
                            <ChartBarIcon className="w-5 h-5 text-gray-400" />
                            Tryout Populer
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-50 overflow-y-auto max-h-[400px]">
                        {popularTryouts.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <ClipboardDocumentListIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p>Belum ada data tryout.</p>
                            </div>
                        ) : (
                            popularTryouts.map((tryout, index) => (
                                <div key={tryout.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-400 bg-gray-50 rounded-lg">
                                        #{index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 truncate">{tryout.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-gray-500">{tryout.participant_count} peserta</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className={`text-xs font-medium ${tryout.is_published ? 'text-emerald-600' : 'text-gray-500'}`}>
                                                {tryout.is_published ? 'Publik' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}