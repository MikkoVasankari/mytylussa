import { useState } from "react";

function PlayerInfo() {
  const [playerRealm, setPlayeyRealm] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [data, setData] = useState<dataItem | undefined>(undefined);

  interface dataItem {
    name: string;
    race: string;
    class: string;
    faction: string;
  }

  async function fetchPlayerData(playerRealm: string, playerName: string) {
    const response = await fetch(
      "https://raider.io/api/v1/characters/profile?region=eu&realm="+ playerRealm +"&name=" + playerName +"&fields=gear%2Ctalents"
    );
    const jsonPlayerData = await response.json();
    //console.log(jsonPlayerData);
    setData(jsonPlayerData);
  }

  function handleSubmit(playerRealm: string, playerName: string) {
    fetchPlayerData(playerRealm, playerName);
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
        <button
          onClick={() => {
            handleSubmit(playerRealm, playerName);
          }}
        >
          Submit
        </button>
      </form>

      <p>JOU</p>
    </div>
  );
}

export default PlayerInfo;
