import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BookOpenIcon,
    Bars3BottomLeftIcon,
    XMarkIcon,
    FlagIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Review({ session, tryout, questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Safety check if questions are missing or empty
    if (!questions || questions.length === 0) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpenIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Data Pembahasan Tidak Tersedia</h2>
                        <p className="text-gray-500 mt-2 mb-6">Maaf, data soal untuk pembahasan ini tidak ditemukan.</p>
                        <Link href={route('dashboard')} className="btn btn-primary px-6 py-2.5 rounded-xl">
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;

    const getAnswerStatus = (question) => {
        if (!question.user_answer) return { status: 'unanswered', label: 'Tidak Dijawab', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: null };
        if (question.is_correct) return { status: 'correct', label: 'Benar', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircleIcon };
        return { status: 'incorrect', label: 'Salah', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircleIcon };
    };

    const currentStatus = getAnswerStatus(currentQuestion);

    const goToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
            setIsSidebarOpen(false); // Close sidebar on mobile on selection
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Calculate stats for sidebar
    const stats = {
        correct: questions.filter(q => q.is_correct).length,
        incorrect: questions.filter(q => !q.is_correct && q.user_answer).length,
        unanswered: questions.filter(q => !q.user_answer).length,
    };

    return (
        <MainLayout>
            <Head title={`Pembahasan - ${tryout?.title || 'Ujian'}`} />

            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('exam.result', session.id)}
                                className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1 max-w-[200px] sm:max-w-md">
                                    {tryout?.title || 'Pembahasan Soal'}
                                </h1>
                                <p className="text-sm text-gray-500 font-medium mt-0.5">
                                    Mode Pembahasan
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Question Counter (Desktop) */}
                            <div className="hidden sm:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                                <span className="text-indigo-700 font-bold text-sm">
                                    Soal {currentIndex + 1}
                                </span>
                                <span className="text-indigo-300">/</span>
                                <span className="text-indigo-600 text-sm font-medium">
                                    {totalQuestions}
                                </span>
                            </div>

                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 border border-gray-200"
                            >
                                {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3BottomLeftIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex max-w-7xl mx-auto w-full">
                    {/* Main Content */}
                    <main className="flex-1 p-4 md:p-6 w-full lg:w-auto overflow-hidden">
                        <div className="max-w-3xl mx-auto">

                            {/* Question Card */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-all hover:shadow-md">
                                {/* Card Header */}
                                <div className="px-6 py-4 md:px-8 md:py-6 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                Kategori
                                            </span>
                                            <div className="flex gap-2">
                                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">
                                                    {currentQuestion.category || 'Umum'}
                                                </span>
                                                {currentQuestion.subcategory && (
                                                    <span className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium shadow-sm">
                                                        {currentQuestion.subcategory}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center gap-2 ${currentStatus.color}`}>
                                        {currentStatus.icon && <currentStatus.icon className="w-4 h-4" />}
                                        {currentStatus.label}
                                    </div>
                                </div>

                                {/* Question Body */}
                                <div className="p-6 md:p-8">
                                    <div className="flex gap-4 mb-6">
                                        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm md:text-lg shadow-lg shadow-indigo-200">
                                            {currentIndex + 1}
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <div
                                                className="prose prose-sm md:prose-lg prose-indigo max-w-none text-gray-800 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                                            />
                                        </div>
                                    </div>

                                    {currentQuestion.image && (
                                        <div className="mb-8 ml-0 md:ml-14 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                            <img
                                                src={`/storage/${currentQuestion.image}`}
                                                alt="Gambar soal"
                                                className="w-full h-auto object-contain max-h-[400px]"
                                            />
                                        </div>
                                    )}

                                    {/* Options */}
                                    <div className="space-y-3 ml-0 md:ml-14">
                                        {currentQuestion.options.map((option, idx) => {
                                            if (!option.text && !option.image && !option.key) return null;

                                            const isCorrect = currentQuestion.correct_answer === option.key;
                                            const isUserAnswer = currentQuestion.user_answer === option.key;
                                            const isMissed = isCorrect && !isUserAnswer; // Correct answer but user didn't pick it
                                            const isWrong = isUserAnswer && !isCorrect; // User picked this but it's wrong

                                            let containerClass = "border-gray-200 bg-white hover:bg-gray-50";
                                            let keyClass = "bg-gray-100 text-gray-500 group-hover:bg-gray-200";
                                            let textClass = "text-gray-700";
                                            let statusIcon = null;

                                            if (isCorrect) {
                                                containerClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
                                                keyClass = "bg-emerald-500 text-white shadow-emerald-200";
                                                textClass = "text-emerald-900 font-medium";
                                                statusIcon = <CheckCircleIcon className="w-6 h-6 text-emerald-600" />;
                                            } else if (isWrong) {
                                                containerClass = "border-red-500 bg-red-50 ring-1 ring-red-500";
                                                keyClass = "bg-red-500 text-white shadow-red-200";
                                                textClass = "text-red-900 font-medium";
                                                statusIcon = <XCircleIcon className="w-6 h-6 text-red-600" />;
                                            }

                                            return (
                                                <div
                                                    key={idx}
                                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 group ${containerClass}`}
                                                >
                                                    <div className="flex gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm shadow-sm transition-colors ${keyClass}`}>
                                                            {option.key}
                                                        </div>
                                                        <div className="flex-1 py-1">
                                                            {option.text && (
                                                                <div
                                                                    className={`prose prose-sm max-w-none ${textClass}`}
                                                                    dangerouslySetInnerHTML={{ __html: option.text }}
                                                                />
                                                            )}
                                                            {option.image && (
                                                                <img
                                                                    src={`/storage/${option.image}`}
                                                                    className="mt-3 max-h-40 rounded-lg border border-gray-200 shadow-sm"
                                                                    alt="Option"
                                                                />
                                                            )}

                                                            {isCorrect && (
                                                                <p className="text-xs font-bold text-emerald-600 mt-2 uppercase tracking-wide flex items-center gap-1">
                                                                    <CheckIcon className="w-3 h-3" /> Jawaban Benar
                                                                </p>
                                                            )}
                                                            {isWrong && (
                                                                <p className="text-xs font-bold text-red-600 mt-2 uppercase tracking-wide flex items-center gap-1">
                                                                    <XMarkIcon className="w-3 h-3" /> Jawaban Kamu
                                                                </p>
                                                            )}
                                                        </div>
                                                        {statusIcon && (
                                                            <div className="absolute top-4 right-4">
                                                                {statusIcon}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Explanation Section */}
                                <div className="bg-slate-50 border-t border-gray-100 p-6 md:p-8">
                                    <button
                                        onClick={() => setShowExplanation(!showExplanation)}
                                        className="flex items-center gap-3 text-indigo-600 font-bold hover:text-indigo-700 transition-colors mb-4 group w-full md:w-auto"
                                    >
                                        <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                            <BookOpenIcon className="w-5 h-5" />
                                        </div>
                                        <span>{showExplanation ? 'Sembunyikan' : 'Lihat'} Pembahasan & Kunci Jawaban</span>
                                        <ChevronRightIcon className={`w-4 h-4 transition-transform duration-200 ${showExplanation ? 'rotate-90' : ''}`} />
                                    </button>

                                    {showExplanation && (
                                        <div className="bg-white rounded-2xl border border-indigo-100 p-6 shadow-sm ring-4 ring-indigo-50/50 animate-fadeIn relative overflow-hidden">
                                            {/* Decoration */}
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-white rounded-bl-full -mr-4 -mt-4 z-0"></div>

                                            <div className="relative z-10">
                                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                                                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                                                    Penjelasan Lengkap
                                                </h4>

                                                {currentQuestion.explanation_image && (
                                                    <div className="mb-6">
                                                        <img
                                                            src={`/storage/${currentQuestion.explanation_image}`}
                                                            className="max-w-full rounded-2xl border border-gray-100 shadow-sm"
                                                            alt="Gambar Pembahasan"
                                                        />
                                                    </div>
                                                )}

                                                {currentQuestion.explanation ? (
                                                    <div
                                                        className="prose prose-indigo max-w-none text-gray-700 bg-slate-50 p-6 rounded-2xl border border-slate-100"
                                                        dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                                                    />
                                                ) : (
                                                    <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                                        <p className="text-gray-500 italic">Tidak ada pembahasan detail untuk soal ini.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Footer */}
                            <div className="flex items-center justify-between gap-4 mb-20 md:mb-8">
                                <button
                                    onClick={() => goToQuestion(currentIndex - 1)}
                                    disabled={currentIndex === 0}
                                    className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-5 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow active:scale-95 transition-all flex items-center font-semibold"
                                >
                                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                                    <span className="hidden sm:inline">Soal </span>Sebelumnya
                                </button>

                                <button
                                    onClick={() => goToQuestion(currentIndex + 1)}
                                    disabled={currentIndex === totalQuestions - 1}
                                    className="btn btn-primary px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95 transition-all flex items-center font-semibold disabled:opacity-50 disabled:shadow-none"
                                >
                                    <span className="hidden sm:inline">Soal </span>Selanjutnya
                                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar Navigation */}
                    <aside
                        className={`
                            fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 lg:relative lg:translate-x-0 lg:z-0 lg:shadow-none lg:border-none lg:bg-transparent lg:w-96 lg:p-6
                            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                        `}
                    >
                        <div className="h-full flex flex-col bg-white lg:rounded-3xl lg:border lg:border-gray-100 lg:shadow-sm overflow-hidden">
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900 text-lg">Navigasi Soal</h3>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Legend */}
                            <div className="p-5 border-b border-gray-100 bg-white">
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="bg-emerald-50 rounded-xl p-2 text-center border border-emerald-100">
                                        <span className="block text-xl font-bold text-emerald-600 leading-none mb-1">{stats.correct}</span>
                                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Benar</span>
                                    </div>
                                    <div className="bg-red-50 rounded-xl p-2 text-center border border-red-100">
                                        <span className="block text-xl font-bold text-red-600 leading-none mb-1">{stats.incorrect}</span>
                                        <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider">Salah</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-2 text-center border border-gray-100">
                                        <span className="block text-xl font-bold text-gray-600 leading-none mb-1">{stats.unanswered}</span>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Empty</span>
                                    </div>
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                                <div className="grid grid-cols-5 gap-3">
                                    {questions.map((q, index) => {
                                        const status = getAnswerStatus(q);
                                        const isCurrent = index === currentIndex;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => goToQuestion(index)}
                                                className={`
                                                    relative aspect-square rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center border-2
                                                    ${isCurrent
                                                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105 z-10'
                                                        : `${status.color} hover:opacity-80`
                                                    }
                                                `}
                                            >
                                                {index + 1}
                                                {status.status === 'correct' && (
                                                    <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 border border-white">
                                                        <CheckIcon className="w-2 h-2 text-white" />
                                                    </div>
                                                )}
                                                {status.status === 'incorrect' && (
                                                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 border border-white">
                                                        <XMarkIcon className="w-2 h-2 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Overlay */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
