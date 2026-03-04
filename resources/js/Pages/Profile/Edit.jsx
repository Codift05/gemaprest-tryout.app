import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon,
    LockClosedIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        school: user.school || '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('profile.update'));
    };

    return (
        <MainLayout isFullWidth={true}>
            <Head title="Edit Profil" />

            {/* Full-Width Emerald Header */}
            <div className="w-full bg-emerald-800 pt-8 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white text-sm font-medium mb-5 transition-colors"
                    >
                        ← Kembali ke Dashboard
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Edit Profil</h1>
                    <p className="text-emerald-300 text-sm">Perbarui informasi pribadi dan keamanan akun kamu.</p>
                </div>
            </div>

            {/* Main Content (Overlapping) */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 pb-12">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Personal Info Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <UserCircleIcon className="w-4 h-4 text-emerald-600" />
                            </div>
                            <h2 className="font-semibold text-gray-800 text-sm">Informasi Pribadi</h2>
                        </div>

                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {/* Name */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Nama Lengkap
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircleIcon className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`pl-9 block w-full rounded-xl border bg-gray-50 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="Nama lengkap kamu"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`pl-9 block w-full rounded-xl border bg-gray-50 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="email@contoh.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Nomor Telepon
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="pl-9 block w-full rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                        placeholder="081234567890"
                                    />
                                </div>
                            </div>

                            {/* School */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Asal Sekolah
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AcademicCapIcon className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.school}
                                        onChange={(e) => setData('school', e.target.value)}
                                        className="pl-9 block w-full rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                        placeholder="Nama sekolah kamu"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                                <LockClosedIcon className="w-4 h-4 text-gray-500" />
                            </div>
                            <h2 className="font-semibold text-gray-800 text-sm">Keamanan Akun</h2>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex items-start gap-3 px-3.5 py-3 bg-gray-50 rounded-xl border border-gray-100">
                                <InformationCircleIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Kosongkan kolom password jika kamu tidak ingin mengubah password saat ini.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Password Baru
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`block w-full rounded-xl border bg-gray-50 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all px-3 py-2.5 ${errors.password ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="Minimal 8 karakter"
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="block w-full rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all px-3 py-2.5"
                                        placeholder="Ulangi password baru"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-1">
                        <Link
                            href={route('dashboard')}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan Perubahan'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
