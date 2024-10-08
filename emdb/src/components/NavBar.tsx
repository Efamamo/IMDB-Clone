import NavBarItem from './NavBarItem';

export default function NavBar() {
  return (
    <div className="flex dark:bg-gray-600 bg-gray-200 p-4 lg:text-lg justify-center gap-6 ">
      <NavBarItem title="Trending" link="fetchTrending" />
      <NavBarItem title="Top Rated" link="fetchTopRated" />
    </div>
  );
}
