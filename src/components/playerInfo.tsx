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
    mythic_plus_best_runs: Array<{}>;
    mythic_plus_scores_by_season: Array<{
      scores: Score;
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

  const querydata: string =
    "&fields=mythic_plus_best_runs%3Aall%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_ranks";

  async function fetchPlayerData(playerRealm: string, playerName: string) {
    const response = await fetch(
      "https://raider.io/api/v1/characters/profile?region=eu&realm=" +
        playerRealm +
        "&name=" +
        playerName +
        querydata
    );
    const jsonPlayerData = await response.json();
    console.log(jsonPlayerData);
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
        <label
          className="block text-black-900 text-sm font-bold mb-2"
          htmlFor="playerRealm"
        >
          Player Realm
        </label>
        <input
          required
          type="text"
          id="playerRealm"
          value={playerRealm}
          onChange={(e) => setPlayeyRealm(e.target.value)}
        />
        <br></br>
        <br></br>
        <label
          className="block text-black-900 text-sm font-bold mb-2"
          htmlFor="playerName"
        >
          Player Name
        </label>
        <input
          required
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <br></br>
        <br></br>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            if (playerName != "" && playerRealm != "") {
              handleSubmit(playerRealm, playerName);
            }
          }}
        >
          Submit
        </button>
      </form>
      <br></br>
      <div className="bg-gray-800 box-border rounded-lg  w-128 p-4 border-4 border-red-800 ">
        <div className=" flex flex-row justify-center">
          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>All</p>
            {data?.mythic_plus_scores_by_season[0].scores.all}
          </div>

          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>Dps</p>
            {data?.mythic_plus_scores_by_season[0].scores.dps}
          </div>

          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>healer</p>
            {data?.mythic_plus_scores_by_season[0].scores.healer}
          </div>

          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>tank</p>
            {data?.mythic_plus_scores_by_season[0].scores.tank}
          </div>

          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>spec_0</p>
            {data?.mythic_plus_scores_by_season[0].scores.spec_0}
          </div>

          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>spec_1</p>
            {data?.mythic_plus_scores_by_season[0].scores.spec_1}
          </div>

          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>scep_02</p>
            {data?.mythic_plus_scores_by_season[0].scores.spec_2}
          </div>

          <div className="bg-gray-700 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
            <p>scep_03</p>
            {data?.mythic_plus_scores_by_season[0].scores.spec_3}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerInfo;
