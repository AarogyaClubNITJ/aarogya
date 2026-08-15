import GroupAPlus from "../assets/BloodBank/Group_A+.svg";
import GroupBPlus from "../assets/BloodBank/Group_B+.svg";
import GroupOPlus from "../assets/BloodBank/Group_O+.svg";
import GroupABPlus from "../assets/BloodBank/Blood_AB+.svg";
import GroupAMinus from "../assets/BloodBank/Group_A-.svg";
import GroupBMinus from "../assets/BloodBank/Group_B-.svg";
import GroupOMinus from "../assets/BloodBank/Group_O-.svg";
import GroupABMinus from "../assets/BloodBank/Group_AB-.svg";

const bloodData = [
  { img: GroupAPlus, type: "A+", donors: 45 },
  { img: GroupBPlus, type: "B+", donors: 24 },
  { img: GroupOPlus, type: "O+", donors: 24 },
  { img: GroupABPlus, type: "AB+", donors: 24 },
  { img: GroupAMinus, type: "A-", donors: 24 },
  { img: GroupBMinus, type: "B-", donors: 24 },
  { img: GroupOMinus, type: "O-", donors: 24 },
  { img: GroupABMinus, type: "AB-", donors: 24 },
];

const CheckBlood = () => {
  return (
    <div className="pt-14 pb-6 sm:py-28 mx-auto px-2 max-w-5xl">
      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#406ED5] text-left">
        NITJ का अपना Blood Bank
      </h2>

      {/* Last Updated date - Hardcoded right now */}
      <p className="text-gray-500 text-sm mb-6 sm:mb-10">
        Last Updated: 04 September 2025
      </p>

      {/* Grid - 3 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {bloodData.map((blood, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={blood.img}
              alt={blood.type}
              className="w-32 h-32 sm:w-48 sm:h-48" // smaller on mobile, same as before on desktop
            />
            <p className="mt-1 mb-3 font-semibold text-sm sm:text-xl">
              Donors:{" "}
              <span
                className={
                  blood.donors > 30 ? "text-green-500" : "text-red-500"
                }
              >
                {blood.donors}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBlood;
