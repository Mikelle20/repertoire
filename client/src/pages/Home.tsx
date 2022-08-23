import React from 'react';
import axios from 'axios';
import HomeContainer from '../components/Home/HomeContainer';

function Home(): JSX.Element {
  interface TokenInterface {
    token: string
    exp: number
  }
  const stringifiedToken: string | null = window.sessionStorage.getItem('accessToken') || null;
  const accessToken: TokenInterface = JSON.parse(stringifiedToken);
  if (!accessToken) window.location.href = '/login';

  const [data, setData] = React.useState<unknown | null>(null);
  const [socials, setSocials] = React.useState< unknown | null>(null);
  const [error, setError] = React.useState<{isError: boolean, error: string}>({
    isError: false,
    error: '',
  });

  const headers = {
    Authorization: `Bearer ${accessToken.token}`,
  };

  React.useEffect((): void => {
    axios.get('/home/setHome', { withCredentials: true, headers }).then((res): void => {
      setData(res.data);
    }).catch((): void => {
      setError({
        isError: true,
        error: '(500) Internal Server Error.',
      });
    });

    axios.get('/home/getSocials', { withCredentials: true, headers }).then((res): void => {
      setSocials(res.data);
    }).catch((): void => {
      setError({
        isError: true,
        error: '(500) Internal Server Error.',
      });
    });
  }, []);

  return (
    <div className="landingContainer">
      {accessToken && (
      <div className="pageContainer">
        {socials && data !== null
          ? <HomeContainer data={data} socials={socials} />
          : (
            <div className="loadingScreen">
              {error.isError ? error.error : 'Loading...'}
            </div>
          )}
      </div>
      )}
    </div>
  );
}

export default Home;
