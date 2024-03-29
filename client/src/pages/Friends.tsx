import React from 'react';
import FriendSearchBar from '../components/Friend/FriendSearchBar';

function Friends(): JSX.Element {
  interface TokenInterface {
    token: string
    exp: number
  }
  const stringifiedToken: string = window.sessionStorage.getItem('accessToken') || '{}';
  const accessToken: TokenInterface = JSON.parse(stringifiedToken);
  if (!accessToken) window.location.href = '/login';
  return (
    <div className="landingContainer">
      <div className="pageContainer">
        {accessToken && <FriendSearchBar />}
      </div>
    </div>
  );
}

export default Friends;
