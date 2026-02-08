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
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    'fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 transform transition-transform lg:translate-x-0',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between px-4 bg-indigo-950">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-indigo-600 font-bold text-lg">T</span>
                            </div>
                            <span className="font-bold text-lg text-white">Admin Panel</span>
                        </Link>
                        <button
                            className="lg:hidden text-white p-1"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <ul className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = route().current(item.href + '*');
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={route(item.href)}
                                            className={clsx(
                                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                                isActive
                                                    ? 'bg-indigo-800 text-white'
                                                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User info */}
                    <div className="p-4 border-t border-indigo-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-800 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                    {auth.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {auth.user?.name}
                                </p>
                                <p className="text-xs text-indigo-300 truncate">
                                    {auth.user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white shadow-sm">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>

                        <div className="flex-1 lg:flex-none">
                            {title && (
                                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href={route('dashboard')}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Ke Halaman Siswa
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
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
