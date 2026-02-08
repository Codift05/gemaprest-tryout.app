import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Masuk" />

            <div className="min-h-screen flex">
                {/* Left Side - Form */}
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

                        <h1 className="text-2xl font-bold text-gray-900">Masuk ke akun Anda</h1>
                        <p className="mt-2 text-gray-600">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="text-indigo-600 hover:underline">
                                Daftar sekarang
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                                    autoFocus
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
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
                                        placeholder="••••••••"
                                        autoComplete="current-password"
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

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-600">Ingat saya</span>
                                </label>
                                <Link
                                    href="#"
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary w-full"
                            >
                                {processing ? 'Memproses...' : 'Masuk'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side - Image/Illustration */}
                <div className="hidden lg:flex flex-1 bg-indigo-600 items-center justify-center p-12">
                    <div className="max-w-lg text-center">
                        <div className="mb-8">
                            <svg className="w-48 h-48 mx-auto text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Persiapkan UTBK Anda
                        </h2>
                        <p className="text-indigo-200 text-lg">
                            Latihan soal lengkap dengan pembahasan dan leaderboard untuk mengukur kemampuan Anda.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
