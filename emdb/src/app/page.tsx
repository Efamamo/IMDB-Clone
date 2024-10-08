'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Results from '@/components/Results';
import Loading from './loading';

interface Movie {
  backdrop_path?: string;
  poster_path: string;
  name: string;
  title: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  vote_count: number;
}

export default function Home() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{ results: Movie[] }>();
  const [loading, setLoading] = useState(true);
  const genre = searchParams.get('genre') || 'fetchTrending';
  const API_KEY = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3${
            genre === 'fetchTopRated'
              ? `/movie/top_rated`
              : `/trending/all/week`
          }?api_key=${API_KEY}&language=en-US`,
          { next: { revalidate: 10000 } }
        );

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre]); // Fetch data whenever myParam changes

  if (loading) return <Loading />;

  return (
    <div>
      <Results results={data.results} />
    </div>
  );
}
