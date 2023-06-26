import "./Filter.css";
import { useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Col, Row, Form, DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import type { DatePickerProps } from "antd";
import { getDataApi } from "../../redux/filterSlice";
import { Await, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const Filter: React.FC = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const location = useLocation();
   const pathName = location.pathname;
   console.log(location);

   const dispatch = useDispatch<AppDispatch>();

   const handleYearFilter: DatePickerProps["onChange"] = async (
      date,
      dateString
   ) => {
      await dispatch(getDataApi(dateString));
      const handleNavigate = async () => {
         const currentPath = await pathName;
         const newYear = await dateString;
         const newPath = await currentPath.replace(/\/\d+$/, `/${newYear}`);
         await navigate(newPath);
      };
      await handleNavigate();
   };

   const { dataApi } = useSelector((state: RootState) => state.rootReducer);

   const routeHome = async () => {
      await dispatch(getDataApi(""));
      await form.setFieldValue("yearFilter", "");
      await navigate("");
   };
   const routeToDriver = async () => {
      await dispatch(getDataApi(""));
      await form.setFieldValue("yearFilter", "");
      await navigate("/driver");
   };
   const routeToRace = async () => {
      await dispatch(getDataApi(""));
      await form.setFieldValue("yearFilter", "");
      await navigate("/race");
   };
   const routeToTeam = async () => {
      await dispatch(getDataApi(""));
      await form.setFieldValue("yearFilter", "");
      await navigate("/team");
   };
   const routeToDhl = async () => {
      await dispatch(getDataApi(""));
      await form.setFieldValue("yearFilter", "");
      await navigate("/dhl");
   };

   return (
      <div className="filter">
         <Form form={form}>
            <Row gutter={[16, 16]}>
               <Button onClick={routeHome}>
                  <HomeOutlined />
               </Button>
               <Col span={8}>
                  <Form.Item name="yearFilter">
                     <DatePicker
                        picker="year"
                        placeholder="Search by year"
                        style={{ width: "100%" }}
                        onChange={handleYearFilter}
                     />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Button onClick={routeToDriver} className="mr-16">
                     Drivers
                  </Button>
                  <Button onClick={routeToRace} className="mr-16">
                     Races
                  </Button>
                  <Button onClick={routeToTeam} className="mr-16">
                     Teams
                  </Button>
                  <Button onClick={routeToDhl}>DHL FASTEST LAP AWARD</Button>
               </Col>
            </Row>
         </Form>
      </div>
   );
};
export default Filter;
