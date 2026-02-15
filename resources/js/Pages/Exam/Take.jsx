import { useEffect, useState, useCallback } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { useExamStore } from '@/stores';
import { useExamTimer, useAntiCheat, useAutoSave } from '@/hooks';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    FlagIcon,
    PaperAirplaneIcon,
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { FlagIcon as FlagSolidIcon } from '@heroicons/react/24/solid';
import ErrorBoundary from '@/Components/ErrorBoundary';

export default function Take({ session, tryout = {}, questions = [], answers: initialAnswers = [], serverTime }) {
    const { settings = {} } = usePage().props;
    const [showNavigation, setShowNavigation] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const {
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers = {},
        setAnswers, // Deprecated or unused? No, I need to match the store export.
        initializeAnswers, // Added this
        flaggedQuestions = [],
        toggleFlag,
        violations = 0,
        addViolation,
    } = useExamStore();

    // Server-synced timer
    const {
        timeRemaining: remainingTime,
        formattedTime,
        urgencyLevel,
        isExpired
    } = useExamTimer(
        session.server_end_time, // Was session.end_time which might differ? ExamController sends session with server_end_time
        session.id,
        () => handleSubmit(true) // onTimeUp callback
    );

    // Anti-cheat monitoring - Pass enable_proctoring flag
    useAntiCheat(session.id, addViolation, tryout?.max_violations || session.max_violations, settings?.enable_proctoring);

    // Auto-save answers
    useAutoSave(answers, session.id);

    // Initialize store
    useEffect(() => {
        const answersMap = {};
        initialAnswers.forEach((ans) => {
            answersMap[ans.question_id] = ans.selected_option;
        });
        if (initializeAnswers) {
            initializeAnswers(answersMap);
        } else {
            console.error("initializeAnswers action is missing from store");
        }
    }, []);

    // Enter fullscreen on mount if enabled
    useEffect(() => {
        if (!settings?.enable_fullscreen) return;

        const enterFullscreen = async () => {
            try {
                await document.documentElement.requestFullscreen();
            } catch (err) {
                console.log('Fullscreen request failed');
            }
        };

        enterFullscreen();

        return () => {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => { });
            }
        };
    }, [settings?.enable_fullscreen]);

    // Auto-submit when time runs out
    useEffect(() => {
        if (isExpired && !isSubmitting) {
            handleSubmit(true);
        }
    }, [isExpired, isSubmitting]);

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;

    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">Soal tidak ditemukan</h2>
                    <p className="text-gray-600 mt-2">Maaf, terjadi kesalahan memuat data soal.</p>
                </div>
            </div>
        );
    }

    const goToQuestion = useCallback((index) => {
        if (index >= 0 && index < totalQuestions) {
            setCurrentQuestionIndex(index);
        }
    }, [totalQuestions]);

    const handleAnswer = (option) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: option,
        });
    };

    const handleSubmit = async (force = false) => {
        if (!force && !showSubmitModal) {
            setShowSubmitModal(true);
            return;
        }

        setIsSubmitting(true);

        if (document.fullscreenElement) {
            await document.exitFullscreen().catch(() => { });
        }

        router.post(route('exam.submit', session.id), {}, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const getQuestionStatus = (index) => {
        const question = questions[index];
        const isAnswered = answers[question.id] !== undefined;
        const isFlagged = flaggedQuestions?.has ? flaggedQuestions.has(question.id) : false;
        const isCurrent = index === currentQuestionIndex;

        return { isAnswered, isFlagged, isCurrent };
    };

    const stats = {
        answered: Object.keys(answers).length,
        flagged: flaggedQuestions?.size || 0,
        unanswered: totalQuestions - Object.keys(answers).length,
    };

    return (
        <ErrorBoundary>
            <>

                <Head title={`Ujian - ${tryout?.title || session.tryout?.title || ''}`} />

                <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                    {/* Header */}
                    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 transition-all duration-300">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                            {/* Left: Tryout info */}
                            <div className="flex items-center gap-6">
                                <div className="hidden md:block">
                                    <h1 className="font-bold text-gray-900 text-lg truncate max-w-md">
                                        {tryout?.title || session.tryout?.title}
                                    </h1>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span>Ujian Sedang Berlangsung</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                                    <span className="text-blue-700 font-semibold text-sm">
                                        Soal {currentQuestionIndex + 1}
                                    </span>
                                    <span className="text-blue-300">/</span>
                                    <span className="text-blue-600 text-sm">
                                        {totalQuestions}
                                    </span>
                                </div>
                            </div>

                            {/* Center: Timer */}
                            <div
                                className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl font-mono text-xl font-bold transition-all shadow-sm ${urgencyLevel === 'critical' || urgencyLevel === 'warning'
                                    ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                                    : 'bg-white text-blue-600 border border-gray-200'
                                    }`}
                            >
                                <ClockIcon className={`w-6 h-6 ${urgencyLevel === 'critical' ? 'text-red-500' : 'text-blue-500'}`} />
                                <span>{formattedTime}</span>
                            </div>

                            {/* Right: Violations & Submit */}
                            <div className="flex items-center gap-4">
                                {violations > 0 && (
                                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-100 text-red-600" title="Pelanggaran Terdeteksi">
                                        <ExclamationTriangleIcon className="w-5 h-5" />
                                        <span className="font-bold">
                                            {violations}/{tryout?.max_violations || session.max_violations}
                                        </span>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleSubmit()}
                                    disabled={isSubmitting}
                                    className="btn btn-primary px-6 py-2.5 rounded-xl text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all font-semibold"
                                >
                                    <span className="hidden sm:inline">Selesaikan Ujian</span>
                                    <span className="sm:hidden">Selesai</span>
                                    <PaperAirplaneIcon className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 flex">
                        {/* Main Content */}
                        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                            <div className="max-w-3xl mx-auto">
                                {/* Question Card */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 transition-all hover:shadow-md">
                                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                                                {currentQuestionIndex + 1}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    Pertanyaan
                                                </span>
                                                {currentQuestion.subcategory && (
                                                    <span className="text-sm font-medium text-blue-600">
                                                        {currentQuestion.subcategory.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleFlag(currentQuestion.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium text-sm ${flaggedQuestions?.has && flaggedQuestions.has(currentQuestion.id)
                                                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                                }`}
                                            title={flaggedQuestions?.has && flaggedQuestions.has(currentQuestion.id) ? "Hilangkan tanda" : "Tandai ragu-ragu"}
                                        >
                                            {flaggedQuestions?.has && flaggedQuestions.has(currentQuestion.id) ? (
                                                <FlagSolidIcon className="w-5 h-5 text-amber-500" />
                                            ) : (
                                                <FlagIcon className="w-5 h-5" />
                                            )}
                                            <span className="hidden sm:inline">Ragu-ragu</span>
                                        </button>
                                    </div>

                                    <div className="p-8">
                                        {/* Question Text */}
                                        <div
                                            className="prose prose-lg prose-blue max-w-none mb-10 text-gray-800 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: currentQuestion.question_text }}
                                        />

                                        {/* Question Image */}
                                        {currentQuestion.image && (
                                            <div className="mb-10 p-4 bg-gray-50 rounded-2xl border border-gray-100 inline-block">
                                                <img
                                                    src={`/storage/${currentQuestion.image}`}
                                                    alt="Gambar soal"
                                                    className="max-w-full h-auto rounded-xl shadow-sm"
                                                />
                                            </div>
                                        )}

                                        {/* Options */}
                                        <div className="grid gap-4">
                                            {['A', 'B', 'C', 'D', 'E'].map((option) => {
                                                const optionText = currentQuestion[`option_${option.toLowerCase()}`];
                                                if (!optionText) return null;

                                                const isSelected = answers[currentQuestion.id] === option;

                                                return (
                                                    <button
                                                        key={option}
                                                        onClick={() => handleAnswer(option)}
                                                        className={`group w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 relative overflow-hidden ${isSelected
                                                            ? 'border-blue-500 bg-blue-50/50 shadow-md shadow-blue-100 ring-2 ring-blue-500/20'
                                                            : 'border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-md bg-white'
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-4 relative z-10">
                                                            <span
                                                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 transition-all duration-200 ${isSelected
                                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                                                                    : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                                                    }`}
                                                            >
                                                                {option}
                                                            </span>
                                                            <div className="flex-1 py-1">
                                                                <div
                                                                    className={`prose prose-base max-w-none transition-colors ${isSelected ? 'text-blue-900' : 'text-gray-700 group-hover:text-gray-900'}`}
                                                                    dangerouslySetInnerHTML={{ __html: optionText }}
                                                                />
                                                            </div>
                                                            {isSelected && (
                                                                <div className="absolute top-4 right-4 text-blue-500 animate-in fade-in zoom-in duration-300">
                                                                    <CheckIcon className="w-6 h-6" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between pb-8">
                                    <button
                                        onClick={() => goToQuestion(currentQuestionIndex - 1)}
                                        disabled={currentQuestionIndex === 0}
                                        className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:hover:bg-white shadow-sm hover:shadow active:scale-95"
                                    >
                                        <ChevronLeftIcon className="w-5 h-5 mr-2" />
                                        Sebelumnya
                                    </button>

                                    <button
                                        onClick={() => setShowNavigation(!showNavigation)}
                                        className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 lg:hidden shadow-sm"
                                    >
                                        Daftar Soal
                                    </button>

                                    <button
                                        onClick={() => goToQuestion(currentQuestionIndex + 1)}
                                        disabled={currentQuestionIndex === totalQuestions - 1}
                                        className="btn bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-95"
                                    >
                                        Selanjutnya
                                        <ChevronRightIcon className="w-5 h-5 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </main>

                        {/* Sidebar Navigation */}
                        <aside
                            className={`w-80 bg-white border-l border-gray-200 flex flex-col fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0 shadow-2xl lg:shadow-none font-sans ${showNavigation ? 'translate-x-0' : 'translate-x-full'
                                }`}
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <h3 className="font-bold text-gray-900 text-lg">Navigasi Soal</h3>
                                <button
                                    onClick={() => setShowNavigation(false)}
                                    className="lg:hidden text-gray-400 hover:text-gray-600 bg-white p-2 rounded-lg border border-gray-200"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3 mb-8">
                                    <div className="bg-emerald-50 rounded-2xl p-3 text-center border border-emerald-100">
                                        <span className="block text-2xl font-bold text-emerald-600">{stats.answered}</span>
                                        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Dijawab</span>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-200">
                                        <span className="block text-2xl font-bold text-gray-600">{stats.unanswered}</span>
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Belum</span>
                                    </div>
                                    <div className="bg-amber-50 rounded-2xl p-3 text-center border border-amber-100">
                                        <span className="block text-2xl font-bold text-amber-500">{stats.flagged}</span>
                                        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Ragu</span>
                                    </div>
                                </div>

                                {/* Question Grid */}
                                <div className="grid grid-cols-5 gap-3">
                                    {questions.map((_, index) => {
                                        const { isAnswered, isFlagged, isCurrent } = getQuestionStatus(index);

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    goToQuestion(index);
                                                    if (window.innerWidth < 1024) setShowNavigation(false);
                                                }}
                                                className={`relative aspect-square rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 ${isCurrent
                                                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-blue-500/30 w-full h-full z-10'
                                                    : isAnswered
                                                        ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                                                    }`}
                                            >
                                                {index + 1}
                                                {isFlagged && (
                                                    <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                                                        <FlagSolidIcon className="w-3 h-3 text-amber-500" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="p-6 bg-gray-50 border-t border-gray-200 text-xs font-medium text-gray-600 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                                    <span>Sudah Dikewajab</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-white border border-gray-300" />
                                    <span>Belum Dijawab</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
                                    <span>Sedang Dikerjakan</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-amber-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                    <span>Ragu-ragu</span>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Overlay for mobile navigation */}
                    {showNavigation && (
                        <div
                            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                            onClick={() => setShowNavigation(false)}
                        />
                    )}
                </div>

                {/* Submit Confirmation Modal */}
                {showSubmitModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity animate-in fade-in">
                        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-amber-50/50">
                                    <ExclamationTriangleIcon className="w-10 h-10 text-amber-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Selesaikan Ujian?
                                </h3>
                                <p className="text-gray-500">
                                    Anda tidak dapat mengubah jawaban setelah menyelesaikan ujian. Pastikan semua soal telah terjawab.
                                </p>
                            </div>

                            {/* Stats Summary */}
                            <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-600 font-medium">Total Soal</span>
                                    <span className="font-bold text-gray-900">{totalQuestions}</span>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-600 font-medium flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        Dijawab
                                    </span>
                                    <span className="font-bold text-emerald-600">{stats.answered}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                        Belum Dijawab
                                    </span>
                                    <span className="font-bold text-gray-500">{stats.unanswered}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="btn flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-semibold py-3"
                                >
                                    Kembali
                                </button>
                                <button
                                    onClick={() => handleSubmit(true)}
                                    disabled={isSubmitting}
                                    className="btn flex-1 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 font-semibold py-3"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Menyimpan...</span>
                                        </div>
                                    ) : (
                                        'Ya, Selesaikan'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </ErrorBoundary>
    );
}
