import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import categoriesService from "../../../../services/categoriesService";
import SlideComponent from "@/components/common/slideComponent";
import { Container } from "reactstrap";
import PageSpinner from "@/components/common/pageSpinner";
//import SwrSpinner from "../../../common/swrSpinner";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = function ({ categoryId, categoryName }: props) {
  const { data, error } = useSWR(`/categories/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <Container className="d-flex flex-column align-items-center">
        <p className={styles.titleCategory}>{categoryName}</p>
        <SlideComponent courses={data.data.courses} />
      </Container>
    </>
  );
};

export default ListCategoriesSlide;
