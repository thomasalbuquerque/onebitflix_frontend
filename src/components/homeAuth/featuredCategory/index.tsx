import styles from "../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "../../../services/courseService";
import SlideComponent from "@/components/common/slideComponent";
import { Container } from "reactstrap";
import PageSpinner from "@/components/common/spinner";
//import SwrSpinner from "../../common/swrSpinner";

const FeaturedCategory = function () {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error;
  //if (!data) return <SwrSpinner />;
  if (!data){
    return <PageSpinner/>
  }
  return (
    <>
      <Container className="d-flex flex-column align-items-center py-5">
        <p className={styles.titleCategory}>EM DESTAQUE</p>
        <SlideComponent courses={data.data} />
      </Container>
    </>
  );
};
export default FeaturedCategory;
