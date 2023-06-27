import "./Filter.css";
import { HomeOutlined } from "@ant-design/icons";
import { Col, Row, Form, DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import type { DatePickerProps } from "antd";
import { getDataApi } from "../../redux/filterSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Filter: React.FC = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const location = useLocation();
   const pathName = location.pathname;
   const pathNameSplit = pathName.split("/");
   const pathDetail = `/${pathNameSplit[1]}/${pathNameSplit[2]}`;

   const dispatch = useDispatch<AppDispatch>();

   const handleYearFilter: DatePickerProps["onChange"] = async (
      _date,
      dateString: string
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

   useEffect(() => {
      routeToRace();
   }, []);

   const routeHome = async () => {
      await dispatch(getDataApi(""));
      await form.setFieldValue("yearFilter", "");
      await navigate("/race");
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

   const getPopupContainer = (triggerNode: any) => {
      return triggerNode.parentNode;
   };

   return (
      <div className="filter">
         <Form form={form}>
            <Row gutter={[16, 16]}>
               <Col>
                  <Button
                     type={`${
                        pathName === "/race" || pathName === "/"
                           ? "primary"
                           : "link"
                     }`}
                     onClick={routeHome}
                     className="btn btn-filter mr-16"
                  >
                     <HomeOutlined />
                  </Button>
               </Col>
               <Col span={5}>
                  <Form.Item className="yearFilter" name="yearFilter">
                     <DatePicker
                        getPopupContainer={getPopupContainer}
                        picker="year"
                        placeholder="Search by year"
                        style={{ width: "100%" }}
                        onChange={handleYearFilter}
                     />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Button
                     type={`${
                        pathName === "/driver" ||
                        pathDetail === "/driver/detail"
                           ? "primary"
                           : "link"
                     }`}
                     onClick={routeToDriver}
                     className="btn btn-filter mr-16"
                  >
                     Drivers
                  </Button>
                  <Button
                     type={`${pathName === "/race" ? "primary" : "link"}`}
                     onClick={routeToRace}
                     className="btn btn-filter mr-16"
                  >
                     Races
                  </Button>
                  <Button
                     type={`${pathName === "/team" ? "primary" : "link"}`}
                     onClick={routeToTeam}
                     className="btn btn-filter mr-16"
                  >
                     Teams
                  </Button>
                  <Button
                     type={`${pathName === "/dhl" ? "primary" : "link"}`}
                     onClick={routeToDhl}
                     className=""
                  >
                     DHL FASTEST LAP AWARD
                  </Button>
               </Col>
            </Row>
         </Form>
      </div>
   );
};
export default Filter;
