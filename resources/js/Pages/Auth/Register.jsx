import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        school: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Daftar" />

            <div className="min-h-screen flex">
                {/* Left Side - Image/Illustration */}
                <div className="hidden lg:flex flex-1 bg-indigo-600 items-center justify-center p-12">
                    <div className="max-w-lg text-center">
                        <div className="mb-8">
                            <svg className="w-48 h-48 mx-auto text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Bergabung Sekarang
                        </h2>
                        <p className="text-indigo-200 text-lg">
                            Akses ribuan soal tryout UTBK dengan penilaian otomatis dan pembahasan lengkap.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">T</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">
                                Tryout UTBK
                            </span>
                        </Link>

                        <h1 className="text-2xl font-bold text-gray-900">Buat akun baru</h1>
                        <p className="mt-2 text-gray-600">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="text-indigo-600 hover:underline">
                                Masuk
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="label">
                                    Nama Lengkap
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`input ${errors.name ? 'input-error' : ''}`}
                                    placeholder="Nama lengkap Anda"
                                    autoFocus
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="label">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`input ${errors.email ? 'input-error' : ''}`}
                                    placeholder="nama@email.com"
                                    autoComplete="email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone & School */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="label">
                                        No. HP (opsional)
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={`input ${errors.phone ? 'input-error' : ''}`}
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="school" className="label">
                                        Asal Sekolah (opsional)
                                    </label>
                                    <input
                                        id="school"
                                        type="text"
                                        value={data.school}
                                        onChange={(e) => setData('school', e.target.value)}
                                        className={`input ${errors.school ? 'input-error' : ''}`}
                                        placeholder="Nama sekolah"
                                    />
                                    {errors.school && (
                                        <p className="mt-1 text-sm text-red-600">{errors.school}</p>
                                    )}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="label">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
                                        placeholder="Minimal 8 karakter"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="password_confirmation" className="label">
                                    Konfirmasi Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="input"
                                    placeholder="Ulangi password"
                                    autoComplete="new-password"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary w-full"
                            >
                                {processing ? 'Memproses...' : 'Daftar'}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Dengan mendaftar, Anda menyetujui{' '}
                                <a href="#" className="text-indigo-600 hover:underline">
                                    Syarat & Ketentuan
                                </a>{' '}
                                dan{' '}
                                <a href="#" className="text-indigo-600 hover:underline">
                                    Kebijakan Privasi
                                </a>{' '}
                                kami.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
