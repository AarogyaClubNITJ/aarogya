{/* The blood donation registration form for 4 September event */}
{/*EXTRA-NOT REQUIRED */}

import React, { useState } from "react";

const BloodRegistration = () => {
  const fields = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
    { name: "age", label: "Age", type: "number", required: true },
    { name: "rollNumber", label: "Roll Number", type: "text", required: true },
    { name: "branch", label: "Branch/Department", type: "select",options: ["BT","Che","Civil","CSE","DSE","EE","ECE","IPE","IT","ICE","ME","TT","MnC","ITEP","Other"], required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "bloodGroup", label: "Blood Group", type: "select", options: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"], required: true },
    { name: "otherInfo", label: "Other Information", type: "textarea", required: false },
  ];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );


  // hardcoded dummy data
  const [registeredData, setRegisteredData] = useState([
    {
      name: "ABC ",
      gender: "Male",
      age: 21,
      rollNumber: "112233",
      branch: "CSE",
      phone: "85743294853",
      bloodGroup: "B+",
      otherInfo: "First time donor",
    },
    {
      name: "CBA",
      gender: "Female",
      age: 20,
      rollNumber: "84572",
      branch: "EE",
      phone: "98 8435289",
      bloodGroup: "O+",
      otherInfo: "Branch-xyz",
    },
  ]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Registration successful!");

    setRegisteredData([...registeredData, formData])

    setFormData({
    name: "",
    rollNumber: "",
    branch: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    otherInfo: "",
  });
  };

  return (
        <div className="bg-gray-100 p-4 sm:p-6">
      {/* Form Section */}
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-10">
        <div className="bg-white shadow-xl border border-blue-400 rounded-2xl p-6 sm:p-8 w-full max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-blue-700">
            Blood Donation Registration
          </h2>
          <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Event Date: <span className="font-semibold">4th September</span>
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-12 sm:gap-y-6 px-2 sm:px-6"
          >
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder="Some other branch, medical condition etc"
                    className="w-full border rounded-lg px-3 py-2 border-gray-400 placeholder:text-gray-700 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    rows={4}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full border rounded-lg px-3 py-2 border-gray-400 focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full border rounded-lg px-3 py-2 border-gray-400 focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                  />
                )}
              </div>
            ))}

            <div className="sm:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-900 text-sm sm:text-base hover:scale-105 transition-transform duration-200 active:scale-95"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Registered Donors Section */}
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-10 w-full max-w-7xl mt-6 sm:mt-8 mx-auto border border-blue-500">
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4 sm:mb-6 text-center">
          Registered Donors
        </h3>
        <div className="overflow-x-auto border border-blue-200 rounded-lg">
          <table className="w-full border-collapse border border-gray-300 text-sm sm:text-md">
            <thead className="bg-blue-100">
              <tr>
                {fields.map((field) => (
                  <th
                    key={field.name}
                    className="border border-gray-500 px-2 py-2 text-left whitespace-nowrap"
                  >
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {registeredData.map((donor, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  {fields.map((field) => (
                    <td
                      key={field.name}
                      className="border border-gray-500 px-2 py-2 text-center whitespace-nowrap"
                    >
                      {donor[field.name] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodRegistration;