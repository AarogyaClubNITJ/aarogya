import { useState, useEffect } from 'react';
import footer from '../assets/bloodFooter1.svg';
import { MagnifyingGlassIcon, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { donorsAPI } from '../utils/api';

const Donors = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;
  const [donors, setDonors] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDonors: 0,
    hasNext: false,
    hasPrev: false,
    limit: 10
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bloodFilter, setBloodFilter] = useState('');
  const [showBloodFilter, setShowBloodFilter] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Fetch donors from API
  const fetchDonors = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await donorsAPI.getAllDonors(page, limit);
      
      if (response.success) {
        setDonors(response.data.donors);
        setPagination(response.data.pagination);
        console.log('Pagination data:', response.data.pagination); // Debug log
      } else {
        setError('Failed to fetch donors');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch donors');
      console.error('Error fetching donors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDonors(currentPage, entriesPerPage);
  }, [currentPage, entriesPerPage]);

  // Filter donors based on search and blood group
  const filteredDonors = donors.filter(donor => {
    const matchesName = donor.name.toLowerCase().includes(search.toLowerCase());
    const matchesBlood = bloodFilter ? donor.bloodGroup === bloodFilter : true;
    return matchesName && matchesBlood;
  });

  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      fetchDonors(page, entriesPerPage);
    }
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        // For now, we'll filter on the frontend
        // In a real app, you might want to implement server-side search
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className=" px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 sm:mb-10">
        Join our community of donors
      </h2>

      {/* Search bar */}
      <div className="w-[90%] sm:w-[60%] md:w-[45%] mb-4 bg-[#F0F4FE] border-[1px] border-[#8EB1FF] rounded-md flex items-center px-3 sm:pl-10 py-2 focus-within:ring-2 focus-within:ring-blue-400">
        <MagnifyingGlassIcon className="w-5 h-5 text-black mr-2" />
        <input
          type="text"
          placeholder="See your name shine on the donor list"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full text-md sm:text-xl bg-transparent focus:outline-none placeholder:text-black font-normal"
        />
      </div>

      {/* Filter UI (conditionally rendered) */}
      {showBloodFilter && (
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={bloodFilter}
            onChange={(e) => {
              setBloodFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-[#8EB1FF] rounded-md px-3 py-1 bg-[#F0F4FE]"
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto sm:overflow-visible shadow ring-1 ring-[#8EB1FF] rounded-lg">
        <table className="min-w-full mx-auto bg-white rounded-lg">
          <thead>
            <tr className="bg-[#E5EDFF] text-center text-sm sm:text-xl">
              <th className="px-4 py-3 font-normal">Name</th>
              <th className="px-4 py-3 font-normal">Roll Number/Employee Id</th>
              <th className="px-4 py-3 font-normal">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <span>Blood Group</span>
                  <FunnelIcon
                    className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"
                    onClick={() => setShowBloodFilter(prev => !prev)}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                  Loading donors...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredDonors.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                  No donors found
                </td>
              </tr>
            ) : (
              filteredDonors.map((donor) => (
                <tr
                  key={donor._id}
                  className="border-t font-normal text-center text-md sm:text-xl border-[#8EB1FF] hover:bg-gray-50"
                >
                  <td className="px-4 py-4">{donor.name}</td>
                  <td className="px-4 py-4">{donor.rollNo}</td>
                  <td className="px-4 py-4">{donor.bloodGroup}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      {/* Page navigation */}
      {!loading && !error && (
        <div className="flex items-center justify-between px-2 gap-2 mt-6">
          <div className="text-sm text-gray-600">
            Showing {donors.length} of {pagination.totalDonors} donors
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-lg">
              Page {pagination.currentPage || 1} of {pagination.totalPages || 1}
            </span>
            {pagination.totalPages > 1 && (
              <>
                <button 
                  onClick={() => goToPage(1)} 
                  disabled={!pagination.hasPrev} 
                  className="px-3 py-2 rounded-lg border border-[#8EB1FF] bg-[#E5EDFF] disabled:opacity-70 hover:bg-[#D1E7FF] transition-colors"
                >
                  <ChevronDoubleLeftIcon className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => goToPage(currentPage - 1)} 
                  disabled={!pagination.hasPrev} 
                  className="px-3 py-2 rounded-lg border border-[#8EB1FF] bg-[#E5EDFF] disabled:opacity-70 hover:bg-[#D1E7FF] transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => goToPage(currentPage + 1)} 
                  disabled={!pagination.hasNext} 
                  className="px-3 py-2 rounded-lg border border-[#8EB1FF] bg-[#E5EDFF] disabled:opacity-70 hover:bg-[#D1E7FF] transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => goToPage(pagination.totalPages)} 
                  disabled={!pagination.hasNext} 
                  className="px-3 py-2 rounded-lg border border-[#8EB1FF] bg-[#E5EDFF] disabled:opacity-70 hover:bg-[#D1E7FF] transition-colors"
                >
                  <ChevronDoubleRightIcon className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/*Footer image */}
      <div className='m-0 p-0'>
        <img src={footer} alt="" className="block w-full h-auto m-0 p-0" />
      </div>
    </div>
  );
};

export default Donors;
