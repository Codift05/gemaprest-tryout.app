import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    FolderIcon,
    ChevronDownIcon,
    ChevronRightIcon,
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
        <AdminLayout>
            <Head title="Kelola Kategori" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Kategori</h1>
                    <p className="text-gray-600">Organisasi materi dan soal tryout</p>
                </div>
                <button onClick={() => openCategoryModal()} className="btn btn-primary">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Tambah Kategori
                </button>
            </div>

            {/* Categories List */}
            <div className="card">
                {categories.length === 0 ? (
                    <div className="p-12 text-center">
                        <FolderIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Belum Ada Kategori
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Buat kategori untuk mengelompokkan soal Anda
                        </p>
                        <button onClick={() => openCategoryModal()} className="btn btn-primary">
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Tambah Kategori
                        </button>
                    </div>
                ) : (
                    <div className="divide-y">
                        {categories.map((category) => {
                            const isExpanded = expandedCategories.includes(category.id);

                            return (
                                <div key={category.id}>
                                    {/* Category Row */}
                                    <div className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                        <button
                                            onClick={() => toggleExpand(category.id)}
                                            className="p-1 hover:bg-gray-200 rounded"
                                        >
                                            {isExpanded ? (
                                                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>

                                        <div
                                            className="w-4 h-4 rounded"
                                            style={{ backgroundColor: category.color }}
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {category.subcategories?.length || 0} subkategori •{' '}
                                                {category.questions_count || 0} soal
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openSubcategoryModal(null, category.id)}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                <PlusIcon className="w-4 h-4 mr-1" />
                                                Sub
                                            </button>
                                            <button
                                                onClick={() => openCategoryModal(category)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subcategories */}
                                    {isExpanded && category.subcategories?.length > 0 && (
                                        <div className="bg-gray-50 border-t">
                                            {category.subcategories.map((subcategory) => (
                                                <div
                                                    key={subcategory.id}
                                                    className="pl-16 pr-4 py-3 flex items-center gap-4 border-b last:border-b-0"
                                                >
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-700">
                                                            {subcategory.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {subcategory.questions_count || 0} soal
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                openSubcategoryModal(subcategory, category.id)
                                                            }
                                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                                        >
                                                            <PencilIcon className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSubcategory(subcategory)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}
                        </h3>

                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Kategori
                                </label>
                                <input
                                    type="text"
                                    value={categoryForm.data.name}
                                    onChange={(e) => categoryForm.setData('name', e.target.value)}
                                    className="input w-full"
                                    placeholder="Contoh: TPS, TKA Saintek"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Warna
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={categoryForm.data.color}
                                        onChange={(e) => categoryForm.setData('color', e.target.value)}
                                        className="w-12 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={categoryForm.data.color}
                                        onChange={(e) => categoryForm.setData('color', e.target.value)}
                                        className="input flex-1"
                                        placeholder="#6366f1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi (Opsional)
                                </label>
                                <textarea
                                    value={categoryForm.data.description}
                                    onChange={(e) => categoryForm.setData('description', e.target.value)}
                                    rows={2}
                                    className="input w-full"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryModal(false)}
                                    className="btn btn-secondary flex-1"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={categoryForm.processing}
                                    className="btn btn-primary flex-1"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {editingSubcategory ? 'Edit Subkategori' : 'Tambah Subkategori'}
                        </h3>

                        <form onSubmit={handleSubcategorySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Subkategori
                                </label>
                                <input
                                    type="text"
                                    value={subcategoryForm.data.name}
                                    onChange={(e) => subcategoryForm.setData('name', e.target.value)}
                                    className="input w-full"
                                    placeholder="Contoh: Penalaran Verbal, Fisika"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Kategori Induk
                                </label>
                                <select
                                    value={subcategoryForm.data.category_id}
                                    onChange={(e) => subcategoryForm.setData('category_id', e.target.value)}
                                    className="input w-full"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi (Opsional)
                                </label>
                                <textarea
                                    value={subcategoryForm.data.description}
                                    onChange={(e) => subcategoryForm.setData('description', e.target.value)}
                                    rows={2}
                                    className="input w-full"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowSubcategoryModal(false)}
                                    className="btn btn-secondary flex-1"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={subcategoryForm.processing}
                                    className="btn btn-primary flex-1"
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
