import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import {
    Cog6ToothIcon,
    AcademicCapIcon,
    ShieldCheckIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function SettingsIndex({ settings = {} }) {
    const [activeTab, setActiveTab] = useState('general');

    const { data, setData, post, processing, errors } = useForm({
        site_name: settings.site_name || 'Gemaprest Tryout',
        site_description: settings.site_description || 'Platform Tryout UTBK Online - Gemaprest',
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
        { id: 'general', label: 'Umum', icon: Cog6ToothIcon },
        { id: 'exam', label: 'Ujian', icon: AcademicCapIcon },
        { id: 'security', label: 'Keamanan', icon: ShieldCheckIcon },
        { id: 'email', label: 'Email', icon: EnvelopeIcon },
    ];

    return (
        <AdminLayout title="Pengaturan">
            <Head title="Pengaturan" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
                    <p className="mt-1 text-gray-500">Konfigurasi sistem & preferensi aplikasi</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-64 flex-shrink-0">
                        <nav className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                                : 'text-gray-600 hover:bg-white hover:text-indigo-600'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'}`} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Settings Form */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
                            {/* General Settings */}
                            {activeTab === 'general' && (
                                <div className="p-8 space-y-8 flex-1">
                                    <div className="border-b border-gray-100 pb-5">
                                        <h2 className="text-lg font-bold text-gray-900">Pengaturan Umum</h2>
                                        <p className="text-sm text-gray-500 mt-1">Informasi dasar situs dan mode pemeliharaan</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Nama Situs
                                            </label>
                                            <input
                                                type="text"
                                                value={data.site_name}
                                                onChange={(e) => setData('site_name', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                                placeholder="Contoh: Gemaprest Tryout"
                                            />
                                            {errors.site_name && (
                                                <p className="mt-1 text-xs text-red-500 font-medium">{errors.site_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Deskripsi Situs
                                            </label>
                                            <textarea
                                                value={data.site_description}
                                                onChange={(e) => setData('site_description', e.target.value)}
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all resize-none"
                                                placeholder="Deskripsi singkat tentang platform..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Kontak
                                            </label>
                                            <input
                                                type="email"
                                                value={data.contact_email}
                                                onChange={(e) => setData('contact_email', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                                placeholder="admin@example.com"
                                            />
                                        </div>

                                        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                                        <ExclamationTriangleIcon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-amber-900">Mode Maintenance</h3>
                                                        <p className="text-sm text-amber-700 mt-1">
                                                            Aktifkan untuk menutup akses publik sementara saat perbaikan.
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('maintenance_mode', !data.maintenance_mode)}
                                                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${data.maintenance_mode ? 'bg-amber-500' : 'bg-gray-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.maintenance_mode ? 'translate-x-5' : 'translate-x-0'
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Exam Settings */}
                            {activeTab === 'exam' && (
                                <div className="p-8 space-y-8 flex-1">
                                    <div className="border-b border-gray-100 pb-5">
                                        <h2 className="text-lg font-bold text-gray-900">Pengaturan Ujian</h2>
                                        <p className="text-sm text-gray-500 mt-1">Parameter default untuk sesi ujian baru</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Durasi Default (menit)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={data.default_duration}
                                                    onChange={(e) => setData('default_duration', parseInt(e.target.value) || 0)}
                                                    min="10"
                                                    max="300"
                                                    className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">min</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Nilai Kelulusan (%)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={data.passing_score}
                                                    onChange={(e) => setData('passing_score', parseInt(e.target.value) || 0)}
                                                    min="0"
                                                    max="100"
                                                    className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-4">Opsi Default Tryout</h3>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Acak urutan soal', description: 'Soal akan muncul dengan urutan berbeda tiap peserta' },
                                                { label: 'Tampilkan hasil setelah selesai', description: 'Peserta dapat melihat nilai langsung' },
                                                { label: 'Izinkan review jawaban', description: 'Peserta dapat melihat pembahasan setelah ujian' }
                                            ].map((option, idx) => (
                                                <label key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 opacity-70 cursor-not-allowed">
                                                    <input
                                                        type="checkbox"
                                                        checked={true}
                                                        className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        disabled
                                                    />
                                                    <div>
                                                        <span className="block text-sm font-semibold text-gray-700">
                                                            {option.label}
                                                        </span>
                                                        <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                                                    </div>
                                                </label>
                                            ))}
                                            <p className="text-xs text-center text-gray-400 mt-2">
                                                *Opsi ini diatur secara individual saat membuat Paket Tryout
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeTab === 'security' && (
                                <div className="p-8 space-y-8 flex-1">
                                    <div className="border-b border-gray-100 pb-5">
                                        <h2 className="text-lg font-bold text-gray-900">Pengaturan Keamanan</h2>
                                        <p className="text-sm text-gray-500 mt-1">Konfigurasi anti-cheat dan integritas ujian</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Batas Maksimal Pelanggaran
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="number"
                                                value={data.max_violations}
                                                onChange={(e) => setData('max_violations', parseInt(e.target.value) || 0)}
                                                min="1"
                                                max="10"
                                                className="w-24 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                            />
                                            <span className="text-sm text-gray-500">kali peringatan sebelum diskualifikasi</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                                            <div>
                                                <h3 className="font-bold text-gray-900">Deteksi Kecurangan</h3>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Pantau tab switching & copy-paste
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setData('enable_proctoring', !data.enable_proctoring)}
                                                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${data.enable_proctoring ? 'bg-indigo-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.enable_proctoring ? 'translate-x-5' : 'translate-x-0'
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                                            <div>
                                                <h3 className="font-bold text-gray-900">Mode Fullscreen</h3>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Paksa layar penuh saat ujian
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setData('enable_fullscreen', !data.enable_fullscreen)}
                                                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${data.enable_fullscreen ? 'bg-indigo-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.enable_fullscreen ? 'translate-x-5' : 'translate-x-0'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                                        <div className="flex gap-3">
                                            <ShieldCheckIcon className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="text-sm font-bold text-rose-800">Proteksi Aktif</h3>
                                                <ul className="mt-2 space-y-1 text-xs text-rose-700 font-medium">
                                                    <li>• Deteksi perpindahan tab/window</li>
                                                    <li>• Blokir copy, paste, cut</li>
                                                    <li>• Blokir shortcut keyboard (Ctrl+C, F12, dll)</li>
                                                    <li>• Deteksi DevTools</li>
                                                    <li>• Sinkronisasi timer dengan server</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Email Settings */}
                            {activeTab === 'email' && (
                                <div className="p-8 space-y-8 flex-1">
                                    <div className="border-b border-gray-100 pb-5">
                                        <h2 className="text-lg font-bold text-gray-900">Pengaturan Email</h2>
                                        <p className="text-sm text-gray-500 mt-1">Konfigurasi SMTP server untuk notifikasi</p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                                            <EnvelopeIcon className="w-10 h-10 text-indigo-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Konfigurasi SMTP</h3>
                                        <p className="text-gray-500 mb-6 text-center max-w-md text-sm">
                                            Untuk keamanan, konfigurasi email dikelola secara langsung melalui file environment (.env) di server.
                                        </p>
                                        <div className="w-full max-w-md bg-gray-800 rounded-xl p-5 text-left shadow-lg">
                                            <div className="flex gap-1.5 mb-4">
                                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            </div>
                                            <code className="text-xs font-mono text-gray-300 space-y-1 block">
                                                <div><span className="text-indigo-400">MAIL_MAILER</span>=smtp</div>
                                                <div><span className="text-indigo-400">MAIL_HOST</span>=smtp.mailgun.org</div>
                                                <div><span className="text-indigo-400">MAIL_PORT</span>=587</div>
                                                <div><span className="text-indigo-400">MAIL_USERNAME</span>=...</div>
                                                <div><span className="text-indigo-400">MAIL_PASSWORD</span>=...</div>
                                                <div><span className="text-indigo-400">MAIL_ENCRYPTION</span>=tls</div>
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 rounded-b-2xl flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm shadow-indigo-200"
                                >
                                    {processing ? 'Menyimpan Perubahan...' : 'Simpan Pengaturan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
