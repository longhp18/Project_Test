import type { ColumnsType } from "antd/es/table";

import "./Dhl.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import TableList from "../../conponents/Table/TableList";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Dhl = () => {
   const navigate = useNavigate();
   const [dhlData, setDhlData] = useState<any>();
   const [loading, setLoading] = useState<any>(false);
   const [yearFilter, setYearFilter] = useState<any>("");
   const currentYear = dayjs().format("YYYY");
   const { dataApi } = useSelector((state: RootState) => state.rootReducer);

   useEffect(() => {
      setYearFilter(dataApi ? dataApi : currentYear);
      fetchDriverStanding(yearFilter ? yearFilter : currentYear);
   }, [dataApi, yearFilter, currentYear]);

   const fetchDriverStanding = async (yearFilter: any) => {
      setLoading(true);
      const response = await fetch(
         `https://ergast.com/api/f1/${yearFilter}/fastest/1/results.json`
      );
      const data = await response.json();
      if (data) {
         setTimeout(async () => {
            await setDhlData(data?.MRData?.RaceTable?.Races);
            await setLoading(false);
         }, 300);
      }
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
         driverId: dhl?.Results[0]?.Driver?.driverId,
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
         loading={loading}
      />
   );

   return <>{TableContent}</>;
};

export default Dhl;
