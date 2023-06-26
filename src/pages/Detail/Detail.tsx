import { useParams } from "react-router-dom";
import "./Detail.css";
import { useEffect, useState } from "react";
import TableList from "../../conponents/Table/TableList";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const Detail = () => {
   const params = useParams();
   const driverId = params.id;
   const yearFilter = params.yearFilter;

   const [resultDriverData, setResultDriverData] = useState<any>();

   const fetchDriverStanding = async (yearFilter: any, driverId: any) => {
      const response = await fetch(
         `https://ergast.com/api/f1/${yearFilter}/drivers/${driverId}/results.json`
      );
      const data = await response.json();
      setResultDriverData(data?.MRData?.RaceTable?.Races);
      console.log(data);
   };

   useEffect(() => {
      fetchDriverStanding(yearFilter, driverId);
   }, [driverId, yearFilter]);

   const data =
      resultDriverData &&
      resultDriverData.map((item: any) => ({
         driver:
            item?.Results[0]?.Driver?.givenName +
            " " +
            item?.Results[0]?.Driver?.familyName,
         grand_prix: item.raceName.replace("Grand Prix", ""),
         date: dayjs(item.date).format("DD MMM YYYY"),
         car: item?.Results[0]?.Constructor?.name,
         race_position: item?.Results[0]?.position,
         points: item?.Results[0]?.points,
      }));

   console.log(data);

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
         title: "CAR",
         dataIndex: "car",
         key: "car",
      },
      {
         title: "RACE POSITION",
         dataIndex: "race_position",
         key: "race_position",
      },
      {
         title: "PTS",
         dataIndex: "points",
         key: "points",
      },
   ];

   return (
      <>
         <TableList
            columns={columns}
            data={data}
            title={`${yearFilter && yearFilter}: ${data && data[0]?.driver}`}
         />
      </>
   );
};

export default Detail;
