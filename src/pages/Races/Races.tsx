import type { ColumnsType } from "antd/es/table";

import "./Races.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import { RootState } from "../../redux/store";
import TableList from "../../conponents/Table/TableList";

const Race = () => {
  const [raceData, setRaceData] = useState<any>();
  const [yearFilter, setYearFilter] = useState<any>("");

  const { dataApi } = useSelector((state: RootState) => state.rootReducer);

  const fetchYearResult = async (yearFilter: any) => {
    const response = await fetch(
      `https://ergast.com/api/f1/${yearFilter}/results/1.json`
    );
    const data = await response.json();
    await setRaceData(data?.MRData?.RaceTable?.Races);
  };

  useEffect(() => {
    setYearFilter(dataApi);
    fetchYearResult(yearFilter);
  }, [dataApi, yearFilter]);

  const columns: ColumnsType<any> = [
    {
      title: "GRAND PRIX",
      dataIndex: "grand_prix",
      key: "grand_prix",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "WINNER",
      dataIndex: "winner",
      key: "winner",
    },
    {
      title: "CAR",
      dataIndex: "car",
      key: "car",
    },
    {
      title: "LAP",
      dataIndex: "lap",
      key: "lap",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
    },
  ];

  const data =
    raceData &&
    raceData.map((race: any) => ({
      key: race?.Circuit?.Location?.country,
      grand_prix: race?.Circuit?.Location?.country,
      date: dayjs(race.date).format("DD MMM YYYY"),
      winner:
        race?.Results[0]?.Driver?.givenName +
        " " +
        race?.Results[0]?.Driver?.familyName,
      car: race?.Results[0]?.Constructor?.name,
      lap: race?.Results[0]?.laps,
      time: race?.Results[0]?.Time?.time,
      year: race?.season,
    }));

  return (
    <>
      <TableList
        title={`RACES LIST ${yearFilter}`}
        columns={columns}
        data={data}
        rowKey={yearFilter}
      />
    </>
  );
};

export default Race;
