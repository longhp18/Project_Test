import type { ColumnsType } from "antd/es/table";

import "./Driver.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import TableList from "../../conponents/Table/TableList";
import dayjs from "dayjs";

const Driver = () => {
  const [driverStandingData, setDriverStandingData] = useState<any>();
  const [yearFilter, setYearFilter] = useState<any>("");

  const { dataApi } = useSelector((state: RootState) => state.rootReducer);

  const fetchDriverStanding = async (yearFilter: any) => {
    const response = await fetch(
      `https://ergast.com/api/f1/${yearFilter}/driverStandings.json`
    );
    const data = await response.json();

    await setDriverStandingData(
      data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings
    );
  };

  useEffect(() => {
    setYearFilter(dataApi);
    fetchDriverStanding(yearFilter);
  }, [dataApi, yearFilter, dayjs]);

  const columns: ColumnsType<any> = [
    {
      title: "POS",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "DRIVER",
      dataIndex: "driver",
      key: "driver",
    },
    {
      title: "NATIONALITY",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "CAR",
      dataIndex: "car",
      key: "car",
    },
    {
      title: "PTS",
      dataIndex: "points",
      key: "points",
      sorter: (a, b) => a.points - b.points,
    },
  ];

  const dataDriverStanding =
    driverStandingData &&
    driverStandingData.map((driverStanding: any) => ({
      position: driverStanding?.position,
      driver:
        driverStanding?.Driver?.givenName +
        " " +
        driverStanding?.Driver?.familyName,
      nationality: driverStanding?.Constructors[0]?.nationality,
      car: driverStanding?.Constructors[0]?.name,
      points: driverStanding?.points,
    }));

  return (
    <>
      <TableList
        title={`DRIVERS LIST ${yearFilter}`}
        columns={columns}
        data={dataDriverStanding}
        rowKey={yearFilter}
      />
    </>
  );
};

export default Driver;
