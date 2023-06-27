import type { ColumnsType } from "antd/es/table";

import "./Team.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import TableList from "../../conponents/Table/TableList";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
} from "recharts";
import dayjs from "dayjs";
import { Row } from "antd";

const Team = () => {
   const [teamData, setTeamData] = useState<any>();
   const [loading, setLoading] = useState<any>(false);
   const [yearFilter, setYearFilter] = useState<any>("");
   const currentYear = dayjs().format("YYYY");
   const { dataApi } = useSelector((state: RootState) => state.rootReducer);

   const fetchDriverStanding = async (yearFilter: any) => {
      setLoading(true);
      const response = await fetch(
         `https://ergast.com/api/f1/${yearFilter}/constructorStandings.json`
      );
      const data = await response.json();

      if (data) {
         setTimeout(async () => {
            await setTeamData(
               data?.MRData?.StandingsTable?.StandingsLists[0]
                  ?.ConstructorStandings
            );
            await setLoading(false);
         }, 300);
      }
   };

   useEffect(() => {
      setYearFilter(dataApi ? dataApi : currentYear);
      fetchDriverStanding(yearFilter ? yearFilter : currentYear);
   }, [dataApi, yearFilter, currentYear]);

   const columns: ColumnsType<any> = [
      {
         title: "POS",
         dataIndex: "position",
         key: "position",
         sorter: (a, b) => a.position - b.position,
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
         sorter: (a, b) => a.points - b.points,
      },
   ];

   const dataTeam =
      teamData &&
      teamData.map((team: any) => ({
         position: team.position,
         team: team.Constructor.name,
         points: team.points,
      }));

   const maxPoints =
      dataTeam &&
      Math.max(...dataTeam.map((item: any) => parseInt(item.points)));

   const tableContent = (
      <TableList
         title={`TEAMS LIST ${yearFilter}`}
         columns={columns}
         rowKey={yearFilter}
         data={dataTeam}
         loading={loading}
      />
   );

   return (
      <>
         {tableContent}
         <Row className="row-chart">
            <BarChart width={1000} height={600} data={dataTeam}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey={`team`} />
               <YAxis domain={[0, maxPoints]} />
               <Tooltip />
               <Legend />
               <Bar
                  dataKey="points"
                  fill="#82ca9d"
                  name="Points"
                  height={300}
               />
            </BarChart>
         </Row>
      </>
   );
};

export default Team;
