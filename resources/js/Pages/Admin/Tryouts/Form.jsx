import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeftIcon,
    PhotoIcon,
    XMarkIcon,
    CalendarIcon,
    ClockIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Form({ tryout = null, categories = [], defaultSettings = {} }) {
    const isEditing = !!tryout;
    const [thumbnailPreview, setThumbnailPreview] = useState(
        tryout?.thumbnail ? `/storage/${tryout.thumbnail}` : null
    );
    const [isDragOver, setIsDragOver] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        title: tryout?.title || '',
        description: tryout?.description || '',
        duration_minutes: tryout?.duration_minutes || defaultSettings.duration_minutes || 90,
        max_attempts: tryout?.max_attempts || 1,
        max_violations: tryout?.max_violations || defaultSettings.max_violations || 5,
        passing_score: tryout?.passing_score || defaultSettings.passing_score || 60,
        is_published: tryout?.is_published ?? false,
        is_randomized: tryout?.is_randomized ?? false,
        show_result_immediately: tryout?.show_result_immediately ?? true,
        show_leaderboard: tryout?.show_leaderboard ?? true,
        start_time: tryout?.start_time || '',
        end_time: tryout?.end_time || '',
        categories: tryout?.categories?.map((c) => ({ id: c.id, question_count: c.question_count || 0 })) || [],
        thumbnail: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'categories') {
                value.forEach((cat, index) => {
                    formData.append(`categories[${index}][id]`, cat.id);
                    formData.append(`categories[${index}][question_count]`, cat.question_count);
                });
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

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setData('thumbnail', file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const removeThumbnail = () => {
        setData('thumbnail', null);
        setThumbnailPreview(null);
    };

    const toggleCategory = (categoryId) => {
        const current = data.categories;
        const exists = current.find((c) => c.id === categoryId);
        if (exists) {
            setData('categories', current.filter((c) => c.id !== categoryId));
        } else {
            setData('categories', [...current, { id: categoryId, question_count: 0 }]);
        }
    };

    const updateCategoryQuestionCount = (categoryId, count) => {
        setData('categories', data.categories.map((c) => 
            c.id === categoryId ? { ...c, question_count: parseInt(count) || 0 } : c
        ));
    };

    const isCategorySelected = (categoryId) => {
        return data.categories.some((c) => c.id === categoryId);
    };

    const getCategoryQuestionCount = (categoryId) => {
        const cat = data.categories.find((c) => c.id === categoryId);
        return cat ? cat.question_count : 0;
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Tryout' : 'Tambah Tryout'} />

            <div className="max-w-4xl mx-auto pb-8 sm:pb-12">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <Link
                        href={route('admin.tryouts.index')}
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-3 sm:mb-4 transition-colors p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 rounded-lg hover:bg-indigo-50"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1.5 sm:mr-2" />
                        Kembali ke Daftar
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        {isEditing ? 'Edit Tryout' : 'Buat Tryout Baru'}
                    </h1>
                    <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-500">
                        {isEditing ? 'Perbarui informasi dan pengaturan tryout.' : 'Isi form di bawah untuk menambahkan tryout baru.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Informasi Dasar</h2>
                        </div>
                        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Thumbnail
                                </label>
                                {thumbnailPreview ? (
                                    <div className="relative w-full h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden group border border-gray-200 shadow-sm">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={removeThumbnail}
                                                className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                                            >
                                                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label
                                        className={`flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-dashed rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 ${isDragOver
                                            ? 'border-indigo-500 bg-indigo-50'
                                            : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-indigo-400'
                                            }`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                        onDragLeave={() => setIsDragOver(false)}
                                        onDrop={handleDrop}
                                    >
                                        <div className="p-3 sm:p-4 bg-white rounded-full shadow-sm mb-2 sm:mb-3">
                                            <PhotoIcon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            Klik untuk upload thumbnail
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">
                                            atau drag & drop file gambar di sini
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
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Judul Tryout <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder="Contoh: UTBK SNBT 2024 - Paket 1"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500"></span>
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors resize-none"
                                    placeholder="Deskripsi singkat tentang tryout..."
                                />
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                                    Kategori
                                </label>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2 sm:gap-2.5 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() => toggleCategory(category.id)}
                                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${isCategorySelected(category.id)
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm'
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {/* Question count per category */}
                                    {data.categories.length > 0 && (
                                        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                                            <p className="text-sm font-medium text-gray-700">Jumlah soal per kategori:</p>
                                            {data.categories.map((cat) => {
                                                const categoryInfo = categories.find((c) => c.id === cat.id);
                                                return (
                                                    <div key={cat.id} className="flex items-center justify-between gap-4">
                                                        <span className="text-sm text-gray-600">{categoryInfo?.name || 'Unknown'}</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={cat.question_count}
                                                            onChange={(e) => updateCategoryQuestionCount(cat.id, e.target.value)}
                                                            className="w-20 px-3 py-1.5 text-sm rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Pengaturan Ujian</h2>
                        </div>
                        <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Durasi (menit) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.duration_minutes}
                                        onChange={(e) => setData('duration_minutes', parseInt(e.target.value))}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <ClockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Max Attempts */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Maksimal Percobaan
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.max_attempts}
                                    onChange={(e) => setData('max_attempts', parseInt(e.target.value))}
                                    className="w-full px-4 py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Max Violations */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Maks. Pelanggaran
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.max_violations}
                                    onChange={(e) => setData('max_violations', parseInt(e.target.value))}
                                    className="w-full px-4 py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                    <CheckCircleIcon className="w-3 h-3" />
                                    Ujian otomatis diserahkan jika melebihi batas
                                </p>
                            </div>

                            {/* Passing Score */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Nilai Kelulusan (%)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.passing_score}
                                        onChange={(e) => setData('passing_score', parseInt(e.target.value))}
                                        className="w-full pl-4 pr-10 py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 font-medium">%</span>
                                </div>
                            </div>

                            {/* Start Time */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Waktu Mulai
                                </label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* End Time */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                    Waktu Berakhir
                                </label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Opsi Lainnya</h2>
                        </div>
                        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                            {[
                                { key: 'is_published', label: 'Publikasikan', desc: 'Tryout dapat diakses oleh siswa' },
                                { key: 'is_randomized', label: 'Acak Soal', desc: 'Urutan soal akan diacak secara otomatis untuk setiap siswa' },
                                { key: 'show_result_immediately', label: 'Tampilkan Hasil', desc: 'Siswa dapat melihat detail hasil setelah selesai ujian' },
                                { key: 'show_leaderboard', label: 'Tampilkan Leaderboard', desc: 'Nama siswa akan muncul di papan peringkat jika tersedia' },
                            ].map(({ key, label, desc }) => (
                                <label key={key} className="flex items-center justify-between cursor-pointer group p-2 sm:p-3 -mx-2 sm:-mx-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors gap-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{label}</p>
                                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{desc}</p>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={data[key]}
                                            onChange={(e) => setData(key, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-6 sm:w-12 sm:h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                        <Link
                            href={route('admin.tryouts.index')}
                            className="px-5 sm:px-6 py-2.5 rounded-lg sm:rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors text-center text-sm sm:text-base"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 sm:px-6 py-2.5 rounded-lg sm:rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            {processing ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Buat Tryout'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
