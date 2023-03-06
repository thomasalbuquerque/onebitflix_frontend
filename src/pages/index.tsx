import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/HomeNoAuth.module.scss'
import courseService, { CourseType } from '@/services/courseService'
import { GetStaticProps } from 'next'
import { ReactNode } from 'react'
import HeaderNoAuth from '@/components/homeNoAuth/headerNoAuth'
import PresentationSection from '@/components/homeNoAuth/presentationSection'
import CardsSection from '@/components/homeNoAuth/cardsSection'
import SlideSection from '@/components/homeNoAuth/slideSection'

const inter = Inter({ subsets: ['latin'] })

interface IndexPageProps {
  children?: ReactNode;
  courses: CourseType[];
}

const HomeNoAuth =  function ({ courses }: IndexPageProps) {
  return (
		<>
			<Head>
        <title>Home</title>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
				<meta property="og:title" content="Onebitflix" key="title" />
				<meta name="description" content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil."/>
      </Head>
			<main>
				<div className={styles.sectionBackground}>
					<HeaderNoAuth/>
					<PresentationSection/>
				</div>
				<CardsSection />
		    <SlideSection newestCourses={courses}/>
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