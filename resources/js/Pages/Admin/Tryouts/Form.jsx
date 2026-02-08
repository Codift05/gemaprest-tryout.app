import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeftIcon,
    PhotoIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Form({ tryout = null, categories = [] }) {
    const isEditing = !!tryout;
    const [thumbnailPreview, setThumbnailPreview] = useState(
        tryout?.thumbnail ? `/storage/${tryout.thumbnail}` : null
    );

    const { data, setData, post, put, processing, errors } = useForm({
        title: tryout?.title || '',
        description: tryout?.description || '',
        duration_minutes: tryout?.duration_minutes || 90,
        max_attempts: tryout?.max_attempts || 1,
        max_violations: tryout?.max_violations || 5,
        passing_score: tryout?.passing_score || 60,
        is_active: tryout?.is_active ?? true,
        is_randomized: tryout?.is_randomized ?? false,
        show_result: tryout?.show_result ?? true,
        show_leaderboard: tryout?.show_leaderboard ?? true,
        allow_review: tryout?.allow_review ?? true,
        start_date: tryout?.start_date ? tryout.start_date.slice(0, 16) : '',
        end_date: tryout?.end_date ? tryout.end_date.slice(0, 16) : '',
        category_ids: tryout?.categories?.map((c) => c.id) || [],
        thumbnail: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'category_ids') {
                value.forEach((id) => formData.append('category_ids[]', id));
            } else if (key === 'thumbnail' && value) {
                formData.append('thumbnail', value);
            } else if (value !== null && value !== '') {
                formData.append(key, value);
            }
        });

        if (isEditing) {
            formData.append('_method', 'PUT');
            router.post(route('admin.tryouts.update', tryout.id), formData);
        } else {
            router.post(route('admin.tryouts.store'), formData);
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('thumbnail', file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const removeThumbnail = () => {
        setData('thumbnail', null);
        setThumbnailPreview(null);
    };

    const toggleCategory = (categoryId) => {
        const current = data.category_ids;
        if (current.includes(categoryId)) {
            setData('category_ids', current.filter((id) => id !== categoryId));
        } else {
            setData('category_ids', [...current, categoryId]);
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Tryout' : 'Tambah Tryout'} />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={route('admin.tryouts.index')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Tryout' : 'Tambah Tryout Baru'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Informasi Dasar</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thumbnail
                                </label>
                                {thumbnailPreview ? (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeThumbnail}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        >
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                                        <PhotoIcon className="w-12 h-12 text-gray-400" />
                                        <span className="text-sm text-gray-500 mt-2">
                                            Klik untuk upload thumbnail
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleThumbnailChange}
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Judul Tryout <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`input w-full ${errors.title ? 'border-red-500' : ''}`}
                                    placeholder="Contoh: UTBK SNBT 2024 - Paket 1"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="input w-full"
                                    placeholder="Deskripsi singkat tentang tryout..."
                                />
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => toggleCategory(category.id)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                data.category_ids.includes(category.id)
                                                    ? 'text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                            style={
                                                data.category_ids.includes(category.id)
                                                    ? { backgroundColor: category.color }
                                                    : {}
                                            }
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Pengaturan Ujian</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Durasi (menit) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.duration_minutes}
                                    onChange={(e) => setData('duration_minutes', parseInt(e.target.value))}
                                    className="input w-full"
                                />
                            </div>

                            {/* Max Attempts */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Maksimal Percobaan
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.max_attempts}
                                    onChange={(e) => setData('max_attempts', parseInt(e.target.value))}
                                    className="input w-full"
                                />
                            </div>

                            {/* Max Violations */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Maks. Pelanggaran
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.max_violations}
                                    onChange={(e) => setData('max_violations', parseInt(e.target.value))}
                                    className="input w-full"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Ujian otomatis diserahkan jika melebihi batas
                                </p>
                            </div>

                            {/* Passing Score */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nilai Kelulusan (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={data.passing_score}
                                    onChange={(e) => setData('passing_score', parseInt(e.target.value))}
                                    className="input w-full"
                                />
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Waktu Mulai
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="input w-full"
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Waktu Berakhir
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="input w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="font-semibold text-gray-900">Opsi Lainnya</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { key: 'is_active', label: 'Aktif', desc: 'Tryout dapat diakses siswa' },
                                { key: 'is_randomized', label: 'Acak Soal', desc: 'Urutan soal diacak untuk setiap siswa' },
                                { key: 'show_result', label: 'Tampilkan Hasil', desc: 'Siswa dapat melihat hasil setelah ujian' },
                                { key: 'show_leaderboard', label: 'Tampilkan Leaderboard', desc: 'Leaderboard dapat diakses' },
                                { key: 'allow_review', label: 'Izinkan Review', desc: 'Siswa dapat melihat pembahasan soal' },
                            ].map(({ key, label, desc }) => (
                                <label key={key} className="flex items-center justify-between cursor-pointer">
                                    <div>
                                        <p className="font-medium text-gray-900">{label}</p>
                                        <p className="text-sm text-gray-500">{desc}</p>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={data[key]}
                                            onChange={(e) => setData(key, e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-11 h-6 rounded-full transition-colors ${
                                                data[key] ? 'bg-indigo-600' : 'bg-gray-300'
                                            }`}
                                        >
                                            <div
                                                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                                    data[key] ? 'translate-x-5' : 'translate-x-0.5'
                                                } mt-0.5`}
                                            />
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-4">
                        <Link href={route('admin.tryouts.index')} className="btn btn-secondary">
                            Batal
                        </Link>
                        <button type="submit" disabled={processing} className="btn btn-primary">
                            {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Buat Tryout'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
