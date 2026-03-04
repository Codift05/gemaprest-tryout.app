import { Link, usePage } from '@inertiajs/react';
import { useState, Fragment } from 'react'; // Added Fragment
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Added ChevronDownIcon
import { Menu, Transition } from '@headlessui/react'; // Added Menu, Transition
import clsx from 'clsx';

export default function MainLayout({ children, title, isFullWidth = false }) {
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

        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col overflow-x-hidden">
            {/* Simplified Background */}
            <div className="fixed inset-0 -z-10 bg-gray-50 pointer-events-none"></div>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-all duration-300">
                <nav className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    <div className="flex h-[60px] md:h-[68px] justify-between items-center">
                        <div className="flex items-center gap-6 md:gap-10 h-full">
                            {/* Logo */}
                            <Link href={route('dashboard')} className="flex items-center gap-2 group">
                                <img src="/logo.png" alt="Gemaprest" className="w-8 h-8 md:w-9 md:h-9" />
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex md:items-center gap-6 h-full">
                                {auth.user && navigation.map((item) => {
                                    const isActive = route().current(item.href);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={clsx(
                                                'relative h-full flex items-center text-[14px] md:text-[15px] transition-colors',
                                                isActive
                                                    ? 'text-gray-900 font-bold'
                                                    : 'text-gray-500 hover:text-gray-900 font-medium'
                                            )}
                                        >
                                            {item.name}
                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-900 rounded-t-sm" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right side: User Menu & Mobile Toggle */}
                        <div className="flex items-center gap-3 md:gap-4 h-full">
                            {auth.user ? (
                                <div className="flex items-center h-full gap-4 md:gap-6">
                                    {/* Notifications hidden on very small screens */}
                                    <div className="hidden sm:flex items-center gap-4 border-r border-gray-200 pr-4 md:pr-5 h-8">
                                        <button className="text-gray-500 hover:text-gray-900 transition-colors">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                            </svg>
                                        </button>
                                    </div>

                                    <Menu as="div" className="relative flex items-center">
                                        <Menu.Button className="flex items-center gap-2 focus:outline-none group py-2">
                                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                                                <span className="text-sm font-bold">
                                                    {auth.user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" aria-hidden="true" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none border border-gray-100">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{auth.user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                                                </div>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={route('profile.edit')}
                                                            className={clsx(
                                                                active ? 'bg-gray-50 text-emerald-600' : 'text-gray-700',
                                                                'block px-4 py-2.5 text-sm transition-colors'
                                                            )}
                                                        >
                                                            Profil Saya
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={route('logout')}
                                                            method="post"
                                                            as="button"
                                                            className={clsx(
                                                                active ? 'bg-red-50 text-red-600' : 'text-gray-700',
                                                                'block w-full text-left px-4 py-2.5 text-sm transition-colors'
                                                            )}
                                                        >
                                                            Keluar
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href={route('login')} className="hidden sm:block px-5 py-2.5 text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors rounded">
                                        Masuk
                                    </Link>
                                    <Link href={route('register')} className="px-5 py-2 overflow-hidden bg-gray-900 hover:bg-gray-800 text-white rounded font-semibold text-sm transition-all shadow-sm">
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

                    {/* Mobile Navigation Dropdown */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4 border-t border-gray-100 pt-2 bg-white">
                            <div className="flex flex-col gap-1">
                                {auth.user ? (
                                    navigation.map((item) => {
                                        const isActive = route().current(item.href);
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={clsx(
                                                    'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                                                    isActive
                                                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                )}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                    >
                                        Masuk
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className={isFullWidth ? "w-full pt-[60px] md:pt-[68px]" : "mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28"}>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center">
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
