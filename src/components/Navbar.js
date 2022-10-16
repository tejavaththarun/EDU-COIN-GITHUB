

const Navbar = (props) => {
  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
      <div img src="/tezos.png"></div>
        <a href="/" className="navbar-brand">
          EDU COIN
        </a>
        <a href="https://ghostnet.tzkt.io/">
                <button class="center" align="left" BackgroundColor="dark">Coin Tracker</button>
            </a>
        <div className="d-flex">
          {/* TODO 4.b - Call connectWallet function onClick  */}
          <button onClick={props.onConnectWallet} className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            {props.account ? props.account : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
