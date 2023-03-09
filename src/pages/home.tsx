import Footer from "@/components/common/footer";
import HeaderAuth from "@/components/common/headerAuth";
import FavoritesCourses from "@/components/homeAuth/favoriteCategory";
import FeaturedCategory from "@/components/homeAuth/featuredCategory";
import FeaturedSection from "@/components/homeAuth/featuredSection";
import ListCategories from "@/components/homeAuth/listCategory";
import NewestCategory from "@/components/homeAuth/newestCategory";
import Head from "next/head";

const HomeAuth = function () {
  return (
    <>
			<Head>
        <title>Onebitflix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection/>
        <NewestCategory />
        <FavoritesCourses/>
        <FeaturedCategory/>
        <ListCategories/>
        <Footer/>
      </main>
    </>
  );
};

export default HomeAuth;