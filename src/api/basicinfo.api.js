import api from ".";

export const getBasicInfo = async () => {
  return api.get(`/basic-info`);
};

export const upsertBasicInfo = async (body) => {
  return api.post("/basic-info/upsert", body);
};
