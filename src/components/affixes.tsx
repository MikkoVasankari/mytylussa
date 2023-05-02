import { useEffect, useState } from "react";

function Affixes() {
  const [data, setData] = useState<dataItem | undefined>(undefined);

  interface dataItem {
    region: string;
    title: string;
    leaderboard_url: string;
    affix_details: Array<{
      description: string;
      icon: string;
      id: number;
      name: string;
      wowhead_url: string;
    }>;
  }

  async function fetchJSONData() {
    const response = await fetch(
      "https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=en"
    );
    const jsonData = await response.json();
    setData(jsonData);
  }

  function fetchIcon(icon: string) {
    const response =
      "https://wow.zamimg.com/images/wow/icons/large/" + icon + ".jpg";
    return (
      <div className="flex justify-center">
        <img src={response} alt="Affix icon" />
      </div>
    );
  }

  useEffect(() => {
    fetchJSONData();
  }, []);

  return (
    <div >
      <p> {data?.title} </p>
      <ul>
        {data?.affix_details.map((item) => (
          <li key={item.id}>
            {item.name} <br></br>
            {item.description}
            {fetchIcon(item.icon)}
          </li>
        ))}
      </ul>

      <a href={data?.leaderboard_url}>Mythic+ Leaderboard</a>
    </div>
  );
}

export default Affixes;
