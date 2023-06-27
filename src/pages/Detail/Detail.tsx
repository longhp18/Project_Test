import { useParams } from "react-router-dom";
import "./Detail.css";
import { useEffect, useState } from "react";
import TableList from "../../conponents/Table/TableList";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   LabelList,
} from "recharts";
import { Row } from "antd";

const Detail = () => {
   const params = useParams();
   const driverId = params.id;
   const yearFilter = params.yearFilter;

   const [loading, setLoading] = useState<any>(false);

   const [resultDriverData, setResultDriverData] = useState<any>();

   const fetchDriverStanding = async (yearFilter: any, driverId: any) => {
      await setLoading(true);
      const response = await fetch(
         `https://ergast.com/api/f1/${yearFilter}/drivers/${driverId}/results.json`
      );
      const data = await response.json();
      if (data) {
         setTimeout(async () => {
            await setResultDriverData(data?.MRData?.RaceTable?.Races);
            await setLoading(false);
         }, 300);
      }
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
         sorter: (a, b) => a.race_position - b.race_position,
      },
      {
         title: "PTS",
         dataIndex: "points",
         key: "points",
         sorter: (a, b) => a.points - b.points,
      },
   ];

   const maxPoints =
      data && Math.max(...data.map((item: any) => parseInt(item.points)));

   return (
      <>
         <TableList
            columns={columns}
            data={data}
            title={`${yearFilter && yearFilter}: ${data && data[0]?.driver}`}
            loading={loading}
         />

         <Row className="row-chart">
            <BarChart width={1000} height={600} data={data}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="grand_prix" />
               <YAxis domain={[0, maxPoints]} />
               <Tooltip />
               <Legend />
               <Bar dataKey="points" fill="#82ca9d" name="Points" />
            </BarChart>
         </Row>
      </>
   );
};

export default Detail;
