import { Redirect, useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  console.log("Router:", router);

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
