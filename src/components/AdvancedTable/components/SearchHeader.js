import React, { useState, useEffect } from "react";
import { Row, Col, Input, Icon, Button, notification } from "antd";
import DownloadFile from "js-file-download";
import { FILE_DOWNLOAD } from "fe-utils/api";
import NOTIFICATION from "fe-constants/notification";
import { getPermission } from 'fe-context/provider/helper'

export default function SearchHeader(props) {


  const [data,setData] = useState("");

  useEffect(()=> {
    const fetchData = async () => {
      const { data: permission } = await getPermission();
      setData(permission);
    };
    fetchData();
  },[])

  const filterInput = React.createRef();

  const onChange = (e) => {
    props.handleFilterChange({ _search: e.target.value, page: 1 });
  };

  const clearFilters = () => {
    filterInput.current.state.value = "";
    props.handleClearFilters();
  };

  const handleClearAll = () => {
    filterInput.current.state.value = "";
    props.handleClearAll();
  };

  const handleExportCSV = async() => {
    const { message, description, style } = NOTIFICATION.EXPORTED;
    try {
      let response = await FILE_DOWNLOAD(props.exportCSV);
      const filename = 
      response.request.getResponseHeader('Content-Disposition')
      ? response.request.getResponseHeader('Content-Disposition').split("filename=")
      : ["Reports.csv", "Reports.csv"]
      
      DownloadFile(response.csv, filename[1]);
      notification.open({message, description, style});
    } catch (error) {
      console.log("handleExportCSV error", error)
    }
  }

  return (
    <Row type="flex" justify="space-between">
      <Col>
        <Input
          ref         = { filterInput }
          defaultValue={ props._search }
          onChange    = { onChange }
          placeholder = "Search"
          prefix      = { <Icon type="search"
          style       = {{
            color: "rgba(0,0,0,.25)",
            fontSize: 16
          }} />}
          style = {{ width: 300 }}
        />
      </Col>
      <Col>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={handleClearAll}>Clear filters and sorters</Button>
        <Button 
          disabled={data && data[0].role_name == "Command Center" ? true : false}
          onClick={data && data[0].role_name == "Command Center" ? ()=> null : handleExportCSV} >Export CSV</Button>
      </Col>
    </Row>
  );
}
