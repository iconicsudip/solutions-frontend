import api from ".";

export const getPages = async (isPublished) => {
  if (isPublished) {
    return api.get("/pages?isPublished=true");
  }
  return api.get("/pages");
};

export const getPage = async (id) => {
  return api.get(`/pages/${id}`);
};

export const createPage = async (data) => {
  return api.post("/pages/add-page", data);
};

export const updatePage = async (id, data) => {
  return api.put(`/pages/${id}`, data);
};

export const deletePage = async (id) => {
  return api.delete(`/pages/delete-page/${id}`);
};

export const publishPage = async (id) => {
    return api.put(`/pages/publish-page/${id}`);
}

export const unpublishPage = async (id) => {
    return api.put(`/pages/unpublish-page/${id}`);
}