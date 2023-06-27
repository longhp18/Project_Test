import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
} from "recharts";

const MyBarChart = (props: any) => {
   return (
      <>
         <BarChart width={props.width} height={props.height} data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={props.dataKey} />
            <YAxis domain={props.domain} />
            <Tooltip />
            <Legend />
            <Bar dataKey="race_position" fill="#8884d8" name="Race Position" />
            <Bar dataKey="points" fill="#82ca9d" name="Points" />
         </BarChart>
      </>
   );
};

export default MyBarChart;
