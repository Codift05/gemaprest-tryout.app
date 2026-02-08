import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

export default function SettingsIndex({ settings = {} }) {
    const [activeTab, setActiveTab] = useState('general');

    const { data, setData, post, processing, errors } = useForm({
        site_name: settings.site_name || 'Tryout UTBK',
        site_description: settings.site_description || 'Platform Tryout UTBK Online',
        contact_email: settings.contact_email || '',
        max_violations: settings.max_violations || 3,
        enable_proctoring: settings.enable_proctoring ?? true,
        enable_fullscreen: settings.enable_fullscreen ?? true,
        default_duration: settings.default_duration || 120,
        passing_score: settings.passing_score || 60,
        maintenance_mode: settings.maintenance_mode ?? false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    const tabs = [
        { id: 'general', label: 'Umum', icon: '⚙️' },
        { id: 'exam', label: 'Ujian', icon: '📝' },
        { id: 'security', label: 'Keamanan', icon: '🔒' },
        { id: 'email', label: 'Email', icon: '📧' },
    ];

    return (
        <AdminLayout>
            <Head title="Pengaturan" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
                    <p className="mt-1 text-gray-500">Konfigurasi platform tryout</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-64 flex-shrink-0">
                        <nav className="bg-white rounded-xl shadow-sm p-2 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="mr-3">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Settings Form */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm">
                            {/* General Settings */}
                            {activeTab === 'general' && (
                                <div className="p-6 space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Pengaturan Umum</h2>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Situs
                                        </label>
                                        <input
                                            type="text"
                                            value={data.site_name}
                                            onChange={(e) => setData('site_name', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        {errors.site_name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.site_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Deskripsi Situs
                                        </label>
                                        <textarea
                                            value={data.site_description}
                                            onChange={(e) => setData('site_description', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Kontak
                                        </label>
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="admin@example.com"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-yellow-800">Mode Maintenance</h3>
                                            <p className="text-sm text-yellow-600">
                                                Aktifkan untuk menutup akses publik sementara
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setData('maintenance_mode', !data.maintenance_mode)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                data.maintenance_mode ? 'bg-yellow-500' : 'bg-gray-200'
                                            }`}
                                        >
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                                    data.maintenance_mode ? 'translate-x-5' : 'translate-x-0'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Exam Settings */}
                            {activeTab === 'exam' && (
                                <div className="p-6 space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Pengaturan Ujian</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Durasi Default (menit)
                                            </label>
                                            <input
                                                type="number"
                                                value={data.default_duration}
                                                onChange={(e) => setData('default_duration', parseInt(e.target.value))}
                                                min="10"
                                                max="300"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nilai Kelulusan (%)
                                            </label>
                                            <input
                                                type="number"
                                                value={data.passing_score}
                                                onChange={(e) => setData('passing_score', parseInt(e.target.value))}
                                                min="0"
                                                max="100"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-medium text-gray-900 mb-4">Opsi Default Tryout</h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={true}
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    disabled
                                                />
                                                <span className="ml-3 text-sm text-gray-600">
                                                    Acak urutan soal
                                                </span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={true}
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    disabled
                                                />
                                                <span className="ml-3 text-sm text-gray-600">
                                                    Tampilkan hasil setelah selesai
                                                </span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={true}
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    disabled
                                                />
                                                <span className="ml-3 text-sm text-gray-600">
                                                    Izinkan review jawaban
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeTab === 'security' && (
                                <div className="p-6 space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Pengaturan Keamanan</h2>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Batas Maksimal Pelanggaran
                                        </label>
                                        <input
                                            type="number"
                                            value={data.max_violations}
                                            onChange={(e) => setData('max_violations', parseInt(e.target.value))}
                                            min="1"
                                            max="10"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Peserta akan didiskualifikasi setelah mencapai batas ini
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Deteksi Kecurangan</h3>
                                                <p className="text-sm text-gray-500">
                                                    Pantau tab switching, copy-paste, dll
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setData('enable_proctoring', !data.enable_proctoring)}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                    data.enable_proctoring ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                                        data.enable_proctoring ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Mode Fullscreen</h3>
                                                <p className="text-sm text-gray-500">
                                                    Paksa tampilan layar penuh saat ujian
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setData('enable_fullscreen', !data.enable_fullscreen)}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                    data.enable_fullscreen ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                                        data.enable_fullscreen ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <h3 className="font-medium text-red-800 mb-2">⚠️ Fitur Anti-Cheat Aktif</h3>
                                        <ul className="text-sm text-red-600 space-y-1">
                                            <li>• Deteksi perpindahan tab/window</li>
                                            <li>• Blokir copy, paste, cut</li>
                                            <li>• Blokir shortcut keyboard (Ctrl+C, F12, dll)</li>
                                            <li>• Deteksi DevTools</li>
                                            <li>• Sinkronisasi timer dengan server</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Email Settings */}
                            {activeTab === 'email' && (
                                <div className="p-6 space-y-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Pengaturan Email</h2>
                                    
                                    <div className="p-8 text-center bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Konfigurasi SMTP</h3>
                                        <p className="text-gray-500 mb-4">
                                            Pengaturan email dikonfigurasi melalui file .env
                                        </p>
                                        <code className="block p-4 bg-gray-100 rounded-lg text-left text-sm text-gray-600 overflow-x-auto">
                                            MAIL_MAILER=smtp<br />
                                            MAIL_HOST=smtp.mailgun.org<br />
                                            MAIL_PORT=587<br />
                                            MAIL_USERNAME=<br />
                                            MAIL_PASSWORD=<br />
                                            MAIL_ENCRYPTION=tls
                                        </code>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="px-6 py-4 bg-gray-50 border-t rounded-b-xl flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
