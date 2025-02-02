import api from ".";

export const addPageSection = async (data) => {
    return api.post("/pagecontent/add-page-section", data);
}

export const getPageSections = async (id) => {
    return api.get(`/pagecontent/get-page-section/${id}`);
}