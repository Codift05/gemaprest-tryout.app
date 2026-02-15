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

export default function Take({ session, questions = [], answers: initialAnswers, serverTime }) {
    const { settings = {} } = usePage().props;
    const [showNavigation, setShowNavigation] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const {
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
        flaggedQuestions,
        toggleFlag,
        violations,
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
    useAntiCheat(session.id, addViolation, session.tryout.max_violations, settings?.enable_proctoring);

    // Auto-save answers
    useAutoSave(answers, session.id);

    // Initialize store
    useEffect(() => {
        const answersMap = {};
        initialAnswers.forEach((ans) => {
            answersMap[ans.question_id] = ans.selected_option;
        });
        setAnswers(answersMap);
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
        const isFlagged = flaggedQuestions.includes(question.id);
        const isCurrent = index === currentQuestionIndex;

        return { isAnswered, isFlagged, isCurrent };
    };

    const stats = {
        answered: Object.keys(answers).length,
        flagged: flaggedQuestions.length,
        unanswered: totalQuestions - Object.keys(answers).length,
    };

    return (
        <>
            <Head title={`Ujian - ${session.tryout.title}`} />

            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        {/* Left: Tryout info */}
                        <div className="flex items-center gap-4">
                            <h1 className="font-semibold text-gray-900 truncate max-w-xs">
                                {session.tryout.title}
                            </h1>
                            <span className="text-sm text-gray-600 hidden sm:inline">
                                Soal {currentQuestionIndex + 1} dari {totalQuestions}
                            </span>
                        </div>

                        {/* Center: Timer */}
                        <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold transition-colors ${isDanger
                                ? 'bg-red-100 text-red-700 animate-pulse'
                                : isWarning
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            <ClockIcon className="w-5 h-5" />
                            {formatTime(remainingTime)}
                        </div>

                        {/* Right: Violations & Submit */}
                        <div className="flex items-center gap-4">
                            {violations > 0 && (
                                <div className="flex items-center gap-1 text-red-600" title="Pelanggaran">
                                    <ExclamationTriangleIcon className="w-5 h-5" />
                                    <span className="font-medium">
                                        {violations}/{session.tryout.max_violations}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={() => handleSubmit()}
                                disabled={isSubmitting}
                                className="btn btn-primary"
                            >
                                <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                                Selesai
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex">
                    {/* Main Content */}
                    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            {/* Question Card */}
                            <div className="card mb-6">
                                <div className="card-header flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {currentQuestion.subcategory && (
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                                {currentQuestion.subcategory.name}
                                            </span>
                                        )}
                                        <span className="text-gray-600 text-sm">
                                            Soal #{currentQuestionIndex + 1}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => toggleFlag(currentQuestion.id)}
                                        className={`p-2 rounded-lg transition-colors ${flaggedQuestions.includes(currentQuestion.id)
                                            ? 'bg-amber-100 text-amber-600'
                                            : 'hover:bg-gray-100 text-gray-400'
                                            }`}
                                        title="Tandai soal"
                                    >
                                        {flaggedQuestions.includes(currentQuestion.id) ? (
                                            <FlagSolidIcon className="w-5 h-5" />
                                        ) : (
                                            <FlagIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                <div className="p-6">
                                    {/* Question Text */}
                                    <div
                                        className="prose prose-lg max-w-none mb-6"
                                        dangerouslySetInnerHTML={{ __html: currentQuestion.question_text }}
                                    />

                                    {/* Question Image */}
                                    {currentQuestion.image && (
                                        <div className="mb-6">
                                            <img
                                                src={`/storage/${currentQuestion.image}`}
                                                alt="Gambar soal"
                                                className="max-w-full h-auto rounded-lg border"
                                            />
                                        </div>
                                    )}

                                    {/* Options */}
                                    <div className="space-y-3">
                                        {['A', 'B', 'C', 'D', 'E'].map((option) => {
                                            const optionText = currentQuestion[`option_${option.toLowerCase()}`];
                                            if (!optionText) return null;

                                            const isSelected = answers[currentQuestion.id] === option;

                                            return (
                                                <button
                                                    key={option}
                                                    onClick={() => handleAnswer(option)}
                                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                        ? 'border-indigo-600 bg-indigo-50'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${isSelected
                                                                ? 'bg-indigo-600 text-white'
                                                                : 'bg-gray-100 text-gray-600'
                                                                }`}
                                                        >
                                                            {option}
                                                        </span>
                                                        <span
                                                            className="prose prose-sm max-w-none flex-1"
                                                            dangerouslySetInnerHTML={{ __html: optionText }}
                                                        />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => goToQuestion(currentQuestionIndex - 1)}
                                    disabled={currentQuestionIndex === 0}
                                    className="btn btn-secondary"
                                >
                                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                                    Sebelumnya
                                </button>

                                <button
                                    onClick={() => setShowNavigation(!showNavigation)}
                                    className="btn btn-secondary sm:hidden"
                                >
                                    Navigasi
                                </button>

                                <button
                                    onClick={() => goToQuestion(currentQuestionIndex + 1)}
                                    disabled={currentQuestionIndex === totalQuestions - 1}
                                    className="btn btn-secondary"
                                >
                                    Selanjutnya
                                    <ChevronRightIcon className="w-5 h-5 ml-1" />
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar Navigation */}
                    <aside
                        className={`w-72 bg-white border-l shrink-0 p-4 overflow-y-auto fixed md:relative right-0 top-16 bottom-0 z-30 transition-transform md:translate-x-0 ${showNavigation ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="text-center p-2 bg-emerald-50 rounded-lg">
                                <p className="text-lg font-bold text-emerald-600">{stats.answered}</p>
                                <p className="text-xs text-emerald-700">Dijawab</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                                <p className="text-lg font-bold text-gray-600">{stats.unanswered}</p>
                                <p className="text-xs text-gray-700">Belum</p>
                            </div>
                            <div className="text-center p-2 bg-amber-50 rounded-lg">
                                <p className="text-lg font-bold text-amber-600">{stats.flagged}</p>
                                <p className="text-xs text-amber-700">Ditandai</p>
                            </div>
                        </div>

                        {/* Question Grid */}
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((_, index) => {
                                const { isAnswered, isFlagged, isCurrent } = getQuestionStatus(index);

                                return (
                                    <button
                                        key={index}
                                        onClick={() => goToQuestion(index)}
                                        className={`relative aspect-square rounded-lg font-medium text-sm transition-all ${isCurrent
                                            ? 'ring-2 ring-indigo-600 ring-offset-2'
                                            : ''
                                            } ${isAnswered
                                                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {index + 1}
                                        {isFlagged && (
                                            <FlagSolidIcon className="w-3 h-3 text-amber-500 absolute -top-1 -right-1" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="mt-4 pt-4 border-t text-xs text-gray-600 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded bg-emerald-500" />
                                <span>Sudah dijawab</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded bg-gray-100" />
                                <span>Belum dijawab</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FlagSolidIcon className="w-4 h-4 text-amber-500" />
                                <span>Ditandai</span>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Overlay for mobile navigation */}
                {showNavigation && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 md:hidden"
                        onClick={() => setShowNavigation(false)}
                    />
                )}
            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ExclamationTriangleIcon className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Selesaikan Ujian?
                            </h3>
                            <p className="text-gray-600">
                                Pastikan semua jawaban sudah benar sebelum menyelesaikan ujian.
                            </p>
                        </div>

                        {/* Stats Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Total Soal</span>
                                <span className="font-semibold">{totalQuestions}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <CheckIcon className="w-4 h-4 text-emerald-500" />
                                    Dijawab
                                </span>
                                <span className="font-semibold text-emerald-600">{stats.answered}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <XMarkIcon className="w-4 h-4 text-red-500" />
                                    Belum Dijawab
                                </span>
                                <span className="font-semibold text-red-600">{stats.unanswered}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="btn btn-secondary flex-1"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={() => handleSubmit(true)}
                                disabled={isSubmitting}
                                className="btn btn-primary flex-1"
                            >
                                {isSubmitting ? 'Menyimpan...' : 'Ya, Selesaikan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
