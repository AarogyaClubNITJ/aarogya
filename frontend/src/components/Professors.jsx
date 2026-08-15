import raviverma from '../assets/professorDP/raviverma.png'
import tarunsir from '../assets/professorDP/tarun.png'

const Professors = () => {
  const testimonial = [
    {
      id: 1,
      profdesc: `Let's prioritize health and well-being as a community. Your involvement with the Aarogya Club is more than participation—it's a step toward creating a healthier, happier campus for everyone. Together, we can make a lasting difference!`,
      profname: "Dr. Ravi Verma",
      dp: raviverma
    },
    {
      id: 2,
      profdesc: `By fostering health awareness and providing education, we empower individuals and our community to build a brighter, healthier, and more sustainable future for all!`,
      profname: "Dr. Tarun Sehgal",
      dp: tarunsir
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className='relative'>
        <h2 className="-inset-1 right-0 top-0 font-bold text-4xl md:text-5xl lg:text-7xl text-[#406ED5] text-center mb-16 absolute">
          OUR COORDINATORS
        </h2>
        <h2 id='stroke1' className="text-[#808080] font-bold text-4xl md:text-5xl lg:text-7xl text-center mb-16">
          OUR COORDINATORS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        {testimonial.map((details) => (
          <div
            key={details.id}
            className="relative bg-white rounded-2xl ring-1 ring-[#808080] p-8 h-[320px] sm:shadow-custom flex flex-col justify-between"
          >
            <div className="h-full flex flex-col justify-between pt-8">
              <p className="text-gray-700 flex-grow font-semibold">{details.profdesc}</p>
              <div className='flex gap-6 justify-center '>
                <img
                  src={details.dp}
                  className="w-15 h-15 rounded-full ring-2 ring-black object-cover"
                  alt={details.profname}
                />
                <h3 className="font-bold text-lg mt-4">{details.profname}</h3>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Professors;