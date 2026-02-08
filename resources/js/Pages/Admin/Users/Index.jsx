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
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    <ShieldCheckIcon className="w-3 h-3" />
                    Admin
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                <AcademicCapIcon className="w-3 h-3" />
                Siswa
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title="Kelola Pengguna" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Pengguna</h1>
                    <p className="text-gray-600">{users.total} pengguna terdaftar</p>
                </div>
                <button onClick={() => openModal()} className="btn btn-primary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Tambah Pengguna
                </button>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <div className="p-4 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama atau email..."
                                className="input pl-10 w-full"
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="input min-w-[150px]"
                    >
                        <option value="">Semua Role</option>
                        <option value="admin">Admin</option>
                        <option value="siswa">Siswa</option>
                    </select>

                    <button onClick={handleSearch} className="btn btn-secondary">
                        Filter
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="card overflow-hidden">
                {users.data.length === 0 ? (
                    <div className="p-12 text-center">
                        <UserCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Tidak Ada Pengguna
                        </h3>
                        <p className="text-gray-600">
                            {search || roleFilter ? 'Coba ubah filter pencarian' : 'Belum ada pengguna terdaftar'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Pengguna
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Sekolah
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Bergabung
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Aktivitas
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                                                    {user.name?.charAt(0).toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.school || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {format(new Date(user.created_at), 'dd MMM yyyy', { locale: id })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <p className="text-gray-900">
                                                    {user.sessions_count || 0} ujian
                                                </p>
                                                {user.average_score && (
                                                    <p className="text-gray-500">
                                                        Rata-rata: {user.average_score}%
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(user)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
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
                    <nav className="flex gap-1">
                        {users.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-2 rounded text-sm ${
                                    link.active
                                        ? 'bg-indigo-600 text-white'
                                        : link.url
                                        ? 'bg-white text-gray-600 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingUser ? 'Edit Pengguna' : 'Tambah Pengguna'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        className={`input w-full ${form.errors.name ? 'border-red-500' : ''}`}
                                    />
                                    {form.errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={form.data.email}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        className={`input w-full ${form.errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {form.errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        No. Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.phone}
                                        onChange={(e) => form.setData('phone', e.target.value)}
                                        className="input w-full"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Asal Sekolah
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.school}
                                        onChange={(e) => form.setData('school', e.target.value)}
                                        className="input w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password {!editingUser && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="password"
                                        value={form.data.password}
                                        onChange={(e) => form.setData('password', e.target.value)}
                                        className={`input w-full ${form.errors.password ? 'border-red-500' : ''}`}
                                        placeholder={editingUser ? 'Kosongkan jika tidak diubah' : ''}
                                    />
                                    {form.errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{form.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        type="password"
                                        value={form.data.password_confirmation}
                                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                                        className="input w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select
                                        value={form.data.role}
                                        onChange={(e) => form.setData('role', e.target.value)}
                                        className="input w-full"
                                    >
                                        <option value="siswa">Siswa</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-secondary flex-1"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="btn btn-primary flex-1"
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
