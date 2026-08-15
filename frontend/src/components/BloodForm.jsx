import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon ,CheckCircleIcon} from '@heroicons/react/24/outline';

const BloodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ shouldUnregister: false });

  const [filePreview, setFilePreview] = useState(null);
const [fileType, setFileType] = useState(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    setFileType(file.type); // "image/png", "application/pdf", etc.
    alert("File Updated");
  }
};

  const [isEmergency, setIsEmergency] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const onSubmit = async (data) => {
    console.log('onSubmit:', { ...data, isEmergency });
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append('patientName', data.patientName);
      formData.append('patientAge', data.patientDOB ? new Date().getFullYear() - new Date(data.patientDOB).getFullYear() : '');
      formData.append('bloodTypeNeeded', data.bloodType);
      formData.append('patientGender', data.gender);
      formData.append('unitsRequired', data.unitsRequired);
      formData.append('hospitalName', data.hospital);
      formData.append('medicalReasons', data.reason);
      formData.append('collegeRollNumber', data.rollNumber);
      formData.append('officialMailId', data.officialEmail);
      formData.append('contactNumber', data.contact);
      formData.append('isEmergency', isEmergency);

      // Attach file if present
      if (data.report && data.report[0]) {
        formData.append('report', data.report[0]);
      }

      console.log(import.meta.env.VITE_API_BASE_URL );


      const response = await fetch(import.meta.env.VITE_API_BASE_URL +"/blood/submit", {
        method: "POST",
        body: formData
      })
      if (response && response.ok) {
        setShowSuccessPopup(true);
        reset();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Upload error:', error);
      reset();
    } finally {
      setLoader(false);
    }

  };

  const onError = (errs) => {
    console.log(' Validation errors:', errs);
  };

  const formFields = [
    { label: "Patient's Name", name: 'patientName', type: 'text' },
    { label: "Patient's DOB", name: 'patientDOB', type: 'date' },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: ['Male', 'Female', 'Other'],
    },
    {
      label: 'Blood Type Needed',
      name: 'bloodType',
      type: 'select',
      options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    { label: 'Units Required (450ml /unit)', name: 'unitsRequired', type: 'number' },
    { label: 'Hospital Name', name: 'hospital', type: 'text' },
    { label: 'Medical Reason', name: 'reason', type: 'textarea' },
    { label: 'College Roll Number', name: 'rollNumber', type: 'text' },
    { label: 'College Email', name: 'officialEmail', type: 'email' },
    {
      label: 'Contact Number',
      name: 'contact',
      type: 'text',
      pattern: /^[0-9]{10}$/,
    },
  ];

  return (
    <div className="my-14 sm:my-28 mx-auto sm:px-4 max-w-5xl">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 -top-1/2 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-gray-600 mb-6">Your blood request has been successfully submitted. We&apos;ll get back to you soon.</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Desktop */}
      <h2 className="hidden sm:block text-2xl sm:text-4xl lg:text-5xl font-bold text-[#406ED5] mb-6 sm:mb-8 text-left">
        Blood Request Form
      </h2>

      <div className="hidden sm:block">
        <div className="bg-white sm:shadow-custom ring-1 ring-black-400 mx-auto p-6 sm:p-10 rounded-xl w-full">
          <form method="post" encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit, onError)}
            className="py-6 px-1 sm:px-16 sm:py-8 space-y-10"
          >
            {/* Patient Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
              {formFields.slice(0, 6).map((field) => (
                <div key={field.name} className="w-full">
                  <label className="block text-base sm:text-lg font-semibold mb-1">
                    {field.label}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      {...register(field.name, {
                        required: 'This field is required',
                      })}
                      className="w-full border border-gray-600 h-14 rounded-lg p-2 text-sm"
                    >
                      <option value="">
                        Select {field.label}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      {...register(field.name, {
                        required: 'This field is required',
                        pattern: field.pattern && {
                          value: field.pattern,
                          message:
                            field.name === 'contact'
                              ? 'Must be 10 digits'
                              : 'Invalid format',
                        },
                      })}
                      className="w-full border border-gray-600 h-14 rounded-lg p-2 text-sm"
                      placeholder={field.label}
                    />
                  )}

                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Medical Reason */}
            <div>
              <label className="block text-base sm:text-lg font-semibold mb-1">
                Medical Reason
              </label>
              <textarea
                {...register('reason', { required: 'This field is required' })}
                className="w-full min-h-[170px] border border-gray-600 rounded-lg p-2 resize-none text-sm"
                placeholder="Please provide the medical reason..."
              />
              {errors.reason && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>

            {/* Requester&apos;s Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Requester&apos;s Info
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
                {formFields.slice(7).map((field) => (
                  <div key={field.name} className="w-full">
                    <label className="block text-base sm:text-lg font-semibold mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      {...register(field.name, {
                        required: 'This field is required',
                        pattern: field.pattern && {
                          value: field.pattern,
                          message:
                            field.name === 'contact'
                              ? 'Must be 10 digits'
                              : 'Invalid format',
                        },
                      })}
                      className="w-full border border-gray-600 h-14 rounded-lg p-2 text-sm"
                      placeholder={field.label}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload
            <div className="hidden border-2 border-gray-400 bg-slate-100 rounded-lg text-center text-sm text-gray-600 p-6 sm:h-48">
              <label className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-14 w-14 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                  </svg>
                  <span className="text-blue-600 text-2xl font-semibold">
                    Upload Hospital Reports
                  </span>
                  <span className="text-gray-400 text-sm">
                    Drag and Drop Files here
                  </span>
                </div>
                <input name="myFile" type="file" {...register('report')} className="hidden" />
              </label>
            </div> */}

            {/* Emergency Toggle + Submit */}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-x-32 justify-center items-center py-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={() => setIsEmergency(!isEmergency)}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-5 sm:w-14 sm:h-8 flex items-center rounded-full p-1 duration-300 ${isEmergency ? 'bg-red-600' : 'bg-gray-400'
                    }`}
                >
                  <div
                    className={`bg-white w-3 h-3 sm:w-6 sm:h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isEmergency ? 'translate-x-5 sm:translate-x-6' : ''
                      }`}
                  />
                </div>
                <span className="ml-3 text-lg font-medium text-gray-900">
                  Emergency Request
                </span>
              </label>

              <button
                type="submit"
                disabled={loader}
                className={`bg-blue-700 text-white text-lg px-14 py-2 rounded-xl font-semibold sm:shadow-custom ring-1 ring-black-400 transition-transform hover:scale-105 hover:bg-blue-800 active:scale-95 flex items-center justify-center gap-2 ${loader ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loader ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "SUBMIT REQUEST"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* Mobile */}
      <div className="sm:hidden">
        {/* Show Form*/}
        {!showForm && (
          <div className="bg-white rounded-xl p-4 max-w-sm mx-auto w-full">
            <h2 className="text-xl font-bold text-[#406ED5] mb-4">
              Need Blood? Fill This Form
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-between w-full border border-[#406ED5] bg-blue-100 px-4 py-3 rounded-md shadow-sm hover:bg-blue-200"
            >
              <span className="font-medium text-gray-800">
                Fill Blood Request Details
              </span>
              <ArrowRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}

        {/* Mobile Form */}
        {showForm && (
          <div className="min-h-screen py-6 px-4 bg-gray-300 flex justify-center">
            <div className="bg-white rounded-xl p-4 mx-auto max-w-sm shadow-md relative w-full">
              <h2 className="text-xl font-bold text-[#406ED5] mb-2 text-left">
                Blood Request Form
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
              >
                ×
              </button>

              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-4"
              >
                {/* Patient&apos;s Name */}
                <div>
                  <label className="text-sm font-semibold">
                    Patient&apos;s Name
                  </label>
                  <input
                    type="text"
                    {...register('patientName', {
                      required: 'This field is required',
                    })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  />
                  {errors.patientName && (
                    <p className="text-red-500 text-xs">
                      {errors.patientName.message}
                    </p>
                  )}
                </div>

                {/* Patient&apos;s DOB (mobile) */}
                <div>
                  <label className="text-sm font-semibold">
                    Patient&apos;s DOB
                  </label>
                  <input
                    type="date"
                    {...register('patientDOB', {
                      required: 'This field is required',
                    })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  />
                  {errors.patientDOB && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.patientDOB.message}
                    </p>
                  )}
                </div>

                {/* Gender & Blood Type */}
                <div className="flex gap-2">
                  {['gender', 'bloodType'].map((name) => {
                    const field = formFields.find((f) => f.name === name);
                    return (
                      <div key={name} className="w-full">
                        <label className="text-sm font-semibold">
                          {field.label}
                        </label>
                        <select
                          {...register(name, {
                            required: 'This field is required',
                          })}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        >
                          <option value="">Select</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors[name] && (
                          <p className="text-red-500 text-xs">
                            {errors[name].message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Units & Hospital */}
                <div className="flex gap-2">
                  {['unitsRequired', 'hospital'].map((name) => {
                    const field = formFields.find((f) => f.name === name);
                    return (
                      <div key={name} className="w-full">
                        <label className="text-sm font-semibold">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          {...register(name, {
                            required: 'This field is required',
                          })}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        />
                        {errors[name] && (
                          <p className="text-red-500 text-xs">
                            {errors[name].message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Medical Reason */}
                <div>
                  <label className="text-sm font-semibold">
                    Medical Reason
                  </label>
                  <textarea
                    {...register('reason', {
                      required: 'This field is required',
                    })}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm min-h-[80px]"
                  />
                  {errors.reason && (
                    <p className="text-red-500 text-xs">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                {/* Requester&apos;s Info */}
                <div>
                  <h3 className="text-lg font-semibold pb-2">
                    Requester&apos;s Info
                  </h3>
                  {['rollNumber', 'officialEmail', 'contact'].map((name) => {
                    const field = formFields.find((f) => f.name === name);
                    return (
                      <div key={name} className="mb-4">
                        <label className="text-sm font-semibold">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          {...register(name, {
                            required: 'This field is required',
                            pattern: field.pattern && {
                              value: field.pattern,
                              message:
                                name === 'contact'
                                  ? 'Must be 10 digits'
                                  : 'Invalid format',
                            },
                          })}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        />
                        {errors[name] && (
                          <p className="text-red-500 text-xs">
                            {errors[name].message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* File Upload */}
               {/* File Upload (Mobile) */}
<div className="border-2 border-gray-400 bg-slate-100 rounded-lg text-center text-sm text-gray-600 p-4 mt-4">
  <label className="cursor-pointer w-full h-full flex items-center justify-center">
    {filePreview ? (
      <div className="flex flex-col justify-center items-center w-full">
        {/* File Uploaded Successfully Message */}
        <div className="flex justify-center items-center mb-2">
          <CheckCircleIcon className="w-6 h-6 text-green-600 mr-1" />
          <span className="text-green-600 text-sm">
            File uploaded successfully
          </span>
        </div>

        File Icon + Actions
        <div className="hidden items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="h-12 w-12 text-blue-600"
            fill="currentColor"
          >
            <path d="M240 112L128 112C119.2 112 112 119.2 112 128L112 512C112 520.8 119.2 528 128 528L208 528L208 576L128 576C92.7 576 64 547.3 64 512L64 128C64 92.7 92.7 64 128 64L261.5 64C278.5 64 294.8 70.7 306.8 82.7L429.3 205.3C441.3 217.3 448 233.6 448 250.6L448 400.1L400 400.1L400 272.1L312 272.1C272.2 272.1 240 239.9 240 200.1L240 112.1zM380.1 224L288 131.9L288 200C288 213.3 298.7 224 312 224L380.1 224zM272 444L304 444C337.1 444 364 470.9 364 504C364 537.1 337.1 564 304 564L292 564L292 592C292 603 283 612 272 612C261 612 252 603 252 592L252 464C252 453 261 444 272 444zM304 524C315 524 324 515 324 504C324 493 315 484 304 484L292 484L292 524L304 524zM400 444L432 444C460.7 444 484 467.3 484 496L484 560C484 588.7 460.7 612 432 612L400 612C389 612 380 603 380 592L380 464C380 453 389 444 400 444zM432 572C438.6 572 444 566.6 444 560L444 496C444 489.4 438.6 484 432 484L420 484L420 572L432 572zM508 464C508 453 517 444 528 444L576 444C587 444 596 453 596 464C596 475 587 484 576 484L548 484L548 508L576 508C587 508 596 517 596 528C596 539 587 548 576 548L548 548L548 592C548 603 539 612 528 612C517 612 508 603 508 592L508 464z"/>
          </svg>

          <div className="flex flex-col items-start">
            <a
              href={filePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View file
            </a>

            <span
              onClick={() => document.getElementById("reportInputMobile").click()}
              className="text-blue-600 text-sm mt-1 cursor-pointer"
            >
              Change file
            </span>
             <button
            type="button"
            className="text-red-600 text-sm"
            onClick={(e) => {
              e.preventDefault();
              setFilePreview(null);
              setFileType(null);
            }}
          >
            Remove file
          </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col  items-center gap-2">
        {/* Default Upload Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-10 w-10 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 
               5.25 5.25 0 0 1 10.233-2.33 
               3 3 0 0 1 3.758 3.848 
               A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
        <span className="text-blue-600 text-base font-semibold">
          Upload Hospital Reports
        </span>
        <span className="text-gray-400 text-xs">
          Tap to upload file
        </span>
      </div>
    )}
    <input
      id="reportInputMobile"
      type="file"
      {...register("report")}
      className="hidden"
      onChange={handleFileChange}
    />
  </label>
</div>


                {/* Emergency Toggle */}
                <label className="flex items-center cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={() => setIsEmergency(!isEmergency)}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${isEmergency ? 'bg-red-600' : 'bg-gray-400'
                      }`}
                  >
                    <div
                      className={`bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${isEmergency ? 'translate-x-5' : ''
                        }`}
                    />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Emergency Request
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loader}
                  className={`bg-blue-700 text-white rounded-lg py-2 w-full flex items-center justify-center gap-2 ${loader ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loader ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodForm;
