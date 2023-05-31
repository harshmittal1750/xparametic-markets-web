import WalletConnect from './WalletConnect';
import WalletInfo from './WalletInfo';

type ProfileProps = {
  isLoggedIn: boolean;
};

export default function Wallet({ isLoggedIn }: ProfileProps) {
  if (isLoggedIn) return <WalletInfo />;
  return <WalletConnect />;
}
