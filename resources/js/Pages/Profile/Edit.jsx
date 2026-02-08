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

            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali ke Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Profil</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Info */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Informasi Profil</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap
                                </label>
                                <div className="relative">
                                    <UserCircleIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`input pl-10 w-full ${errors.name ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`input pl-10 w-full ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    No. Telepon
                                </label>
                                <div className="relative">
                                    <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="input pl-10 w-full"
                                        placeholder="081234567890"
                                    />
                                </div>
                            </div>

                            {/* School */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Asal Sekolah
                                </label>
                                <div className="relative">
                                    <AcademicCapIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={data.school}
                                        onChange={(e) => setData('school', e.target.value)}
                                        className="input pl-10 w-full"
                                        placeholder="SMA Negeri 1 Jakarta"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Change */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Ubah Password</h2>
                            <p className="text-sm text-gray-500">
                                Kosongkan jika tidak ingin mengubah password
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password Baru
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`input w-full ${errors.password ? 'border-red-500' : ''}`}
                                    placeholder="Minimal 8 karakter"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="input w-full"
                                    placeholder="Ulangi password baru"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('dashboard')} className="btn btn-secondary">
                            Batal
                        </Link>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
