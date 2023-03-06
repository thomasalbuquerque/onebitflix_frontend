import SlideComponent from "@/components/common/slideComponent";
import { CourseType } from "@/services/courseService";
import Link from "next/link";
import { Button, Container } from "reactstrap";
import styles from "./styles.module.scss";

interface props {
  newestCourses: CourseType[];
}

const SlideSection = function ({ newestCourses }: props) {
  return( 
    <>
      <Container fluid>
        <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
        <SlideComponent courses={newestCourses} />
        <Link href="/register">
          <Button outline color="light" className={styles.slideSectionBtn}>Se cadastre para acessar!</Button>
        </Link>
      </Container>
    </>)
};

export default SlideSection;