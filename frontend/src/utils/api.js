const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authAPI = {
  // Send email and get verification code
  userInfo: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/userInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification code');
      }

      return data;
    } catch (error) {
      console.error('Error in userInfo API:', error);
      throw error;
    }
  },

  // Verify user with verification code
  verifyUser: async (email, verificationCode) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/verifyUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          verificationCode: parseInt(verificationCode) 
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify user');
      }

      return data;
    } catch (error) {
      console.error('Error in verifyUser API:', error);
      throw error;
    }
  }
};

export const quizAPI = {
  // Submit quiz answer
  submit: async (email, answer, rollNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, answer, rollNo })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit quiz');
      }

      return data;
    } catch (error) {
      console.error('Error in quiz submit API:', error);
      throw error;
    }
  }
};

export const donorsAPI = {
  // Get all donors with pagination and filtering
  getAllDonors: async (page = 1, limit = 3, sortBy = "createdAt", sortOrder = "desc") => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder
      });

      const response = await fetch(`${API_BASE_URL}/ally/donors?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch donors');
      }

      return data;
    } catch (error) {
      console.error('Error in getAllDonors API:', error);
      throw error;
    }
  }
};