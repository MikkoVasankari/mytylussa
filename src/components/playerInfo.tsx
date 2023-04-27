import { useState } from "react";

function PlayerInfo() {
  const [playerRealm, setPlayeyRealm] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [data, setData] = useState<dataItem | undefined>(undefined);

  const querydata: string =
    "&fields=mythic_plus_best_runs%3Aall%2Cmythic_plus_scores_by_season%3Acurrent";

  interface dataItem {
    name: string;
    race: string;
    class: string;
    faction: string;
    mythic_plus_scores_by_season: Array<{
      scores: Score
    }>;
  }

  interface Score {
    all: number;
    dps?: number;
    healer?: number;
    tank?: number;
    spec_0: number;
    spec_1: number;
    spec_2?: number;
    spec_3?: number;
  }

  async function fetchPlayerData(playerRealm: string, playerName: string) {
    const response = await fetch(
      "https://raider.io/api/v1/characters/profile?region=eu&realm=" +
        playerRealm +
        "&name=" +
        playerName +
        querydata
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

  console.log(data?.mythic_plus_scores_by_season);

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
      
      <div>

          { data?.mythic_plus_scores_by_season[0].scores.all }
          <p>dps</p>
          { data?.mythic_plus_scores_by_season[0].scores.dps }
          <p>healer</p>
          { data?.mythic_plus_scores_by_season[0].scores.healer }
          <p>tank</p>
          { data?.mythic_plus_scores_by_season[0].scores.tank }
          <p>spec_0</p>
          { data?.mythic_plus_scores_by_season[0].scores.spec_0 }
          <p>spec_1</p>
          { data?.mythic_plus_scores_by_season[0].scores.spec_1}
          <p>scep_02</p>
          { data?.mythic_plus_scores_by_season[0].scores.spec_2 }
          <p>scep_03</p>
          { data?.mythic_plus_scores_by_season[0].scores.spec_3 }

      </div>

      <p>JOU</p>
    </div>
  );
}

export default PlayerInfo;
