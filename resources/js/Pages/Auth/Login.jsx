import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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

    const benefits = [
        'Akses unlimited ke semua tryout',
        'Pembahasan lengkap setiap soal',
        'Analisis performa real-time',
        'Leaderboard nasional'
    ];

    return (
        <>
            <Head title="Masuk" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
                body {
                    font-family: 'Montserrat', sans-serif;
                }
            `}</style>

            <div className="min-h-screen flex relative overflow-hidden bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {/* Left Side - Form */}
                <div className="flex-1 flex items-center justify-center p-8 relative z-10">
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 mb-8">
                            <img src="/logo.png" alt="Gemaprest" className="h-10 w-auto" />
                            <span className="font-bold text-lg text-gray-900">
                                Gemaprest Tryout
                            </span>
                        </Link>

                        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                            <h1 className="text-xl font-bold text-gray-900">Masuk ke akun Anda</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Belum punya akun?{' '}
                                <Link href={route('register')} className="text-blue-600 hover:text-blue-700 font-medium">
                                    Daftar sekarang
                                </Link>
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="nama@email.com"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-xs font-semibold text-gray-900 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className={`w-full px-4 py-2.5 pr-12 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
                                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-xs text-gray-600">Ingat saya</span>
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Lupa password?
                                    </Link>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm mt-6"
                                >
                                    {processing ? 'Memproses...' : 'Masuk'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Side - Visual with Logos */}
                <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center p-12 relative border-l border-gray-200">
                    {/* Organizational Logos */}
                    <div className="absolute top-8 right-8 flex items-center gap-3">
                        <img src="/unsrat.png" alt="UNSRAT" className="h-12 w-auto" />
                        <img src="/kabinet.png" alt="Kabinet" className="h-12 w-auto" />
                        <img src="/kse.png" alt="KSE" className="h-12 w-auto" />
                        <img src="/kseunsrat.png" alt="KSE UNSRAT" className="h-12 w-auto" />
                    </div>

                    <div className="max-w-lg text-center relative z-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Persiapkan UTBK Anda
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-10">
                            Latihan soal lengkap dengan pembahasan dan leaderboard untuk mengukur kemampuan Anda bersama ribuan peserta lainnya.
                        </p>

                        {/* Benefits */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-left">
                            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Yang akan kamu dapatkan:</h3>
                            <div className="space-y-3">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                        <span className="text-sm">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
