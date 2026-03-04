import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, SparklesIcon, CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

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

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
                body {
                    font-family: 'Montserrat', sans-serif;
                }
            `}</style>

            <div className="min-h-screen flex relative overflow-hidden bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {/* Left Side - Visual with Logos */}
                <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center p-12 relative border-r border-gray-200">
                    {/* Organizational Logos */}
                    <div className="absolute top-8 left-8 flex items-center gap-3">
                        <img src="/unsrat.png" alt="UNSRAT" className="h-12 w-auto" />
                        <img src="/logo.png" alt="Gemaprest" className="h-12 w-auto" />
                        <img src="/kseunsrat.png" alt="KSE UNSRAT" className="h-12 w-auto" />
                        <img src="/kse.png" alt="KSE" className="h-12 w-auto" />
                    </div>


                    <div className="max-w-lg text-center relative z-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Bergabung Sekarang
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-10">
                            Akses ribuan soal tryout UTBK dengan penilaian otomatis dan pembahasan lengkap.
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

                {/* Right Side - Form */}
                <div className="flex-1 flex items-center justify-center px-4 py-6 sm:p-8 relative z-10">
                    <div className="w-full max-w-sm sm:max-w-md">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Kembali ke Beranda
                        </Link>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
                            <img src="/logo.png" alt="Gemaprest" className="h-8 sm:h-10 w-auto" />
                            <span className="font-bold text-base sm:text-lg text-gray-900">
                                Gemaprest Tryout
                            </span>
                        </Link>

                        <div className="bg-white rounded-xl p-5 sm:p-8 border border-gray-200 shadow-sm">
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Buat akun baru</h1>
                            <p className="mt-1.5 sm:mt-2 text-sm text-gray-600">
                                Sudah punya akun?{' '}
                                <Link href={route('login')} className="text-blue-600 hover:text-blue-700 font-medium">
                                    Masuk
                                </Link>
                            </p>

                            <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-xs font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Nama lengkap Anda"
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="nama@email.com"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone & School */}
                                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                    <div>
                                        <label htmlFor="phone" className="block text-xs font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                            No. HP <span className="font-normal text-gray-500 hidden sm:inline">(opsional)</span>
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="08xxx"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="school" className="block text-xs font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                            Sekolah <span className="font-normal text-gray-500 hidden sm:inline">(opsional)</span>
                                        </label>
                                        <input
                                            id="school"
                                            type="text"
                                            value={data.school}
                                            onChange={(e) => setData('school', e.target.value)}
                                            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.school ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Sekolah"
                                        />
                                        {errors.school && (
                                            <p className="mt-1 text-xs text-red-600">{errors.school}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-xs font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Min. 8 karakter"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            ) : (
                                                <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="password_confirmation" className="block text-xs font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Ulangi password"
                                        autoComplete="new-password"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-colors text-sm mt-4 sm:mt-6"
                                >
                                    {processing ? 'Memproses...' : 'Daftar Gratis'}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
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
