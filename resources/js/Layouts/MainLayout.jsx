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
            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 md:h-20 justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img src="/logo.png" alt="Gemaprest" className="w-9 h-9 md:w-11 md:h-11 group-hover:scale-105 transition-transform duration-300" />
                                <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Gemaprest</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:gap-2">
                            {auth.user && navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300',
                                        route().current(item.href)
                                            ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100/50'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 hover:shadow-sm'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Menu as="div" className="relative ml-5">
                                    <div>
                                        <Menu.Button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/50 shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-100 text-emerald-700 flex items-center justify-center border border-emerald-200/60 group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                                <span className="text-xs md:text-sm font-bold">
                                                    {auth.user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="hidden sm:block text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">
                                                {auth.user.name}
                                            </span>
                                            <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-2xl bg-white/90 backdrop-blur-md py-2 shadow-xl shadow-gray-200/50 ring-1 ring-black/5 focus:outline-none border border-white">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href={route('profile.edit')}
                                                        className={clsx(
                                                            active ? 'bg-gray-50/80 text-emerald-600' : 'text-gray-600',
                                                            'flex items-center px-5 py-2.5 text-sm font-medium transition-colors'
                                                        )}
                                                    >
                                                        Profil Saya
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <div className="border-t border-gray-100 my-1 mx-2" />
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href={route('logout')}
                                                        method="post"
                                                        as="button"
                                                        className={clsx(
                                                            active ? 'bg-red-50 text-red-600' : 'text-gray-600',
                                                            'flex w-full items-center text-left px-5 py-2.5 text-sm font-medium transition-colors'
                                                        )}
                                                    >
                                                        Keluar
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href={route('login')} className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors rounded-xl hover:bg-gray-50/80">
                                        Masuk
                                    </Link>
                                    <Link href={route('register')} className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover:-translate-y-0.5">
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
            <main className={isFullWidth ? "w-full pt-16 md:pt-20" : "mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28"}>
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
