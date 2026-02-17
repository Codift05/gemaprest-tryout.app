import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon,
    ArrowLeftIcon,
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
        <MainLayout>
            <Head title="Edit Profil" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-4 transition-colors font-medium text-sm"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali ke Dashboard
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Profil</h1>
                    <p className="text-gray-500 mt-2">Perbarui informasi pribadi dan keamanan akun Anda.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Profile Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                <UserCircleIcon className="w-5 h-5 text-blue-600" />
                                Informasi Pribadi
                            </h2>
                        </div>
                        <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                            {/* Name */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Nama Lengkap
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`pl-10 block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="Nama Lengkap Anda"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`pl-10 block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="email@contoh.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Nomor Telepon
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="pl-10 block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="081234567890"
                                    />
                                </div>
                            </div>

                            {/* School */}
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Asal Sekolah
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.school}
                                        onChange={(e) => setData('school', e.target.value)}
                                        className="pl-10 block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Nama Sekolah Anda"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Change */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                Keamanan Akun
                            </h2>
                        </div>
                        <div className="p-4 md:p-8 space-y-5 md:space-y-6">
                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-blue-700 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                                    </svg>
                                    Kosongkan kolom password jika Anda tidak ingin mengubah password saat ini.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Password Baru
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="Minimal 8 karakter"
                                    />
                                    {errors.password && (
                                        <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Ulangi password baru"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Link
                            href={route('dashboard')}
                            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg text-sm flex items-center gap-2"
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
