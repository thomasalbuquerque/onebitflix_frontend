import styles from '../styles/search.module.scss';
import Head from 'next/head';
import HeaderAuth from '@/components/common/headerAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import courseService, { CourseType } from '@/services/courseService';
import SearchCard from '@/components/searchCard';
import { Container } from 'reactstrap';
import Footer from '@/components/common/footer';
import PageSpinner from '@/components/common/pageSpinner';

const Search = function () {
  const router = useRouter();
  const searchName: any = router.query.name;

  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const [searchRender, setSearchRender] = useState(true);

  const [loading, setLoading] = useState(true);

  const searchCourses = async function () {
    const res = await courseService.getSearch(searchName);

    console.log('console.log(res) search.tsx');
    console.log(res);
    console.log(res.data.rows);
    setSearchResult(res.data.rows);

    if (res.data.rows.length === 0) {
      setSearchRender(false);
    } else {
      setSearchRender(true);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);
  useEffect(() => {
    if (!sessionStorage.getItem('onebitflix-token')) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <div className={styles.searchResult}>
          {searchRender ? (
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          ) : (
            <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
          )}
        </div>
        <div className={styles.header}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Search;
