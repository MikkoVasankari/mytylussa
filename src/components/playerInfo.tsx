import { useState } from "react";

function PlayerInfo() {
  const [playerRealm, setPlayeyRealm] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [data, setData] = useState<dataItem | undefined>(undefined);

  interface dataItem {
    name: string;
    race: string;
    class: string;
    active_spec_name: string;
    faction: string;
    realm: string;
    mythic_plus_best_runs: Array<{
      affixes: Array<{
        icon: string;
        id: number;
        name: string;
      }>;
      clear_time_ms: number;
      dungeon: string;
      mythic_level: string;
      num_keystone_upgrades: number;
      score: number;
    }>;
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
    setData(jsonPlayerData);
    console.log(jsonPlayerData);
  }

  function handleSubmit(playerRealm: string, playerName: string) {
    fetchPlayerData(playerRealm, playerName);
    setPlayeyRealm("");
    setPlayerName("");
  }

  return (
    <div>
      <p>
        Please enter your realm and character name to show Mythic+ scores and
        best runs
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label
          className="block text-black-900 text-sm font-bold mb-2"
          htmlFor="playerRealm"
        >
          Player Realm
        </label>
        <input
          type="text"
          id="playerRealm"
          value={playerRealm}
          onChange={(e) => setPlayeyRealm(e.target.value)}
          className="bg-gray-700 shadow appearance-none border border-red-500 rounded  py-2 px-2 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br></br>
        <label
          className="block text-black-900 text-sm font-bold mb-2"
          htmlFor="playerName"
        >
          Player Name
        </label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="bg-gray-700 shadow appearance-none border border-red-500 rounded  py-2 px-2 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br></br>
        <br></br>
        <button
          className="bg-red-700 hover:bg-red-900 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            if (playerName != "" && playerRealm != "") {
              handleSubmit(playerRealm, playerName);
            }
          }}
        >
          Submit
        </button>
      </form>

      <div>
        <br></br>
        {data?.name}-{data?.realm} {data?.race} {data?.active_spec_name}{" "}
        {data?.class}
      </div>

      <div className="flex justify-center items-center">
        <div className="max-w-fit bg-gray-800 m-2 box-border rounded-lg p-4 border-4 border-red-800 ">
          <div className="flex flex-row justify-center items-center">
            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800 ">
              <p>All</p>
              {data?.mythic_plus_scores_by_season[0].scores.all}
            </div>

            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
              <p>Dps</p>
              {data?.mythic_plus_scores_by_season[0].scores.dps}
            </div>

            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
              <p>healer</p>
              {data?.mythic_plus_scores_by_season[0].scores.healer}
            </div>

            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
              <p>tank</p>
              {data?.mythic_plus_scores_by_season[0].scores.tank}
            </div>

            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
              <p>spec_0</p>
              {data?.mythic_plus_scores_by_season[0].scores.spec_0}
            </div>

            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
              <p>spec_1</p>
              {data?.mythic_plus_scores_by_season[0].scores.spec_1}
            </div>

            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
              <p>scep_02</p>
              {data?.mythic_plus_scores_by_season[0].scores.spec_2}
            </div>

            <div className="bg-gray-700 m-2 box-border rounded-lg h-18 w-32 p-4 border-4 border-red-800">
              <p>scep_03</p>
              {data?.mythic_plus_scores_by_season[0].scores.spec_3}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center ">

        <table className="inline-grid justify-center ">

          <thead className="">
            <tr>
              <th className="bg-red-500 text-left ps-10">Dungeons</th>
              <th className="bg-blue-400 ps-28">Mythic level</th>
              <th className="bg-yellow-400 ps-52">affixes</th>
            </tr>
          </thead>

          <tbody className="">
              <div className="">
                {data?.mythic_plus_best_runs.map((item, id) => (
                  <tr className="p-4" key={id}>
                    <td className="bg-red-500 text-left">{item.dungeon} </td>

                    <td className="bg-blue-400 ps-28">{item.mythic_level} </td>

                    <td className="bg-green-400 pe-20">{item.num_keystone_upgrades} </td>

                    {item.affixes.map((affix, id) => (
                      <td className="bg-yellow-400 pe-20" key={id}>
                        {affix.name}{" "}
                      </td>
                    ))}
                  </tr>
                ))}
              </div>
          </tbody>

        </table>

      </div>



    </div>
  );
}

export default PlayerInfo;
