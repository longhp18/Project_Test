import { Space, Spin, Table } from "antd";
import { SlackOutlined } from "@ant-design/icons";

import "./TableList.css";

const TableList = (props: any) => {
   return (
      <>
         <div className="table-result">
            <Space className="table-result-title">
        
               {props.loading ? (
                  <Spin
                     indicator={
                        <SlackOutlined
                           spin
                           style={{ fontSize: 20, color: "white" }}
                        />
                     }
                  />
               ) : (
                  props.title
               )}
            </Space>
            <Table
               columns={props.columns}
               dataSource={props.data}
               rowKey={props.rowKey}
               loading={{
                  spinning: props.loading,
                  indicator: <SlackOutlined spin style={{ fontSize: 24 }} />,
               }}
            />
         </div>
      </>
   );
};

export default TableList;
