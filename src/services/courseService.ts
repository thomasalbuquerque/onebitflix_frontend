import { AxiosResponse } from "axios";
import api from "./api";

export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};
export type CourseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

const courseService = {
  getNewestCourses: async () => {
    const res: AxiosResponse = await api.get("/courses/newest").catch((error) => {
      console.log(error.response.data.message);

      return error.response;
    });

    const typedRes: CourseType[] = res.data;
    return typedRes;
  },

  getFeaturedCourses: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .get("/courses/featured", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    console.log(res);
    return res;
  },

  addToFav: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .post(
        "/favorites",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },

  removeFav: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .delete(`/favorites/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },

  getFavCourses: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },

  addLike: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .post(
        "likes",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },

  removeLike: async (courseId: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .delete(`/likes/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },

  getSearch: async (name: string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .get(`/courses/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.messsage);

        return error.response;
      });

    return res;
  },

  getEpisodes: async (id: number | string) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res: AxiosResponse = await api
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    console.log("linha 181 de getEpisodes");
    return res;
  },
};

export default courseService;
