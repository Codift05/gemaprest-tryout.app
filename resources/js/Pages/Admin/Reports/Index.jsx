import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ChartBarIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    ArrowTrendingUpIcon,
    CheckCircleIcon,
    ClockIcon,
    NoSymbolIcon,
    BeakerIcon
} from '@heroicons/react/24/outline';

export default function ReportsIndex({ stats = {} }) {
    const reportCards = [
        {
            title: 'Laporan Pengguna',
            description: 'Statistik pengguna aktif, pendaftaran, dan aktivitas',
            icon: UserGroupIcon,
            color: 'bg-blue-600',
            textColor: 'text-blue-600',
            bgLight: 'bg-blue-50',
            route: 'admin.users.index'
        },
        {
            title: 'Laporan Tryout',
            description: 'Statistik percobaan, tingkat kelulusan, dan durasi',
            icon: DocumentTextIcon,
            color: 'bg-emerald-600',
            textColor: 'text-emerald-600',
            bgLight: 'bg-emerald-50',
            route: 'admin.tryouts.index'
        },
        {
            title: 'Laporan Soal',
            description: 'Analisis tingkat kesulitan dan jawaban benar',
            icon: BeakerIcon,
            color: 'bg-violet-600',
            textColor: 'text-violet-600',
            bgLight: 'bg-violet-50',
            route: 'admin.questions.index'
        },
        {
            title: 'Laporan Kecurangan',
            description: 'Log pelanggaran dan diskualifikasi',
            icon: NoSymbolIcon,
            color: 'bg-rose-600',
            textColor: 'text-rose-600',
            bgLight: 'bg-rose-50',
            route: 'admin.reports.violations'
        },
    ];

    const quickStats = [
        {
            label: 'Total Sesi',
            value: stats.total_sessions || 0,
            icon: ClockIcon,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100'
        },
        {
            label: 'Rata-rata Skor',
            value: `${stats.average_score || 0}%`,
            icon: ArrowTrendingUpIcon,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100'
        },
        {
            label: 'Tingkat Penyelesaian',
            value: `${stats.completion_rate || 0}%`,
            icon: CheckCircleIcon,
            color: 'text-violet-600',
            bg: 'bg-violet-50',
            border: 'border-violet-100'
        },
        {
            label: 'Pelanggaran',
            value: stats.violations || 0,
            icon: ExclamationTriangleIcon,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            border: 'border-rose-100'
        }
    ];

    return (
        <AdminLayout title="Laporan & Analitik">
            <Head title="Laporan & Analitik" />

            <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
                    <p className="mt-1 text-sm sm:text-base text-gray-500">Pantau statistik dan analisis performa</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-0.5 sm:mb-1">{stat.label}</p>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${stat.bg} ${stat.color} self-start`}>
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Report Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {reportCards.map((report, index) => {
                        const CardContent = () => (
                            <div className="flex items-start gap-3 sm:gap-5">
                                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${report.color} text-white shadow-sm shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                                    <report.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                        {report.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                                        {report.description}
                                    </p>
                                    <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                                        Lihat Laporan
                                        <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );

                        return report.route ? (
                            <Link
                                key={index}
                                href={route(report.route)}
                                className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer block"
                            >
                                <CardContent />
                            </Link>
                        ) : (
                            <div
                                key={index}
                                onClick={() => alert('Fitur Laporan Kecurangan akan segera hadir!')}
                                className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer"
                            >
                                <CardContent />
                            </div>
                        );
                    })}
                </div>

                {/* Coming Soon */}
                <div className="relative overflow-hidden bg-white rounded-xl sm:rounded-2xl border border-dashed border-gray-300 p-8 sm:p-12 text-center">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <ChartBarIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Fitur Laporan Lanjutan</h3>
                        <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
                            Laporan detail dengan visualisasi grafik interaktif dan ekspor data (Excel/PDF) sedang dalam pengembangan. Pantau terus pembaruan platform!
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
