import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import { connectWallet, getAccount } from "./utils/wallet";
import { default as MerkleTree } from 'merkletreejs';
import { default as SHA256 } from 'crypto-js/sha256';

// import { buyTicketOperation, endGameOperation } from "./utils/operation";
// import { fetchStorage } from "./utils/tzkt";

const PP = (props) => {


  const leaves = ["tz1fXPe9jAivVY461pzrXy2sDtFiVg8WigdK", "tz1U5wp9QG1W7eZpJHLTNcbsPFFLZ2Gdig6n", "tz1i8uw3dA5Q7gL2PWw8ZpoaRnXrCf9CRSpB", "tz1QgFd433XVd7rZ48R7HxPTQqfP9y2yQYkz", "tz1R1qshxuoYpER9E1QcUXy9miUsa1Sn9fzm", "tz1hCqR1kZHP4dVbsyRFne3SWa4zn7CND2eA", "tz1XgDUS8v6QpCYB2CNgJoxpfSSN9xmg2X85", "tz1UbvgqbFQbCHSNdwBaL53WJcHUMrihMg6j", "tz1hUbgsgjQk9jq6fR4yZAn9LU2zXgaWWABj", "tz1hMA1mArtQw1whzufeGcKPy4TzBYVotbvz", "tz1YWm4dbDtRMuxzzmCarQGjLLY3kf3yUDUd", "tz1W1gVhrXcrWChNtiLqR5snKdN9VfFeDJg7", "tz1hsz3HiHHUADZZW8fgM3Yf8BkLr5xFXtCT", "tz1QDue9E1FFHFUGnJn5YgiXFVaAYLug6NLj", "tz1Yttar1DHVdD6cfjjRVYw1kD4HwMFHdVQy"].map(addr =>SHA256(addr)) //leaf nodes are the 15 white list addresses
  const MT = new MerkleTree(leaves, SHA256) //creating merkle tree object
  const root = MT.getRoot().toString('hex')//root hash hex
  
  if (props) {
    const leaf = SHA256(props.account); //replace with query address
      const proof = MT.getProof(leaf)
      if (MT.verify(proof, leaf, root)) {
        props.setText("Congrats you are a white listed user" );
      } else {
        props.setText("Not Authorized");
      }
  }

  return <div>{props.text}</div>;
}

const App = () => {
 
  const [account, setAccount] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  

  // TODO 4.a - Create onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  return (
    <div className="h-100">
      <Navbar onConnectWallet={onConnectWallet} account={account}/>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <PP account={account} text={text} setText={setText}/>
      </div>
    </div>
  );

};

export default App;


// tickets > 0 ? (
//   <button onClick={onBuyTicket} className="btn btn-primary btn-lg">
//     {/* TODO 7.b - Call onBuyTicket on click */}
//     {/* TODO 7.c - Show "loading..." when buying operation is pending */}
//     {loading ? "Loading..." : "Buy Ticket"}
//   </button>
// ) : (
//   <button onClick={onEndGame} className="btn btn-success btn-lg">
//     {/* TODO 11.b - Call onEndGame on click */}
//     {/* TODO 11.c - Show "loading..." when buying operation is pending */}
//     {loading ? "Loading..." : "End Game"}
//   </button>
// )

// {/* Ticket remaining display */}
// {/* <div className="py-1"></div> */}
// {/* Action Buttons */}
// {/* List of Players */}
// {/* <div className="mt-2"> */}
  // {/* {players.map((player, index) => (
  //   <div key={index}>
  //     <b>Ticket {index + 1}:</b> {player}
  //   </div>
  // // ))} */}

   // Players holding lottery tickets
  // const [players, setPlayers] = useState([]);
  // const [tickets, setTickets] = useState(5);
  // const [loading, setLoading] = useState(false);

  // Set players and tickets remaining
  // useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
  //   (async () => {
  //     const storage = await fetchStorage();
  //     setPlayers(Object.values(storage.players));
  //     setTickets(storage.tickets_available);
  //   })();
  // }, []);

  // // TODO 7.a - Create onBuyTicket
  // const onBuyTicket = async () => {
  //   try {
  //     setLoading(true);
  //     await buyTicketOperation();
  //     alert("Transaction succesful!");
  //   } catch (err) {
  //     alert(err.message);
  //   }
  //   setLoading(false);
  // };

  // TODO 11.a - Create onEndGame
  // const onEndGame = async () => {
  //   try {
  //     setLoading(true);
  //     await endGameOperation();
  //     alert("Transaction succesful!");
  //   } catch (err) {
  //     alert(err.message);
  //   }
  //   setLoading(false);
  // };
