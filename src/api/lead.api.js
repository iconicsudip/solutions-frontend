import api from ".";

export const getAllLeads = async () => {
  return api.get(`/lead`);
};
