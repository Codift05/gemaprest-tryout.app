import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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

    const benefits = [
        'Akses unlimited ke semua tryout',
        'Pembahasan lengkap setiap soal',
        'Analisis performa real-time',
        'Leaderboard nasional'
    ];

    return (
        <>
            <Head title="Daftar" />

            <div className="min-h-screen flex relative overflow-hidden bg-slate-50">
                {/* Decorative Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-300/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/15 to-emerald-300/15 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-teal-400/10 to-cyan-300/10 rounded-full blur-3xl" />
                </div>

                {/* Left Side - Visual */}
                <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 items-center justify-center p-12 relative">
                    {/* Decorative elements */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                    
                    <div className="max-w-lg text-center relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/90 mb-8 border border-white/20">
                            <SparklesIcon className="h-4 w-4" />
                            Gratis Selamanya
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Bergabung Sekarang
                        </h2>
                        <p className="text-emerald-100 text-lg leading-relaxed mb-10">
                            Akses ribuan soal tryout UTBK dengan penilaian otomatis dan pembahasan lengkap.
                        </p>

                        {/* Benefits */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-left">
                            <h3 className="font-semibold text-white mb-4">Yang akan kamu dapatkan:</h3>
                            <div className="space-y-3">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 text-white/90">
                                        <CheckCircleIcon className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                        <span className="text-sm">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
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
                            <h1 className="text-2xl font-bold text-gray-900">Buat akun baru</h1>
                            <p className="mt-2 text-gray-600">
                                Sudah punya akun?{' '}
                                <Link href={route('login')} className="text-emerald-600 hover:text-emerald-700 font-medium">
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
                                            className={`input pr-12 ${errors.password ? 'input-error' : ''}`}
                                            placeholder="Minimal 8 karakter"
                                            autoComplete="new-password"
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
                                    className="btn btn-primary w-full btn-lg"
                                >
                                    {processing ? 'Memproses...' : 'Daftar Gratis'}
                                </button>

                                <p className="text-xs text-gray-500 text-center">
                                    Dengan mendaftar, Anda menyetujui{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                        Syarat & Ketentuan
                                    </a>{' '}
                                    dan{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                        Kebijakan Privasi
                                    </a>{' '}
                                    kami.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
