import type { ColumnsType } from "antd/es/table";

import "./Driver.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SlackOutlined } from "@ant-design/icons";
import { RootState } from "../../redux/store";

import TableList from "../../conponents/Table/TableList";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Driver = () => {
   const [driverStandingData, setDriverStandingData] = useState<any>();
   const [yearFilter, setYearFilter] = useState<any>("");
   const [loading, setLoading] = useState<any>(false);

   const { dataApi } = useSelector((state: RootState) => state.rootReducer);

   const navigate = useNavigate();
   const currentYear = dayjs().format("YYYY");
   const fetchDriverStanding = async (yearFilter: any) => {
      setLoading(true);
      const response = await fetch(
         `https://ergast.com/api/f1/${yearFilter}/driverStandings.json`
      );
      const data = await response.json();

      if (data) {
         setTimeout(async () => {
            await setDriverStandingData(
               data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings
            );
            await setLoading(false);
         }, 300);
      }
   };

   useEffect(() => {
      setYearFilter(dataApi ? dataApi : currentYear);
      fetchDriverStanding(yearFilter ? yearFilter : currentYear);
   }, [dataApi, yearFilter, dayjs, currentYear]);

   const columns: ColumnsType<any> = [
      {
         title: "POS",
         dataIndex: "position",
         key: "position",
         sorter: (a, b) => a.position - b.position,
      },
      {
         title: "DRIVER",
         dataIndex: "driver",
         key: "driver",
         render: (text, record, index) => (
            <a
               onClick={() =>
                  navigate(`/driver/detail/${record.driverId}/${yearFilter}`)
               }
            >
               {text}
            </a>
         ),
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
         driverId: driverStanding?.Driver?.driverId,
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
            loading={loading}
         />
      </>
   );
};

export default Driver;
