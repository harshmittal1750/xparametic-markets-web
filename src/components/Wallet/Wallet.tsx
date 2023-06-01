import WalletConnect from 'components/WalletConnect';
import WalletInfo from 'components/WalletInfo';

type ProfileProps = {
  isLoggedIn: boolean;
};

export default function Wallet({ isLoggedIn }: ProfileProps) {
  if (isLoggedIn) return <WalletInfo />;
  return <WalletConnect />;
}
