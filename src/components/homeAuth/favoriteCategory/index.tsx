import styles from "../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "@/services/courseService";
import SlideComponent from "@/components/common/slideComponent";
import { Container } from "reactstrap";
import PageSpinner from "@/components/common/pageSpinner";

const FavoritesCourses = function () {
  const { data, error } = useSWR("/favCourses", courseService.getFavCourses);
  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <Container className="d-flex flex-column align-items-center py-5">
        <p className={styles.titleCategory}>MINHA LISTA</p>
        {data.data.courses.length >= 1 ? (
          <SlideComponent courses={data.data.courses} />
        ) : (
          <p className="h5 text-center pt-3">
            <strong>Você não tem nenhum curso na lista</strong>
          </p>
        )}
      </Container>
    </>
  );
};

export default FavoritesCourses;
