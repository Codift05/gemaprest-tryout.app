import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function MainLayout({ children, title }) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = auth.user?.role === 'admin'
        ? [
            { name: 'Dashboard', href: route('admin.dashboard') },
            { name: 'Tryout', href: route('admin.tryouts.index') },
            { name: 'Soal', href: route('admin.questions.index') },
            { name: 'Kategori', href: route('admin.categories.index') },
            { name: 'Pengguna', href: route('admin.users.index') },
        ]
        : [
            { name: 'Dashboard', href: route('dashboard') },
            { name: 'Tryout', href: route('tryouts.index') },
            { name: 'Riwayat', href: route('history.index') },
        ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="glass sticky top-0 z-40 border-b border-white/20">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img src="/logo.png" alt="Gemaprest" className="w-10 h-10 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                                    Gemaprest Tryout
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:gap-1">
                            {auth.user && navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                                        route().current(item.href)
                                            ? 'bg-primary-100 text-primary-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 glass-card px-3 py-2 rounded-xl"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="hidden sm:block font-medium">{auth.user.name}</span>
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="btn-secondary px-4 py-2 rounded-xl text-sm font-medium"
                                    >
                                        Keluar
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href={route('login')} className="btn-secondary px-4 py-2 rounded-xl text-sm font-medium">
                                        Masuk
                                    </Link>
                                    <Link href={route('register')} className="btn-primary px-4 py-2 rounded-xl text-sm font-medium">
                                        Daftar
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                type="button"
                                className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100/50"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <XMarkIcon className="w-6 h-6" />
                                ) : (
                                    <Bars3Icon className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && auth.user && (
                        <div className="md:hidden py-4 border-t border-white/20">
                            <div className="flex flex-col gap-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={clsx(
                                            'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                                            route().current(item.href)
                                                ? 'bg-primary-100 text-primary-700'
                                                : 'text-gray-600 hover:bg-gray-100/50'
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Page Title */}
            {title && (
                <div className="glass border-b border-white/20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="glass border-t border-white/20 mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Gemaprest" className="w-8 h-8" />
                            <p className="text-sm text-gray-600">
                                © {new Date().getFullYear()} Gemaprest Tryout. All rights reserved.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                Bantuan
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                Syarat & Ketentuan
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
