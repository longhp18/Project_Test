import type { ColumnType, ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import "./Races.css";
import { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";

import dayjs from "dayjs";
import { RootState } from "../../redux/store";
import TableList from "../../conponents/Table/TableList";
import { Button, Input, InputRef, Space } from "antd";
import { FilterConfirmProps } from "antd/es/table/interface";

const Race = () => {
  const [raceData, setRaceData] = useState<any>();
  const [yearFilter, setYearFilter] = useState<any>("");

  const { dataApi } = useSelector((state: RootState) => state.rootReducer);

  const fetchYearResult = async (yearFilter: any) => {
    const response = await fetch(
      `https://ergast.com/api/f1/${yearFilter}/results/1.json`
    );
    const data = await response.json();
    await setRaceData(data?.MRData?.RaceTable?.Races);
  };

  useEffect(() => {
    setYearFilter(dataApi);
    fetchYearResult(yearFilter);
  }, [dataApi, yearFilter]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<any> = [
    {
      title: "GRAND PRIX",
      dataIndex: "grand_prix",
      key: "grand_prix",
      ...getColumnSearchProps("grand_prix"),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "WINNER",
      dataIndex: "winner",
      key: "winner",
    },
    {
      title: "CAR",
      dataIndex: "car",
      key: "car",
    },
    {
      title: "LAP",
      dataIndex: "lap",
      key: "lap",
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
    },
  ];

  const data =
    raceData &&
    raceData.map((race: any) => ({
      key: race?.Circuit?.Location?.country,
      grand_prix: race?.Circuit?.Location?.country,
      date: dayjs(race.date).format("DD MMM YYYY"),
      winner:
        race?.Results[0]?.Driver?.givenName +
        " " +
        race?.Results[0]?.Driver?.familyName,
      car: race?.Results[0]?.Constructor?.name,
      lap: race?.Results[0]?.laps,
      time: race?.Results[0]?.Time?.time,
      year: race?.season,
    }));

  return (
    <>
      <TableList
        title={`RACES LIST ${yearFilter}`}
        columns={columns}
        data={data}
        rowKey={yearFilter}
      />
    </>
  );
};

export default Race;
