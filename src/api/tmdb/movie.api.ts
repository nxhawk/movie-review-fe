import AxiosClient from "./tmdb-client";

const movieApi = {
  getDetails: async (movieId: string) => {
    const res = await AxiosClient.get(`/movie/${movieId}`);
    return res.data;
  },
};

export default movieApi;
