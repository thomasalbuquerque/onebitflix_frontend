import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/HomeNoAuth.module.scss'
import courseService, { CourseType } from '@/services/courseService'
import { GetStaticProps } from 'next'
import { ReactNode, useEffect } from 'react'
import HeaderNoAuth from '@/components/homeNoAuth/headerNoAuth'
import PresentationSection from '@/components/homeNoAuth/presentationSection'
import CardsSection from '@/components/homeNoAuth/cardsSection'
import SlideSection from '@/components/homeNoAuth/slideSection'
import Footer from '@/components/common/footer'
import AOS from "aos"
import "aos/dist/aos.css"


const inter = Inter({ subsets: ['latin'] })

interface IndexPageProps {
  children?: ReactNode;
  courses: CourseType[];
}

const HomeNoAuth =  function ({ courses }: IndexPageProps) {
	useEffect(()=>{
		AOS.init()
	}, [])

  return (
		<>
			<Head>
        <title>Home</title>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
				<meta property="og:title" content="Onebitflix" key="title" />
				<meta name="description" content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil."/>
      </Head>
			<main>
				<div className={styles.sectionBackground} data-aos="fade-zoom-in" data-aos-duration="1600">
					<HeaderNoAuth/>
					<PresentationSection/>
				</div>
				<div data-aos="fade-right" data-aos-duration="1200">
					<CardsSection />
				</div>
				<div data-aos="fade-up" data-aos-duration="1250">
					<SlideSection newestCourses={courses}/>
				</div>				
				<Footer/>
			</main>
		</>
)};

export default HomeNoAuth


export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      courses: res,
    },
    revalidate: 3600 * 24,
  };
}