import SlideComponent from "@/components/common/slideComponent";
import PageSpinner from "@/components/common/spinner";
import { Container } from "reactstrap";
import useSWR from "swr";
import courseService from "../../../services/courseService";
import styles from "../../../styles/slideCategory.module.scss";
// import SwrSpinner from "../../common/swrSpinner";

const NewestCategory = function () {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return error;
  if (!data){
    return <PageSpinner/>
  }
  return(
    <>
      <Container fluid className="d-flex flex-column align-items-center py-5">
        <p className={styles.titleCategory}>LANÇAMENTOS</p>
        <SlideComponent courses={data} />
      </Container>
    </>
  )
}

export default NewestCategory