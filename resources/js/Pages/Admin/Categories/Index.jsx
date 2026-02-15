import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    FolderIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Index({ categories }) {
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingSubcategory, setEditingSubcategory] = useState(null);
    const [parentCategoryId, setParentCategoryId] = useState(null);

    const categoryForm = useForm({
        name: '',
        color: '#6366f1',
        description: '',
    });

    const subcategoryForm = useForm({
        name: '',
        description: '',
        category_id: '',
    });

    const toggleExpand = (categoryId) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter((id) => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    const openCategoryModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            categoryForm.setData({
                name: category.name,
                color: category.color,
                description: category.description || '',
            });
        } else {
            setEditingCategory(null);
            categoryForm.reset();
        }
        setShowCategoryModal(true);
    };

    const openSubcategoryModal = (subcategory = null, categoryId = null) => {
        if (subcategory) {
            setEditingSubcategory(subcategory);
            subcategoryForm.setData({
                name: subcategory.name,
                description: subcategory.description || '',
                category_id: subcategory.category_id,
            });
        } else {
            setEditingSubcategory(null);
            subcategoryForm.setData({
                name: '',
                description: '',
                category_id: categoryId,
            });
        }
        setParentCategoryId(categoryId);
        setShowSubcategoryModal(true);
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            categoryForm.put(route('admin.categories.update', editingCategory.id), {
                onSuccess: () => setShowCategoryModal(false),
            });
        } else {
            categoryForm.post(route('admin.categories.store'), {
                onSuccess: () => setShowCategoryModal(false),
            });
        }
    };

    const handleSubcategorySubmit = (e) => {
        e.preventDefault();
        if (editingSubcategory) {
            subcategoryForm.put(route('admin.subcategories.update', editingSubcategory.id), {
                onSuccess: () => setShowSubcategoryModal(false),
            });
        } else {
            subcategoryForm.post(route('admin.subcategories.store'), {
                onSuccess: () => setShowSubcategoryModal(false),
            });
        }
    };

    const handleDeleteCategory = (category) => {
        if (confirm(`Hapus kategori "${category.name}"? Semua subkategori akan ikut terhapus.`)) {
            router.delete(route('admin.categories.destroy', category.id));
        }
    };

    const handleDeleteSubcategory = (subcategory) => {
        if (confirm(`Hapus subkategori "${subcategory.name}"?`)) {
            router.delete(route('admin.subcategories.destroy', subcategory.id));
        }
    };

    return (
        <AdminLayout title="Kelola Kategori">
            <Head title="Kelola Kategori" />

            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Kategori</h1>
                    <p className="text-gray-500 mt-1">Organisasi materi dan soal tryout.</p>
                </div>
                <button
                    onClick={() => openCategoryModal()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                >
                    <PlusIcon className="w-5 h-5" />
                    Tambah Kategori
                </button>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {categories.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FolderIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Belum Ada Kategori
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Buat kategori untuk mengelompokkan soal Anda
                        </p>
                        <button
                            onClick={() => openCategoryModal()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Tambah Kategori
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {categories.map((category) => {
                            const isExpanded = expandedCategories.includes(category.id);

                            return (
                                <div key={category.id} className="group">
                                    {/* Category Row */}
                                    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                        <button
                                            onClick={() => toggleExpand(category.id)}
                                            className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {isExpanded ? (
                                                <ChevronDownIcon className="w-5 h-5" />
                                            ) : (
                                                <ChevronRightIcon className="w-5 h-5" />
                                            )}
                                        </button>

                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                            style={{ backgroundColor: `${category.color}20`, color: category.color }}
                                        >
                                            <FolderIcon className="w-5 h-5" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-sm">
                                                {category.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {category.subcategories?.length || 0} subkategori •{' '}
                                                {category.questions_count || 0} soal
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openSubcategoryModal(null, category.id)}
                                                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1"
                                            >
                                                <PlusIcon className="w-3.5 h-3.5" />
                                                Subkategori
                                            </button>
                                            <button
                                                onClick={() => openCategoryModal(category)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subcategories */}
                                    {isExpanded && category.subcategories?.length > 0 && (
                                        <div className="bg-gray-50/50 border-t border-gray-100">
                                            {category.subcategories.map((subcategory) => (
                                                <div
                                                    key={subcategory.id}
                                                    className="pl-20 pr-4 py-3 flex items-center gap-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group/sub"
                                                >
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900 text-sm">
                                                            {subcategory.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {subcategory.questions_count || 0} soal
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() =>
                                                                openSubcategoryModal(subcategory, category.id)
                                                            }
                                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        >
                                                            <PencilIcon className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSubcategory(subcategory)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}
                            </h3>
                            <button
                                onClick={() => setShowCategoryModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCategorySubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Kategori
                                </label>
                                <input
                                    type="text"
                                    value={categoryForm.data.name}
                                    onChange={(e) => categoryForm.setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                    placeholder="Contoh: TPS, TKA Saintek"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Warna
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={categoryForm.data.color}
                                        onChange={(e) => categoryForm.setData('color', e.target.value)}
                                        className="w-12 h-10 rounded-lg cursor-pointer border border-gray-200 p-1"
                                    />
                                    <input
                                        type="text"
                                        value={categoryForm.data.color}
                                        onChange={(e) => categoryForm.setData('color', e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all uppercase"
                                        placeholder="#6366f1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi (Opsional)
                                </label>
                                <textarea
                                    value={categoryForm.data.description}
                                    onChange={(e) => categoryForm.setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={categoryForm.processing}
                                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                                >
                                    {categoryForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Subcategory Modal */}
            {showSubcategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingSubcategory ? 'Edit Subkategori' : 'Tambah Subkategori'}
                            </h3>
                            <button
                                onClick={() => setShowSubcategoryModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubcategorySubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Subkategori
                                </label>
                                <input
                                    type="text"
                                    value={subcategoryForm.data.name}
                                    onChange={(e) => subcategoryForm.setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all"
                                    placeholder="Contoh: Penalaran Verbal, Fisika"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kategori Induk
                                </label>
                                <select
                                    value={subcategoryForm.data.category_id}
                                    onChange={(e) => subcategoryForm.setData('category_id', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all cursor-pointer"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi (Opsional)
                                </label>
                                <textarea
                                    value={subcategoryForm.data.description}
                                    onChange={(e) => subcategoryForm.setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 text-sm transition-all resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowSubcategoryModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={subcategoryForm.processing}
                                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                                >
                                    {subcategoryForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
