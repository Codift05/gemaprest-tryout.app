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

        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
                <nav className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img src="/logo.png" alt="Gemaprest" className="w-9 h-9 group-hover:scale-110 transition-transform" />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:gap-1">
                            {auth.user && navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                        route().current(item.href)
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
                                        className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <span className="text-xs font-bold">
                                                {auth.user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-blue-700">{auth.user.name}</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href={route('login')} className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
                                        Masuk
                                    </Link>
                                    <Link href={route('register')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm shadow-sm transition-all hover:shadow-md">
                                        Daftar
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                type="button"
                                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
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
                        <div className="md:hidden py-4 border-t border-gray-100">
                            <div className="flex flex-col gap-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={clsx(
                                            'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                                            route().current(item.href)
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 text-left"
                                >
                                    Keluar
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Gemaprest" className="w-8 h-8 opacity-80" />
                            <p className="text-sm text-gray-500">
                                © {new Date().getFullYear()} Gemaprest Tryout.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                Bantuan
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                Kebijakan Privasi
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
