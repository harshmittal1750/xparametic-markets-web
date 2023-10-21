import MarketCardList from 'components/MarketCardList';

const MarketListNew = () => {
  return (
    <div
      style={{
        justifyContent: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
      }}
    >
      <MarketCardList />
    </div>
  );
};

export default MarketListNew;
