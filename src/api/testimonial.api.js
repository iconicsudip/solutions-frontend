import api from ".";

export const getTestimonials = async () => {
  return api.get("/testimonials");
};

export const createTestimonial = async (data) => {
  return api.post("/testimonials/add-testimonial", data);
};

export const deleteTestimonial = async (id) => {
  return api.delete(`/testimonials/delete-testimonial/${id}`);
};

export const updateTestimonial = async (id, values) => {
  return api.put(`/testimonials/update-testimonial/${id}`, values);
};
