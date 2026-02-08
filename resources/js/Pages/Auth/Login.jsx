import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline';

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

            <div className="min-h-screen flex relative overflow-hidden bg-slate-50">
                {/* Decorative Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-300/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/15 to-emerald-300/15 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-teal-400/10 to-cyan-300/10 rounded-full blur-3xl" />
                </div>

                {/* Left Side - Form */}
                <div className="flex-1 flex items-center justify-center p-8 relative z-10">
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 mb-10">
                            <img src="/logo.png" alt="Gemaprest" className="h-12 w-auto drop-shadow-sm" />
                            <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Gemaprest Tryout
                            </span>
                        </Link>

                        <div className="glass-card p-8">
                            <h1 className="text-2xl font-bold text-gray-900">Masuk ke akun Anda</h1>
                            <p className="mt-2 text-gray-600">
                                Belum punya akun?{' '}
                                <Link href={route('register')} className="text-emerald-600 hover:text-emerald-700 font-medium">
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
                                            className={`input pr-12 ${errors.password ? 'input-error' : ''}`}
                                            placeholder="Masukkan password"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
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
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-gray-600">Ingat saya</span>
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        Lupa password?
                                    </Link>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn btn-primary w-full btn-lg"
                                >
                                    {processing ? 'Memproses...' : 'Masuk'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Side - Visual */}
                <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 items-center justify-center p-12 relative">
                    {/* Decorative elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                    
                    <div className="max-w-lg text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/90 mb-8 border border-white/20">
                            <SparklesIcon className="h-4 w-4" />
                            Platform Tryout UTBK Terbaik
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Persiapkan UTBK Anda
                        </h2>
                        <p className="text-emerald-100 text-lg leading-relaxed">
                            Latihan soal lengkap dengan pembahasan dan leaderboard untuk mengukur kemampuan Anda bersama ribuan peserta lainnya.
                        </p>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-2xl font-bold text-white">50K+</div>
                                <div className="text-sm text-emerald-200">Pengguna</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-2xl font-bold text-white">10K+</div>
                                <div className="text-sm text-emerald-200">Soal</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <div className="text-2xl font-bold text-white">4.9</div>
                                <div className="text-sm text-emerald-200">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
