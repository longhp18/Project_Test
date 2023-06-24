import type { ColumnsType } from "antd/es/table";

import "./Dhl.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import TableList from "../../conponents/Table/TableList";

const Dhl = () => {
  const [dhlData, setDhlData] = useState<any>();

  const [yearFilter, setYearFilter] = useState<any>("");

  const { dataApi } = useSelector((state: RootState) => state.rootReducer);

  useEffect(() => {
    setYearFilter(dataApi);
    fetchDriverStanding(yearFilter);
  }, [dataApi, yearFilter]);

  const fetchDriverStanding = async (yearFilter: any) => {
    const response = await fetch(
      `https://ergast.com/api/f1/${yearFilter}/fastest/1/results.json`
    );
    const data = await response.json();
    console.log(data);
    await setDhlData(data?.MRData?.RaceTable?.Races);
  };

  const columns: ColumnsType<any> = [
    {
      title: "GRAND PRIX",
      dataIndex: "grand_prix",
      key: "grand_prix",
    },
    {
      title: "DRIVER",
      dataIndex: "driver",
      key: "driver",
    },

    {
      title: "CAR",
      dataIndex: "car",
      key: "car",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
    },
  ];

  const dataDhl =
    dhlData &&
    dhlData.map((dhl: any) => ({
      grand_prix: dhl?.raceName.replace("Grand Prix", ""),
      driver:
        dhl?.Results[0]?.Driver?.givenName +
        " " +
        dhl?.Results[0]?.Driver?.familyName,
      car: dhl?.Results[0]?.Constructor?.name,
      time: dhl?.Results[0]?.FastestLap?.Time?.time,
    }));

  const TableContent = (
    <TableList
      title={`DHL FASTEST LAP AWARD LIST ${yearFilter}`}
      columns={columns}
      rowKey={yearFilter}
      data={dataDhl}
    />
  );

  return <>{TableContent}</>;
};

export default Dhl;
