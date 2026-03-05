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
        emerald: 'bg-emerald-50 text-emerald-600',
        teal: 'bg-teal-50 text-teal-600',
        amber: 'bg-amber-50 text-amber-600',
        gray: 'bg-gray-100 text-gray-600',
    };

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center sm:items-start gap-3 sm:gap-0 sm:flex-col">
                <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${colorClasses[color]} group-hover:scale-110 transition-transform sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 sm:flex-none flex items-center sm:items-start justify-between sm:justify-start sm:flex-col">
                    <div>
                        <p className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5 sm:mt-1">{title}</p>
                    </div>
                    {subValue && (
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1 sm:hidden">
                            <ArrowTrendingUpIcon className="w-3 h-3" />
                            {subValue}
                        </span>
                    )}
                </div>
                {subValue && (
                    <span className="hidden sm:flex text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full items-center gap-1 absolute top-4 right-4">
                        <ArrowTrendingUpIcon className="w-3 h-3" />
                        {subValue}
                    </span>
                )}
            </div>
        </div>
    );
};

export default function Dashboard({ stats = {}, recentSessions = [], popularTryouts = [] }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm sm:text-base text-gray-500 mt-1">Ringkasan aktivitas dan performa platform.</p>
            </div>

            {/* Active Sessions Banner */}
            <div className="mb-6 sm:mb-8 relative overflow-hidden rounded-xl bg-emerald-800 px-6 py-5 text-white">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1 text-emerald-300 text-xs font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Realtime
                        </div>
                        <h2 className="text-xl font-bold">Sesi Aktif</h2>
                        <p className="text-emerald-300 text-sm">Peserta yang sedang mengerjakan ujian.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-5xl font-bold tracking-tight">{stats.active_sessions || 0}</span>
                        <span className="block text-xs font-medium text-emerald-300 uppercase tracking-widest mt-1">Peserta</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
                <StatCard
                    title="Total Siswa"
                    value={stats.total_students || 0}
                    icon={UserGroupIcon}
                    color="emerald"
                />
                <StatCard
                    title="Total Tryout"
                    value={stats.total_tryouts || 0}
                    icon={ClipboardDocumentListIcon}
                    color="teal"
                />
                <StatCard
                    title="Bank Soal"
                    value={stats.total_questions || 0}
                    icon={DocumentTextIcon}
                    color="gray"
                />
                <StatCard
                    title="Ujian Selesai"
                    value={stats.total_exam_sessions || 0}
                    icon={AcademicCapIcon}
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                {/* Recent Sessions */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                            <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            Aktivitas Terbaru
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-50 overflow-y-auto max-h-[300px] sm:max-h-[400px]">
                        {recentSessions.length === 0 ? (
                            <div className="p-6 sm:p-8 text-center text-gray-500">
                                <ClockIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-sm sm:text-base">Belum ada aktivitas ujian terbaru.</p>
                            </div>
                        ) : (
                            recentSessions.map((session) => (
                                <div key={session.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors group">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs ring-2 ring-white">
                                                {session.user?.name?.charAt(0) || '?'}
                                            </div>
                                            <span className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{session.user?.name || 'Anonim'}</span>
                                        </div>
                                        <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold ${session.percentage >= 80 ? 'bg-emerald-50 text-emerald-600' :
                                            session.percentage >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {session.percentage || 0}%
                                        </span>
                                    </div>
                                    <div className="pl-9 sm:pl-11 flex justify-between items-center">
                                        <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] sm:max-w-[250px]">{session.tryout?.title}</p>
                                        <span className="text-xs text-gray-400 hidden sm:block">Baru saja</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Popular Tryouts */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                            <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            Tryout Populer
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-50 overflow-y-auto max-h-[300px] sm:max-h-[400px]">
                        {popularTryouts.length === 0 ? (
                            <div className="p-6 sm:p-8 text-center text-gray-500">
                                <ClipboardDocumentListIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-sm sm:text-base">Belum ada data tryout.</p>
                            </div>
                        ) : (
                            popularTryouts.map((tryout, index) => (
                                <div key={tryout.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors flex items-center gap-3 sm:gap-4">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-gray-400 bg-gray-50 rounded-lg text-sm">
                                        #{index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 truncate text-sm sm:text-base">{tryout.title}</p>
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