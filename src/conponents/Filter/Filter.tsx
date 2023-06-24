import Search from "antd/es/input/Search";
import "./Filter.css";

import { Col, Row, Form, DatePicker, Button } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import type { DatePickerProps } from "antd";
import { getDataApi } from "../../redux/filterSlice";
import { useNavigate } from "react-router-dom";

const Filter: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleYearFilter: DatePickerProps["onChange"] = (date, dateString) => {
    dispatch(getDataApi(dateString));
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
          <Col span={6}>
            <Search placeholder="Search anything" />
          </Col>
          <Col span={6}>
            <Form.Item name="yearFilter">
              <DatePicker
                picker="year"
                placeholder="Search driver by year"
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
