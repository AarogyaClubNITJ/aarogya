import { useState } from "react";

const BloodAllyForm = ({ isOpen, setIsOpen }) => {
  const formFields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter your name" },
    {
      name: "collegeEmail",
      label: "College Email ID",
      type: "email",
      placeholder: "Enter your email",
      pattern: "^[a-zA-Z0-9._%+-]+@nitj\\.ac\\.in$",
    },
    { name: "rollNo", label: "Roll No/Employee ID", type: "text", placeholder: "Enter Roll No/Employee ID" },
    {name:"gender", label:"Gender", type:"select", options: ["Male","Female" ,"Other"]},
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
  ];

  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    if (!formData.collegeEmail.endsWith("@nitj.ac.in")) {
      alert("Please use your NITJ college email id");
      return;
    }

    // Validate all required fields
    const requiredFields = ['name', 'collegeEmail', 'rollNo', 'bloodGroup', 'gender'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/ally/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          collegeEmail: formData.collegeEmail.toLowerCase(),
          rollNo: formData.rollNo.toUpperCase(),
          bloodGroup: formData.bloodGroup,
          gender: formData.gender,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Successfully registered as Blood Ally!");
        reset();
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white top-[50px] rounded-lg shadow-xl w-[90%] max-w-lg p-6 relative">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#406ED5]">
          Join as a Blood Ally
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field, idx) => (
            <div key={idx}>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="">{`Select ${field.label}`}</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                  
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  pattern={field.pattern || undefined}
                  className="w-full border px-4 py-2 rounded-md"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-md ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#406ED5] hover:bg-[#335ac1]'
              } text-white`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodAllyForm;
