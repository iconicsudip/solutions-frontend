import api from ".";

export const getServices = async () => {
  return api.get("/service");
};

export const getService = async (id) => {
  return api.get(`/service/${id}`);
};

export const createService = async (data) => {
  return api.post("/service/add-service", data);
};

export const deleteService = async (id) => {
  return api.delete(`/service/delete-service/${id}`);
};

export const updateService = async (id, values) => {
  return api.put(`/service/update-service/${id}`, values);
};
