import { CourseType } from "@/services/courseService";
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../slideCard";
import styles from "./styles.module.scss";

interface props {
  courses: CourseType[];
}

const SlideComponent = function ({ courses }: props) {
  let slideCount = 0;

  if (courses.length > 4) {
    slideCount = 4;
  } else if (courses) {
    slideCount = courses.length;
  }

  return(
    <>
      <div>
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width:  slideCount * 300,
            pagination: false,
            arrows: courses.length > 4 ? true : false,
            drag: courses.length > 4 ? true : false,
            breakpoints: {
              1200: {
                perPage: slideCount >= 2 ? 2 : 1,
                width: slideCount >= 2 ? 640 : 300,
                arrows: courses.length > 2 ? true : false,
                drag: courses.length > 2 ? true : false,
              },
              640: {
                perPage: 1,
                width: 300,
                arrows: courses.length > 1 ? true : false,
                drag: courses.length > 1 ? true : false,
              },
              300: {
                width: 250,
              },
            },
          }} className={styles.slides}
        >
          {courses?.map((course) => (
            <SplideSlide key={course.id}>
              <SlideCard course={course} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>)
}

export default SlideComponent