import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ExclamationTriangleIcon,
    ArrowLeftIcon,
    NoSymbolIcon
} from '@heroicons/react/24/outline';

export default function Violations({ violations }) {
    const getSeverityBadge = (severity) => {
        const styles = {
            low: 'bg-yellow-50 text-yellow-700 border-yellow-100',
            medium: 'bg-orange-50 text-orange-700 border-orange-100',
            high: 'bg-red-50 text-red-700 border-red-100',
        };

        const labels = {
            low: 'Ringan',
            medium: 'Sedang',
            high: 'Berat',
        };

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[severity] || styles.low}`}>
                {labels[severity] || severity}
            </span>
        );
    };

    return (
        <AdminLayout title="Laporan Kecurangan">
            <Head title="Laporan Kecurangan" />

            <div className="mb-6">
                <Link
                    href={route('admin.reports.index')}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Kembali ke Laporan
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Laporan Kecurangan</h1>
                    <p className="mt-1 text-gray-500">Daftar deteksi pelanggaran selama ujian berlangsung</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {violations.data.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <NoSymbolIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Belum Ada Pelanggaran
                        </h3>
                        <p className="text-gray-500">
                            Belum ada aktivitas mencurigakan yang terdeteksi
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Peserta
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Tryout
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Jenis Pelanggaran
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Tingkat
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Waktu
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {violations.data.map((violation) => (
                                    <tr key={violation.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{violation.user_name}</p>
                                                <p className="text-xs text-gray-500">{violation.user_email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{violation.tryout_title}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{violation.type_label}</p>
                                                {violation.details && (
                                                    <p className="text-xs text-gray-500 mt-0.5 max-w-xs truncate" title={violation.details}>
                                                        {violation.details}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getSeverityBadge(violation.severity)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-900">{violation.occurred_at}</span>
                                                <span className="text-xs text-gray-500">{violation.occurred_time}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {violations.last_page > 1 && (
                <div className="mt-6 flex justify-center">
                    <nav className="flex gap-1.5 p-1 bg-white rounded-xl shadow-sm border border-gray-100">
                        {violations.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${link.active
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : link.url
                                        ? 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                        : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            )}
        </AdminLayout>
    );
}
