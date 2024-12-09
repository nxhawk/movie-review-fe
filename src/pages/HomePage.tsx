import HomeHeader from "../components/home/HomeHeader.tsx";
import Trending from "../components/home/Trending.tsx";

const HomePage = () => {
  // const { auth } = React.useContext(AuthContext)!;
  return (
    <>
      <HomeHeader />
      <Trending />
    </>
  );
};

export default HomePage;
