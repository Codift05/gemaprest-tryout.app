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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">T</span>
                                </div>
                                <span className="font-bold text-xl text-gray-900">
                                    Tryout UTBK
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:gap-6">
                            {auth.user && navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        'text-sm font-medium transition-colors',
                                        route().current(item.href)
                                            ? 'text-indigo-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        <UserCircleIcon className="w-8 h-8 text-gray-400" />
                                        <span className="hidden sm:block">{auth.user.name}</span>
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="btn btn-secondary btn-sm"
                                    >
                                        Keluar
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href={route('login')} className="btn btn-secondary btn-sm">
                                        Masuk
                                    </Link>
                                    <Link href={route('register')} className="btn btn-primary btn-sm">
                                        Daftar
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                type="button"
                                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
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
                        <div className="md:hidden py-4 border-t">
                            <div className="flex flex-col gap-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={clsx(
                                            'px-3 py-2 rounded-lg text-sm font-medium',
                                            route().current(item.href)
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50'
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
                <div className="bg-white border-b">
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
            <footer className="bg-white border-t mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Tryout UTBK. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Bantuan
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Syarat & Ketentuan
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
