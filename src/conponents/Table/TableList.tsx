import { Table } from "antd";

import "./TableList.css";

const TableList = (props: any) => {
   const TableResultContent = (
      <div className="table-result">
         <div className="table-result-title">{props.title}</div>

         <Table
            columns={props.columns}
            dataSource={props.data}
            rowKey={props.rowKey}
            loading={props.loading}
         />
      </div>
   );

   return <>{TableResultContent}</>;
};

export default TableList;
