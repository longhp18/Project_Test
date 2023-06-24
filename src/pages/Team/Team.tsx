import type { ColumnsType } from "antd/es/table";

import "./Team.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import TableList from "../../conponents/Table/TableList";
import { Spin } from "antd";

const Team = () => {
  const [teamData, setTeamData] = useState<any>();
  const [teamDataCurrent, setTeamDataCurrent] = useState<any>();
  const [yearFilter, setYearFilter] = useState<any>("");

  const { dataApi } = useSelector((state: RootState) => state.rootReducer);

  const fetchDriverStanding = async (yearFilter: any) => {
    const response = await fetch(
      `https://ergast.com/api/f1/${yearFilter}/constructorStandings.json`
    );
    const data = await response.json();
    // console.log(data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings);
    await setTeamData(
      data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings
    );
    await setTeamDataCurrent(
      data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings
    );
  };

  useEffect(() => {
    setYearFilter(dataApi);
    fetchDriverStanding(yearFilter);
  }, [dataApi, yearFilter]);

  const columns: ColumnsType<any> = [
    {
      title: "POS",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "TEAM",
      dataIndex: "team",
      key: "team",
    },

    {
      title: "PTS",
      dataIndex: "points",
      key: "points",
    },
  ];

  const dataTeam =
    teamData &&
    teamData.map((team: any) => ({
      position: team.position,
      team: team.Constructor.name,
      points: team.points,
    }));

  console.log(dataTeam);

  const tableContent = (
    <TableList
      title={`TEAMS LIST ${yearFilter}`}
      columns={columns}
      rowKey={yearFilter}
      data={dataTeam}
    />
  );

  const tableLoading = <Spin>{tableContent}</Spin>;

  return <>{teamData !== teamDataCurrent ? tableLoading : tableContent}</>;
};

export default Team;
