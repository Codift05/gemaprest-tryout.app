import { Head } from '@inertiajs/react';
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
            bgLight: 'bg-blue-50'
        },
        {
            title: 'Laporan Tryout',
            description: 'Statistik percobaan, tingkat kelulusan, dan durasi',
            icon: DocumentTextIcon,
            color: 'bg-emerald-600',
            textColor: 'text-emerald-600',
            bgLight: 'bg-emerald-50'
        },
        {
            title: 'Laporan Soal',
            description: 'Analisis tingkat kesulitan dan jawaban benar',
            icon: BeakerIcon,
            color: 'bg-violet-600',
            textColor: 'text-violet-600',
            bgLight: 'bg-violet-50'
        },
        {
            title: 'Laporan Kecurangan',
            description: 'Log pelanggaran dan diskualifikasi',
            icon: NoSymbolIcon,
            color: 'bg-rose-600',
            textColor: 'text-rose-600',
            bgLight: 'bg-rose-50'
        },
    ];

    const quickStats = [
        {
            label: 'Total Sesi',
            value: stats.total_sessions || 0,
            icon: ClockIcon,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            border: 'border-indigo-100'
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

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
                    <p className="mt-1 text-gray-500">Pantau statistik dan analisis performa platform</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start justify-between hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Report Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reportCards.map((report, index) => (
                        <div key={index} className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer">
                            <div className="flex items-start gap-5">
                                <div className={`p-4 rounded-xl ${report.color} text-white shadow-sm shadow-gray-200 group-hover:scale-110 transition-transform duration-300`}>
                                    <report.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {report.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                        {report.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                                        Lihat Laporan
                                        <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coming Soon */}
                <div className="relative overflow-hidden bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
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
