// LIBRARIES
import React, { Component } from "react";
import { Table } from "antd";
// COMPONENTS

// HELPERS
import { fnGetData } from "../helper";
import TableHeader from "./TableHeader";

export default class Dashboard extends Component {

  state = {
    data: [],
    filteredInfo: null,
    sortedInfo: null,
    isOpen: true,
    fetching: false
  }


  handleFetchData = async (query={}) => {
    const { data } = await fnGetData(query);
    this.setState({ data, fetching: false });
  }

  handleChange = (pagination, filters, sorter) => {
    let _sort_order;
    let _sort_by;
    let _route_id;
    if(this.props.route_id) _route_id = this.props.route_id;
    /*
    if (sorter.order) {
      _sort_order = sorter.order === "ascend" ? "asc" : "desc";
      _sort_by = sorter.field;
    }
    */

    if (sorter.order || this.state.sortedInfo) {
      _sort_order = sorter.order || this.state.sortedInfo.order === "ascend" ? "asc" : "desc";
      _sort_by = sorter.field;
      if(this.state.sortedInfo && this.state.sortedInfo.order && this.state.sortedInfo.field) {
        if(filters && filters.status && filters.status.length > 0) {
          _sort_order = sorter.order === "ascend" ? "asc" : sorter.order ? "desc": "asc";
        } else {
          _sort_order = (this.state.sortedInfo.order === "ascend" && _sort_by == this.state.sortedInfo.field) ? "desc" : "asc";
        }
        _sort_by = _sort_by == this.state.sortedInfo.field ? this.state.sortedInfo.field : _sort_by ? _sort_by : sorter.field ? sorter.field : this.state.sortedInfo.field;
      }
    }

    let sortedInfoChange = this.state.sortedInfo;

    if(sortedInfoChange) {
      if(Object.keys(sorter).length === 0 && sorter.constructor === Object) {
        sortedInfoChange.order === "descend" ? sortedInfoChange.order = "ascend" : sortedInfoChange.order = "descend";
        sortedInfoChange.field = this.state.sortedInfo.field;
      }
    }
    
    this.props.handleFetchData({ _sort_order, _sort_by, _route_id, ...filters },this.props.route_id);
    this.setState({
      filteredInfo: filters,
      //sortedInfo: sorter,
      sortedInfo:  Object.keys(sorter).length === 0 && sorter.constructor === Object ? sortedInfoChange : sorter,
      filters
    });
  };

  handleToggleTable = () => {
    this.setState( prevState => ({ isOpen: !prevState.isOpen}));
    //this.handleFetchData();
  }

  fnFilterSorter (props) {
    const { col } = props;
  
    let filteredValue;
    let sortDirections = null;
    let sortOrder = null;
    let urlParamsObjects = {}

    if (this.state.sortedInfo) {
      if(this.state.sortedInfo && this.state.sortedInfo.order && this.state.sortedInfo.field) {
          urlParamsObjects._sort_order = this.state.sortedInfo.order === "ascend" ? "asc" : "desc";
          urlParamsObjects._sort_by = this.state.sortedInfo.field;
      }
    }

    if (col && col.sorter && urlParamsObjects._sort_by === col.dataIndex) {
      if (Array.isArray(urlParamsObjects[col.dataIndex])) {
        filteredValue = urlParamsObjects[col.dataIndex];
      } else if (urlParamsObjects[col.dataIndex]) {
        filteredValue = [urlParamsObjects[col.dataIndex]];
      }
     
      switch (urlParamsObjects._sort_order) {
        case "asc":
          sortDirections = ["ascend", "descend"];
          sortOrder = "ascend";
          break;
        case "desc":
          sortDirections = ["descend", "ascend"];
          sortOrder = "descend";
          break;
        default:
          sortDirections = null;
          sortOrder = null;
          break;
      }
    }
    return {
      filteredValue,
      sortOrder,
      sortDirections,
    }
  }

  render() {
    const { data, isOpen, fetching } = this.state;
    let { sortedInfo } = this.state;
    const { title, route_id } = this.props;

    sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: 'Code',
        dataIndex: '_code',
        key: '_code',
        // sorter: true,
        sorter: this.props.isManual ? false : true,
        width: "23%",
        sortOrder: sortedInfo.columnKey === '_code' && sortedInfo.order,
        render:(text, {status}) => (
          <div style={{opacity: status.toLowerCase() == "offline" ? 0.4: 1 }}>{text}</div>
        ),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
        render:(text, {status}) => (
          <div style={{opacity: status.toLowerCase() == "offline" ? 0.4: 1 }}>{text}</div>
        ),
      },
      {
        title: 'Actual Time',
        dataIndex: 'actual_time',
        key: 'actual_time',
        // sorter: true,
        sorter:  this.props.isManual ? false : true,
        width: "15%",
        sortOrder: sortedInfo.columnKey === 'actual_time' && sortedInfo.order,
        render:(text, {status}) => (
          <div style={{opacity: status.toLowerCase() == "offline" ? 0.4: 1 }}>{text}</div>
        ),
      },
      {
        title: 'Next Stop',
        dataIndex: 'next_stop',
        key: 'next_stop',
        // sorter: true,
        sorter: this.props.isManual ? false : true,
        width: "23%",
        sortOrder: sortedInfo.columnKey === 'next_stop' && sortedInfo.order,
        render:(text, {status}) => (
          <div style={{opacity: status.toLowerCase() == "offline" ? 0.4: 1 }}>{text}</div>
        ),
      },
      {
        title: 'ETA',
        dataIndex: 'eta',
        key: 'eta',
        // sorter: true,
        sorter:  this.props.isManual ? false : true,
        sortOrder: sortedInfo.columnKey === 'eta' && sortedInfo.order,
        render:(text, {status}) => (
          <div style={{opacity: status.toLowerCase() == "offline" ? 0.4: 1 }}>{text}</div>
        ),
      },
      {
        title: 'State',
        dataIndex: 'status',
        key: 'status',
        render:(text, {status}) => (
          <div style={{color: 'rgb(24, 144, 255)', opacity: status.toLowerCase() == "offline" ? 0.4: 1 }}>{text}</div>
        ),
        width: '10%',
        // filters: [
        //   { text: 'Idle', value: 'Idle' },
        //   { text: 'Moving', value: 'Moving' },
        //   { text: 'Offline', value: 'Offline' }
        // ],
        filters:  this.props.isManual ? [] : [
          { text: 'Idle', value: 'Idle' },
          { text: 'Moving', value: 'Moving' },
          { text: 'Offline', value: 'Offline' }
        ],
        // sorter: true,
        sorter:  this.props.isManual ? false : true,
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      },
    ];

    columns.map(col => {
      return {
        ...col,
        ...this.fnFilterSorter({ col })
      };
    });
    
    return(
      <div style={{ marginBottom: 16 }}>
        <TableHeader
          title             = {title}
          route_id          = {route_id}
          isOpen            = {isOpen}
          activities        = {this.props.activities}
          handleToggleTable = {this.handleToggleTable}
        />
        {
          <Table
            loading     = {fetching || this.props.isLoading}
            pagination  = {false}
            dataSource  = {this.props.activities}
            columns     = {columns}
            onChange    = {this.handleChange}
            locale        = {{ emptyText: "No data available yet." }}
            />
        }
      </div>
    )
  }
}