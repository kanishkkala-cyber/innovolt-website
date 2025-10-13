// API service for communicating with the backend
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Generic API call method
  async apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Cars API
  async getCars(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });

    const endpoint = queryParams.toString() 
      ? `/cars?${queryParams.toString()}`
      : '/cars';

    return this.apiCall(endpoint);
  }

  async getCar(id) {
    return this.apiCall(`/cars/${id}`);
  }

  // Contact API
  async submitContact(formData) {
    return this.apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Leads API
  async submitLead(formData) {
    return this.apiCall('/leads', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Callback API
  async submitCallback(formData) {
    return this.apiCall('/callback', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Health check
  async healthCheck() {
    return this.apiCall('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
