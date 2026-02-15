import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    TagIcon,
    UsersIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navigation = [
    { name: 'Dashboard', href: 'admin.dashboard', icon: HomeIcon },
    { name: 'Paket Tryout', href: 'admin.tryouts.index', icon: DocumentTextIcon },
    { name: 'Bank Soal', href: 'admin.questions.index', icon: QuestionMarkCircleIcon },
    { name: 'Kategori', href: 'admin.categories.index', icon: TagIcon },
    { name: 'Pengguna', href: 'admin.users.index', icon: UsersIcon },
    { name: 'Laporan', href: 'admin.reports.index', icon: ChartBarIcon },
    { name: 'Pengaturan', href: 'admin.settings.index', icon: Cog6ToothIcon },
];

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 lg:translate-x-0 shadow-sm',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between px-6 border-b border-gray-50">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-3">
                            <img src="/kseunsrat.png" alt="Logo" className="h-10 w-auto" />
                        </Link>
                        <button
                            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4">
                        <ul className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = route().current(item.href + '*') || route().current(item.href);
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={route(item.href)}
                                            className={clsx(
                                                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                                                isActive
                                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                            )}
                                        >
                                            <item.icon className={clsx("w-5 h-5 transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-indigo-600")} />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User info */}
                    <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm group cursor-pointer">
                            <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                                {auth.user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                    {auth.user?.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {auth.user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16">
                    <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>

                        <div className="flex-1 lg:flex-none">
                            {title && (
                                <h1 className="text-lg font-bold text-gray-900 lg:hidden">{title}</h1>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href={route('dashboard')}
                                className="hidden sm:inline-flex text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                            >
                                Ke Halaman Siswa
                            </Link>
                            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Keluar</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
