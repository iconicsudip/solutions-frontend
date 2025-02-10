import api from "."; // Import the base Axios instance

// ✅ Get All Headers
export const getAllHeaders = async () => {
  return api.get(`/header`);
};

// ✅ Get Header by ID
export const getHeaderById = async (id) => {
  return api.get(`/header/${id}`);
};

// ✅ Create or Update a Header
export const saveHeader = async (data) => {
  return api.post(`/header`, data);
};
export const updateHeader = async (id, data) => {
  return api.put(`/header/${id}`, data);
};
// ✅ Delete a Header
export const deleteHeader = async (id) => {
  return api.delete(`/header/${id}`);
};
