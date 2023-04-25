import { useState } from "react";

function PlayerInfo() {
  const [playerRealm, setPlayeyRealm] = useState("");
  const [playerName, setPlayerName] = useState("");

  function handleSubmit(name: String, email: String) {
    console.log(name + " " + email);
    setPlayeyRealm("");
    setPlayerName("");
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="playerRealm">Player Realm</label>
        <input
          type="text"
          id="playerRealm"
          value={playerRealm}
          onChange={(e) => setPlayeyRealm(e.target.value)}
        />
        <br></br>
        <label htmlFor="playerName">Player Name</label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <br></br>
        <br></br>
        <button onClick={() => handleSubmit(playerRealm, playerName)}>
          Submit
        </button>
      </form>

      <p>JOU</p>
    </div>
  );
}

export default PlayerInfo;
