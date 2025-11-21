import useWeb3 from '../../hooks/useWeb3.js';
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';

function Account() {
  const { provider, account } = useWeb3();

  if (provider) return <Authenticated library={provider} account={account} />;

  return <Unauthenticated />;
}

export default Account;
