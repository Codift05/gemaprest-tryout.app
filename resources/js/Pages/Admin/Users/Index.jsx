import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    ShieldCheckIcon,
    AcademicCapIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        school: '',
        password: '',
        password_confirmation: '',
        role: 'siswa',
    });

    const handleSearch = () => {
        router.get(route('admin.users.index'), {
            search,
            role: roleFilter,
        }, { preserveState: true });
    };

    const openModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            form.setData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                school: user.school || '',
                password: '',
                password_confirmation: '',
                role: user.role,
            });
        } else {
            setEditingUser(null);
            form.reset();
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            form.put(route('admin.users.update', editingUser.id), {
                onSuccess: () => setShowModal(false),
            });
        } else {
            form.post(route('admin.users.store'), {
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleDelete = (user) => {
        if (confirm(`Hapus user "${user.name}"? Semua data terkait akan ikut terhapus.`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const getRoleBadge = (role) => {
        if (role === 'admin') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-fuchsia-50 text-fuchsia-700 rounded-lg text-xs font-semibold border border-fuchsia-100">
                    <ShieldCheckIcon className="w-3.5 h-3.5" />
                    Admin
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">
                <AcademicCapIcon className="w-3.5 h-3.5" />
                Siswa
            </span>
        );
    };

    return (
        <AdminLayout title="Kelola Pengguna">
            <Head title="Kelola Pengguna" />

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Pengguna</h1>
                    <p className="text-gray-500 mt-1">{users.total} pengguna terdaftar di sistem.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                >
                    <PlusIcon className="w-5 h-5" />
                    Tambah Pengguna
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama, email, atau sekolah..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    <div className="flex gap-3">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all min-w-[150px] cursor-pointer"
                        >
                            <option value="">Semua Role</option>
                            <option value="admin">Admin</option>
                            <option value="siswa">Siswa</option>
                        </select>

                        <button
                            onClick={handleSearch}
                            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {users.data.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserCircleIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Tidak Ada Pengguna
                        </h3>
                        <p className="text-gray-500">
                            {search || roleFilter ? 'Coba ubah filter pencarian Anda' : 'Belum ada pengguna terdaftar'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Pengguna
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Sekolah
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Bergabung
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Aktivitas
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                    {user.name?.charAt(0).toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                            {user.school || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(user.created_at), 'dd MMM yyyy', { locale: id })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {user.sessions_count || 0} ujian
                                                </span>
                                                {user.average_score && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Avg: <span className="font-medium text-gray-700">{user.average_score}%</span>
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(user)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit Pengguna"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus Pengguna"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {users.last_page > 1 && (
                <div className="mt-6 flex justify-center">
                    <nav className="flex gap-2">
                        {users.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${link.active
                                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                        : link.url
                                            ? 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                            : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                                    }`}
                                preserveState
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            )}

            {/* User Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingUser ? 'Edit Pengguna' : 'Tambah Pengguna'}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:ring-0 text-sm transition-all ${form.errors.name
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-indigo-500'
                                            }`}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {form.errors.name && (
                                        <p className="text-red-500 text-xs mt-1 font-medium">{form.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={form.data.email}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:ring-0 text-sm transition-all ${form.errors.email
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-indigo-500'
                                            }`}
                                        placeholder="email@example.com"
                                    />
                                    {form.errors.email && (
                                        <p className="text-red-500 text-xs mt-1 font-medium">{form.errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        No. Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.phone}
                                        onChange={(e) => form.setData('phone', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                        placeholder="0812..."
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Asal Sekolah
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.school}
                                        onChange={(e) => form.setData('school', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                        placeholder="Contoh: SMA Negeri 1 Jakarta"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password {!editingUser && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="password"
                                        value={form.data.password}
                                        onChange={(e) => form.setData('password', e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:ring-0 text-sm transition-all ${form.errors.password
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-indigo-500'
                                            }`}
                                        placeholder={editingUser ? 'Kosongkan jika tetap' : 'Password baru'}
                                    />
                                    {form.errors.password && (
                                        <p className="text-red-500 text-xs mt-1 font-medium">{form.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        type="password"
                                        value={form.data.password_confirmation}
                                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                        placeholder="Ulangi password"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <select
                                        value={form.data.role}
                                        onChange={(e) => form.setData('role', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all cursor-pointer"
                                    >
                                        <option value="siswa">Siswa</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                                >
                                    {form.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
