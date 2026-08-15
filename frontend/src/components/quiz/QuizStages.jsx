import { useState, useEffect, useRef } from "react";
import frame from "../../assets/troffee/frame.png"
import { question } from "../../quizQuestions";
import {
  CheckIcon,
  DocumentTextIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Submission from "../submission/Submission";
import { useAuth } from "../../context/AuthContext";
import { authAPI, quizAPI } from "../../utils/api";

const QuizStages = ({ onClose }) => {
  const [currentStage, setCurrentStage] = useState("verification"); // verification, emailVerification, quiz, submit, alreadySubmitted
  const [formData, setFormData] = useState({
    rollNumber: "",
    email: "",
    verificationCode: "",
    solution: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { setUser, clearError } = useAuth();
  const verificationCodeRef = useRef(null);

  // Auto-focus on verification code input when stage changes
  useEffect(() => {
    if (currentStage === "emailVerification" && verificationCodeRef.current) {
      verificationCodeRef.current.focus();
    }
  }, [currentStage]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (name === 'email') {
      setEmailError("");
      const emailRegex = /^[a-zA-Z0-9._%+-]+@nitj\.ac\.in$/;
      if (value && !emailRegex.test(value)) {
        setEmailError("Please enter a valid NITJ email address (e.g., abc@nitj.ac.in)");
      }
    }

    if (name === 'verificationCode') {
      setVerificationError("");
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@nitj\.ac\.in$/;

    if (!formData.rollNumber || !formData.email) {
      setEmailError("Please fill in all required fields");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid NITJ email address (e.g., abc@nitj.ac.in)");
      return;
    }

    setIsSendingCode(true);
    setEmailError("");
    clearError();

    try {
      const response = await authAPI.userInfo(formData.email);
      setUser(response.user);

      // Check if user already exists and is verified (already submitted)
      if (response.message === "User found" && response.user && response.user.verified) {
        setCurrentStage("alreadySubmitted");
      } else {
        // User is new or not verified yet, proceed with email verification
        setCurrentStage("emailVerification");
      }
    } catch (error) {
      setEmailError(error.message || "Failed to send verification code. Please try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleEmailVerificationSubmit = async (e) => {
    e.preventDefault();

    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setVerificationError("Please enter a valid 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");
    clearError();

    try {
      await authAPI.verifyUser(formData.email, formData.verificationCode);
      setCurrentStage("quiz");
    } catch (error) {
      setVerificationError(error.message || "Invalid verification code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setVerificationError("");

    try {
      await authAPI.userInfo(formData.email);
      setVerificationError("");
      // Show success message briefly
      setVerificationError("New verification code sent!");
      setTimeout(() => setVerificationError(""), 3000);
    } catch (error) {
      setVerificationError(error.message || "Failed to resend verification code");
    } finally {
      setIsResending(false);
    }
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    if (formData.solution.trim()) {
      setIsSubmitting(true);
      setSubmitError("");

      try {
        await quizAPI.submit(
          formData.email,
          formData.solution,
          parseInt(formData.rollNumber)
        );
        setCurrentStage("submit");
      } catch (error) {
        console.error('Error submitting quiz:', error);
        setSubmitError(error.message || 'Failed to submit quiz. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderVerificationStage = () => (
    <section className=" w-full min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900  text-center rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden" style={{
              backgroundImage: `url(${frame})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
              The Well-Being Quiz
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-100 rounded-full opacity-30 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full opacity-20 -z-10"></div>

            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Identity Verification</h2>

            <form onSubmit={handleVerificationSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="rollNumber" className="block text-black font-medium mb-2 text-sm sm:text-base">
                    College Roll Number
                  </label>
                  <input
                    type="number"
                    id="rollNumber"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 23106008"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-black font-medium mb-2 text-sm sm:text-base">
                    Official Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${emailError ? 'border-red-300 bg-red-50' : 'border-blue-300'
                      }`}
                    placeholder="e.g., abc@nitj.ac.in"
                    required
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSendingCode || emailError}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSendingCode ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending Code...
                    </>
                  ) : (
                    "Send Verification Code →"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  const renderEmailVerificationStage = () => (
    <section className="w-full min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 text-center rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden" style={{
              backgroundImage: `url(${frame})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
              Email Verification
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-100 rounded-full opacity-30 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full opacity-20 -z-10"></div>

            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Verify Your Email</h2>

            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm sm:text-base text-blue-800">
                We&apos;ve sent a 6-digit verification code to <strong>{formData.email}</strong>.
                Please check your email and enter the code below.
              </p>
            </div>

            <form onSubmit={handleEmailVerificationSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="verificationCode" className="block text-black font-medium mb-2 text-sm sm:text-base">
                  Verification Code
                </label>
                <input
                  ref={verificationCodeRef}
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  maxLength={6}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest ${verificationError ? 'border-red-300 bg-red-50' : 'border-blue-300'
                    }`}
                  placeholder="000000"
                  required
                />
                {verificationError && (
                  <p className={`mt-1 text-sm ${verificationError.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>
                    {verificationError}
                  </p>
                )}
              </div>

              {/* <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn&apos;t receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:text-blue-400 disabled:cursor-not-allowed"
                >
                  {isResending ? 'Resending...' : 'Resend Code'}
                </button>
              </div> */}

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStage("verification")}
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 text-sm sm:text-base font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  disabled={isVerifying || !formData.verificationCode || formData.verificationCode.length !== 6}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Verifying...
                    </>
                  ) : (
                    "Verify & Start Quiz →"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  const renderQuizStage = () => (
    <section className="w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900  text-center rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden" style={{
              backgroundImage: `url(${frame})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
              The Well-Being Quiz
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-100 rounded-full opacity-30 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full opacity-20 -z-10"></div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Question</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {question}
              </p>

            </div>

            {/* <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">You&apos;ll be Judged on:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <span className="font-semibold text-sm sm:text-base">Clarity of approach</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Your plan is explained in a clear, logical, and easy-to-follow way</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <EyeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <span className="font-semibold text-sm sm:text-base">Effectiveness</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Your actions can address the situation and create positive change</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-3 sm:p-4 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <span className="font-semibold text-sm sm:text-base">Creativity & Effort</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Your idea is original and shows real effort to solve the problem</p>
                </div>
              </div>
            </div> */}

            <form onSubmit={handleQuizSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="solution" className="block text-black font-medium mb-2 text-sm sm:text-base">
                  Your Solution
                </label>
                <textarea
                  id="solution"
                  name="solution"
                  value={formData.solution}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Type Your Solution here...."
                  required
                />
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              <div className="flex justify-end pt-2">
                {formData.solution.trim() ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-400 text-gray-600 text-sm sm:text-base font-medium rounded-lg cursor-not-allowed flex items-center gap-2"
                  >
                    Submit
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  const renderSubmitStage = () => (
    <section className=" w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900  text-center rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden" style={{
              backgroundImage: `url(${frame})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
              The Well-Being Quiz
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-center">
            <div className="mb-6 sm:mb-8 flex justify-center items-center flex-col">
              <Submission />
              {/* <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-3 sm:mb-4">Submission Successful!</h2> */}
              {/* <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Thank you for participating in the Well-Being Quiz. Your response has been submitted successfully.
              </p> */}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Submission Details:</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <p><strong>Roll Number:</strong> {formData.rollNumber}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                {/* <p><strong>Solution:</strong> {formData.solution} </p> */}
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderAlreadySubmittedStage = () => (
    <section className="w-full min-h-[80vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 text-center rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden" style={{
              backgroundImage: `url(${frame})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
              Well-Being Quiz
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-center">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-100 rounded-full opacity-30 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full opacity-20 -z-10"></div>

            <div className="mb-6 sm:mb-8 flex justify-center items-center flex-col">
              {/* Icon or illustration */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <CheckIcon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-3 sm:mb-4">
                Already Submitted!
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
                You have already submitted your response for this week&apos;s Well-Being Quiz.
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Thank you for your participation. Results will be announced soon!
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Your Details:</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <p><strong>Roll Number:</strong> {formData.rollNumber}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Status:</strong> <span className="text-green-600 font-medium">Submitted</span></p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm sm:text-base text-blue-800">
                🏆 <strong>Next Quiz:</strong> Check back next Week for the next Well-Being Quiz!
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // Render the appropriate stage
  switch (currentStage) {
    case "verification":
      return renderVerificationStage();
    case "emailVerification":
      return renderEmailVerificationStage();
    case "quiz":
      return renderQuizStage();
    case "submit":
      return renderSubmitStage();
    case "alreadySubmitted":
      return renderAlreadySubmittedStage();
    default:
      return renderVerificationStage();
  }
};

export default QuizStages;
