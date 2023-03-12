import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import HeaderAuth from "@/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/services/courseService";

const CoursePage = function () {
  const [course, setCourse] = useState<CourseType>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getCourse();
  }, [id]);

  const getCourse = async function () {
    if (typeof id !== "string") return;
  
    const res = await courseService.getEpisodes(id);
  
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  return (
    <>
      <Head>
        <title>Onebitflix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
				<HeaderAuth />
        <p>{course?.name}</p>
			</main>
    </>
  );
};

export default CoursePage;