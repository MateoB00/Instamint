import axios from 'axios';

export const uploadOriginalContent = async (formData: FormData) => {
  await axios
    .post(`${import.meta.env.VITE_API_URL}/original-content/upload`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response)
    .catch((error) => error);
};

export const getAllOriginalContentsByUser = async () =>
  await axios
    .get(`${import.meta.env.VITE_API_URL}/original-content/allByUser`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => error);
