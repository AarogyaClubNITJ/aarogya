import { useState } from "react";
import winnerResponses from "../winnerAns";
import troffee from "../assets/troffee/troffee.png";
import cup from '../assets/troffee/cup.png'
import coupon from '../assets/troffee/coupon1.png'
import bars from '../assets/troffee/bars.png'
import Adarsh from '../assets/jury/Adarsh_Kumar.jpg'
import Dr_Jagdeep from '../assets/jury/mahajan.jpg'
import Dr_Ravi from '../assets/jury/jana.jpg'
import Madhavi from '../assets/jury/jaya.jpg'
import Tanveer from '../assets/jury/Tanveer.jpg'
import shubham from '../assets/jury/shubham.jpg'
import abhay from '../assets/jury/abhayy.jpg'
import abhijeet from '../assets/jury/abhijeet.jpg'


import {
  CalendarDaysIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import QuizStages from "./quiz/QuizStages";


const Quiz = () => {
  const [showQuizStages, setShowQuizStages] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleStartQuiz = () => {
    setShowQuizStages(true);
  };

  const handleCloseQuiz = () => {
    setShowQuizStages(false);
  };

  // If quiz stages are active, show them instead of the landing page
  if (showQuizStages) {
    return <QuizStages onClose={handleCloseQuiz} />;
  }

  

  const handleShowResponse = (week) => {
    setSelectedWeek(week);
  };

  const handleCloseResponse = () => {
    setSelectedWeek(null);
  };

  return (
    <div>

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1.2s linear infinite;
        }
      `}</style>

      <section id="quizSection" className="bg-gradient-to-b from-white via-blue-200 to-blue-400 w-full min-h-screen">
        <div className="container mx-auto pl-4 sm:px-0 px-10 sm:pl-10 lg:pl-14 pt-20 sm:pt-28 flex flex-col lg:flex-row">
          {/* Text Content */}
          <div className="lg:w-1/2 max-w-xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-blue-900 mb-4">
              WELL-BEING QUIZ
            </h1>
            <p className="text-lg sm:text-xl lg:text-3xl text-blue-900 mb-6 font-semibold">
              Test your health knowledge every Sunday & win coupons worth ₹200
            </p>

            <ul className="space-y-3 text-base sm:text-xl lg:text-2xl max-w-3xl font-semibold text-blue-900">
              <li className="flex items-center gap-2">
                <CalendarDaysIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                4 Week Contest
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                Every Sunday
              </li>
              <li className="flex items-start gap-2">
                <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mt-1" />
                Grab ₹200 Worth of Canteen Coupons of Your Choice
              </li>
            </ul>

            <div className="relative">
              <button
                onClick={handleStartQuiz}
                className="absolute z-10 hover:top-3 hover:left-3 mt-6 px-8 sm:px-12 lg:px-14 py-2 border border-blue-900 rounded-lg flex items-center gap-2 hover:bg-blue-900 text-base sm:text-xl lg:text-2xl text-blue-900 bg-white font-semibold hover:text-white transition ring-1 ring-black-800"
              >
                Attempt Quiz-6
                <ArrowRightIcon className="w-5 h-6 sm:w-6 sm:h-8" />
              </button>
              <button
                onClick={handleStartQuiz}
                className="absolute z-0 top-3 left-3 mt-6 px-8 sm:px-12 lg:px-14 py-2 rounded-lg flex items-center gap-2 bg-black text-base sm:text-xl lg:text-2xl transition"
              >
                Start Quiz
                <ArrowRightIcon className="w-5 h-6 sm:w-6 sm:h-8" />
              </button>
            </div>
          </div>

          {/* Trophy Image */}
          <div className="lg:w-1/2 flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              <img src={bars} alt="" className="absolute top-0 left-0 w-full h-full object-contain" />
              <img
                src={troffee}
                id="floating"
                alt="Trophy"
                className="w-80 h-80 sm:w-80 sm:h-80 lg:w-[600px] lg:h-[600px] object-contain drop-shadow-2xl"
              />
              {/* Optional: Add a subtle glow effect */}
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      {/*COUPON*/}

      <section className="bg-white sm:py-16 pb-8 pt-16 px-6 sm:px-12 lg:px-20 ">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="lg:w-1/2 ">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-blue-900">Claim Your Prize</h2>
            <p className="text-xl sm:text-2xl font-semibold mb-4">
              Every week, the quiz champion takes home a{" "}
              <span className="text-blue-900 font-semibold">₹200 coupon</span> redeemable at any food Canteen.
            </p>
            <p className="text-base sm:text-lg font-semibold tracking-wide">
              Whether it&apos;s a coffee break at Nescafé, a pizza night at Domino&apos;s, or a quick bite from Yadav, the choice is all yours.
              The coupon will be handed over right after the winner is announced, and it will be valid until the next quiz — so make sure you enjoy your reward before the next round of competition begins.
            </p>
          </div>

          {/* Coupon Image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={coupon}
              alt="Coupon worth ₹200"
              className="w-[300px] sm:w-[400px] lg:w-[500px] object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Jury Section */}
      <section className="bg-white py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-blue-900">
              Jury Of The Week
            </h2>
            <p className="text-lg sm:text-xl text-blue-900 font-semibold">
              Distinguished experts who will evaluate your responses with fairness and expertise
            </p>
          </div>

          {/* Jury Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            {/* Dr Jagdeep */}
            <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-center border">
              <div className="flex flex-col items-center">
                <img
                  src={Dr_Jagdeep}
                  alt="Dr Shveta Mahajan"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-blue-200 shadow-lg mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 text-center">
                  Dr Shveta Mahajan
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  Assistant Professor, CSE
                </p>
              </div>
            </div>

            {/* Dr. Ravi */}
            <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-center border">
              <div className="flex flex-col items-center">
                <img
                  src={Dr_Ravi}
                  alt="Dr Asim Kumar Jana"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-blue-200 shadow-lg mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
                  	Dr Asim Kumar Jana
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  Professor & Head, Bio-Technology
                </p>
              </div>
            </div>

            {/* Madhavi */}
            <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-center border">
              <div className="flex flex-col items-center">
                <img
                  src={Madhavi}
                  alt="Jaya"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-blue-200 shadow-lg mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">
                  Jaya
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  B.Tech. 4th year
                </p>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-5xl font-bold mb-4 text-blue-900">
            Winner&apos;s journey across the weeks
          </h2>
          <p className="text-sm sm:text-lg font-medium mb-8">
            Follow the progress of our quiz competition week by week. Each Sunday marks quiz day, and the winner for that week will be revealed right here on the timeline.
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[440px] sm:max-w-2xl sm:mx-auto border-[1.5px] border-black rounded-xl overflow-hidden">
              <table className="w-full table-fixed text-center border-collapse">
                <thead>
                  <tr className="sm:h-20 h-14 border-b border-black">
                    <th className="sm:w-[100px] w-[60px] border-r border-black">
                      <img src={cup} alt="Cup Icon" className="sm:w-16 sm:h-16 w-10 h-10 mx-auto" />
                    </th>
                    {["M", "T", "W", "TH", "F", "S"].map((day, i) => (
                      <th key={i} className="border-r border-black text-xs sm:text-lg w-[50px] sm:w-[80px] px-1 sm:px-0 font-semibold">
                        {day}
                      </th>
                    ))}
                    <th className="bg-blue-600 text-white text-sm sm:text-lg w-[90px] font-semibold rounded-r-xl overflow-hidden">
                      Quiz Day
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Week 1 */}
                  <tr className="h-20 border-b border-black text-base sm:text-xl">
                    <td className="font-semibold border-r border-black">Week 1</td>
                    <td colSpan={7}>
                      <div className="flex justify-between items-center">
                        <div className="flex justify-start sm:pl-16 px-6 items-center gap-2">
                          <img src={shubham} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full  flex items-center justify-center font-bold text-2xl sm:text-4xl">

                          </img>
                          <span className="text-sm sm:text-base text-blue-700 font-bold">
                            Shubham Pal
                          </span>
                        </div>
                        <button
                          onClick={() => handleShowResponse("week1")}
                          className="bg-blue-700 border rounded-xl text-sm sm:text-base font-semibold sm:mr-6 mr-3 py-1 sm:px-4 px-2 text-white transition-transform hover:scale-105 active:scale-95 duration:200 hover:bg-blue-900">
                          Response
                        </button>
                      </div>
                    </td>
                  </tr>


                  <tr className="h-20 border-b border-black text-base sm:text-xl">
                    <td className="font-semibold border-r border-black">Week 2</td>
                    <td colSpan={7}>
                      <div className="flex justify-between items-center">
                        <div className="flex justify-start sm:pl-16 px-6 items-center gap-2">
                          <img src={Adarsh} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full  flex items-center justify-center font-bold text-2xl sm:text-4xl">

                          </img>
                          <span className="text-sm sm:text-base text-blue-700 font-bold">
                            Adarsh Kumar
                          </span>
                        </div>
                        <button
                          onClick={() => handleShowResponse("week2")}
                          className="bg-blue-700 border rounded-xl text-sm sm:text-base font-semibold sm:mr-6 mr-3 py-1 sm:px-4 px-2 text-white transition-transform hover:scale-105 active:scale-95 duration:200 hover:bg-blue-900">
                          Response
                        </button>
                      </div>
                    </td>
                  </tr>
                    {/*Week 3 */}
                    <tr className="h-20 border-b border-black text-base sm:text-xl">
                    <td className="font-semibold border-r border-black">Week 2</td>
                    <td colSpan={7}>
                      <div className="flex justify-between items-center">
                        <div className="flex justify-start sm:pl-16 px-6 items-center gap-2">
                          <img src={Tanveer} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full  flex items-center justify-center font-bold text-2xl sm:text-4xl">

                          </img>
                          <span className="text-sm sm:text-base text-blue-700 font-bold">
                            Tanveer Singh
                          </span>
                        </div>
                        <button
                          onClick={() => handleShowResponse("week3")}
                          className="bg-blue-700 border rounded-xl text-sm sm:text-base font-semibold sm:mr-6 mr-3 py-1 sm:px-4 px-2 text-white transition-transform hover:scale-105 active:scale-95 duration:200 hover:bg-blue-900">
                          Response
                        </button>
                      </div>
                    </td>
                  </tr>
                    {/*Week 4 */}
                    <tr className="h-20 border-b border-black text-base sm:text-xl">
                    <td className="font-semibold border-r border-black">Week 4</td>
                    <td colSpan={7}>
                      <div className="flex justify-between items-center">
                        <div className="flex justify-start sm:pl-16 px-6 items-center gap-2">
                          <img src={abhay} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full  flex items-center justify-center font-bold text-2xl sm:text-4xl">

                          </img>
                          <span className="text-sm sm:text-base text-blue-700 font-bold">
                            Abhay Kumar
                          </span>
                        </div>
                        <button
                          onClick={() => handleShowResponse("week3")}
                          className="bg-blue-700 border rounded-xl text-sm sm:text-base font-semibold sm:mr-6 mr-3 py-1 sm:px-4 px-2 text-white transition-transform hover:scale-105 active:scale-95 duration:200 hover:bg-blue-900">
                          Response
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/*Week 5 */}
                    <tr className="h-20 border-b border-black text-base sm:text-xl">
                    <td className="font-semibold border-r border-black">Week 5</td>
                    <td colSpan={7}>
                      <div className="flex justify-between items-center">
                        <div className="flex justify-start sm:pl-16 px-6 items-center gap-2">
                          <img src={abhijeet} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full  flex items-center justify-center font-bold text-2xl sm:text-4xl object-cover">

                          </img>
                          <span className="text-sm sm:text-base text-blue-700 font-bold">
                            Abhijeet Kaushik
                          </span>
                        </div>
                        <button
                          onClick={() => handleShowResponse("week5")}
                          className="bg-blue-700 border rounded-xl text-sm sm:text-base font-semibold sm:mr-6 mr-3 py-1 sm:px-4 px-2 text-white transition-transform hover:scale-105 active:scale-95 duration:200 hover:bg-blue-900">
                          Response
                        </button>
                      </div>
                    </td>
                  </tr>
                    {/*Reuse when required */}
                    {false && [""].map((week) => (
                    <tr key={week} className="h-20 border-b border-black text-base sm:text-xl">
                      <td className="font-semibold border-r border-black">{week}</td>
                      <td colSpan={7}>
                        <div className="flex justify-left sm:pl-16 px-6 items-center gap-4 text-gray-500">
                          {/* circular line loader*/}

                          <div className="relative w-10 h-10 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center">
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-0.5 h-2 sm:h-3 bg-gray-300 rounded"
                                style={{
                                  transform: `rotate(${i * 30}deg) translate(0, -12px)`,
                                  transformOrigin: 'center',
                                  animation: `fade 1.2s linear infinite`,
                                  animationDelay: `${i * 0.1}s`,
                                }}
                              />
                            ))}

                            <style>{`
                        @keyframes fade {
                          0%, 39%, 100% { opacity: 0.25; }
                          40% { opacity: 1; }
                        }
                      `}</style>
                          </div>
                          <span className="text-sm sm:text-base font-medium text-gray-500">Winner Revealed Soon</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section >


      {/* Popup Modal */}
      {selectedWeek && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 m-3 sm:m-0 sm:max-w-5xl w-full max-h-[80vh] flex flex-col relative animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
              Winner Response
            </h3>

            {/*question */}
            <div className="text-sm sm:text-md font-semibold mb-1 sm:mb-2">
              <span className="text-blue-700">Q:</span>{" "}
              {winnerResponses[selectedWeek].question}
            </div>

            {/* answer */}
            <div className="text-sm sm:text-md text-gray-900 mb-2 sm:mb-4 flex-1 overflow-y-auto pr-2">
              <span className="text-blue-700 font-semibold">A:</span>{" "}
              {winnerResponses[selectedWeek].response}
            </div>

            {/* Close button */}
            <button
              onClick={handleCloseResponse}
              className="absolute top-3 right-3 text-gray-600 hover:text-blue-700 font-bold text-xl"
            >
              X
            </button>
          </div>
        </div>
      )}
    <div>
    </div>
    </div >
  );
};

export default Quiz;
