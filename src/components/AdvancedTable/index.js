import React, { Component } from "react";
import { Table, Pagination, Row, Col, Spin, Card, Button, notification, Popconfirm, Icon, Input } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import _ from "lodash";

import { Text } from "fe-components";
import { Wrapper } from "fe-components/Wrappers";
import NOTIFICATION from "fe-constants/notification";

import {
  fnGetData,
  fnShowTotal,
  fnQueryParams,
  fnSetTableColumns,
} from "./helper";

import { API_V1 } from "fe-utils/api";


class AdvancedTable extends Component {
  state = {
    data: null,
    selectedRowKeys: [],
    loading: true,
    statusCode: 200,
    pageNumber: "",
    resetLoading: false,
  };

  constructor(props) {
    super(props);
    this.handleFetchDebounce = _.debounce(this.fetch, 1000);
  }

  componentDidMount() {
    this.handleFilterChange({});
    window.onpopstate = () => {
      this.setState({ loading: true });
      const { location } = this.props;
      const urlParamsObject = queryString.parse(location.search);
      this.fetch(urlParamsObject);
    };
  }

  componentWillUnmount() {
    this.handleFetchDebounce.cancel();
  }

  handleFilterChange = (props, disableDebounce = false) => {
    this.setState({ loading: true });
    const { history, location } = this.props;
    const { search, pathname } = location;

    let urlParamsObject = queryString.parse(search);
    urlParamsObject = { ...urlParamsObject, ...props };
    const params = fnQueryParams(urlParamsObject);
    history.push({ pathname, search: params });

    if (disableDebounce) {
      this.fetch(queryString.parse(params));
    } else {
      this.handleFetchDebounce(queryString.parse(params));
    }
  }

  handleClearFilters = async () => {
    this.setState({ loading: true,resetLoading:true });
    const { history, location } = this.props;
    const { _sort_by, _sort_order } = queryString.parse(location.search);
    const search = fnQueryParams({ _sort_by, _sort_order, page: 1 });
    history.push({ pathname: location.pathname, search });
    await this.fetch(queryString.parse(search));
    this.setState({ resetLoading:false });
  }

   handleClearAll = async () => {
    this.setState({ loading: true, resetLoading:true });
    const { history, location } = this.props;
    history.push({ pathname: location.pathname, search: fnQueryParams({ page: 1 }) });
    await this.fetch({});
    this.setState({ resetLoading:false });
  }

  async fetch(params) {
    const data = await fnGetData(this.props.api, params);
    // LED pag wlng laman loading lng ng loading
    console.log(!data.meta,'!data.meta')
    if(data.total === 0 && data.data.length === 0 && (data.meta && data.meta.current_page > 1 || !data.meta)) {
      params = { ...params, page: "1" };
      this.handleFilterChange(params);
    } else {
      this.setState(data);
    }
  }

  handlePaginationChange = (page, pageSize) => {
    this.handleFilterChange({ page, items_per_page: pageSize }, true);
  }

  handleOnKeyDown = (e) => {
    const { last_page } = this.state.meta;
    const value = parseInt(e.target.value);
    if (e.key === "Enter" && value) {
      const page = value > last_page ? last_page : value;
      this.handleFilterChange({ page }, true);
    }
    if(e.key === "Enter")  this.setState({ pageNumber: "" });
  }

  handleGoToOnChange = (e) => {
    this.setState({ pageNumber: e.target.value });
  }

  handleTableChange = (pagination, filters, sorters) => {
    let _sort_order;
    if (sorters.order) {
      _sort_order = sorters.order === "ascend" ? "asc" : "desc";
    }
    this.handleFilterChange({ ...filters, _sort_by: sorters.field, _sort_order }, true);
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  view = (uuid, path) => {
    const { history, location } = this.props;
    const url = path ? path : location.pathname;
    history.replace({ pathname: `${url}/${uuid}`, state: {} });
  }

  update = (uuid, path) => {
    const { history, location } = this.props;
    const url = path ? path : `${location.pathname}/update`;
    history.replace({ pathname: `${url}/${uuid}`, state: {} });
  }

  deleteAll = async () => {
    const params = {[this.props.deleteKey]: this.state.selectedRowKeys};
    const { message, description, style } = NOTIFICATION.DELETED;
    try {
      await API_V1.delete(this.props.api, {params});
      notification.open({message, description, style});
      this.setState({ selectedRowKeys: [] });
      this.handleFilterChange({});
    } catch (error) {
      console.log("deleteAll error", error);
    }
  }

  render() {
    const {
      data,
      total,
      selectedRowKeys,
      loading,
      statusCode,
      resetLoading
    } = this.state;
    const {
      columns,
      keyValue,
      location,
      filterComponent: FilterComponent,
      noRowSelection,
      userProfile,
    } = this.props;

    const rowSelection = { 
      selectedRowKeys, 
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.name && userProfile 
          && (record.name === userProfile.name 
          || (record.role == "Super Administrator" && userProfile.role == "Administrator") ) ? true : false,
      }), 
    };
    const hasSelectedItem = selectedRowKeys.length === 0 ? false : true;

    
    const urlParamsObject = queryString.parse(location.search || "");
    const currentPage = urlParamsObject.page ? parseInt(urlParamsObject.page, 10) : 1;
    const pageSize = urlParamsObject.items_per_page ? parseInt(urlParamsObject.items_per_page, 10) : 10;

    const tableColumns = fnSetTableColumns({ columns, urlParamsObject });
    
    return (
      <Wrapper code={statusCode}>
        <Card style={{ margin: 24, minHeight: "100%" }}>
          {
            FilterComponent && <div style={{ marginBottom: 24 }}>
              <FilterComponent
                {...urlParamsObject}
                handleFilterChange  = { this.handleFilterChange }
                handleClearFilters  = { this.handleClearFilters }
                handleClearAll      = { this.handleClearAll }
                exportCSV           = {this.props.exportCSV}
              />
            </div>
          }

          <Spin spinning={loading} size="large">
            {
              !resetLoading && <Table
              className     = "c-custom-table"
              dataSource    = { data }
              columns       = { tableColumns }
              rowKey        = { (record) => record[keyValue] }
              rowSelection  = { noRowSelection ? null : rowSelection}
              pagination    = { false }
              onChange      = { this.handleTableChange }
              filterIcon    = { false }
              locale        = {{ emptyText: "No data available yet." }}
            />
            }
            <Row type="flex" justify="space-between" style={{ marginTop: 24 }}>
              <Col>
                {
                  !noRowSelection && 
                  hasSelectedItem
                    ? <Popconfirm
                      onConfirm={this.deleteAll}
                      okType="danger"
                      okText="Yes"
                      cancelText="No"
                      title={selectedRowKeys.length > 1
                        ? <div style={{width: 170}}>{`Delete ${selectedRowKeys.length} records?`}</div>
                        : <div style={{width: 170}}>{`Delete ${selectedRowKeys.length} record?`}</div>
                      }
                      icon={ <Icon type="close-circle"  style={{ color: 'red'}} />}
                    >
                      <Button>Delete All</Button>
                    </Popconfirm>
                  : !noRowSelection && <Button disabled>Delete All</Button>
                }
              </Col>
              <Col>
              {
              !resetLoading && 
                <div style={{ display: "flex", flexDirection: "row" }}>
               
                  <Pagination
                    showSizeChanger
                    pageSizeOptions   = { ["10", "25", "50", "100"] }
                    current           = { currentPage }
                    pageSize          = { pageSize }
                    total             = { this.state.total }
                    showTotal         = { (totalPagination, range) => fnShowTotal(total, totalPagination, range) }
                    onChange          = { this.handlePaginationChange }
                    onShowSizeChange  = { this.handlePaginationChange }
                  />
               
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Text color="#6D6E71" size={15}>Go to</Text>
                    <Input
                      onChange      = {this.handleGoToOnChange}
                      value         = {this.state.pageNumber}
                      onKeyDown     = {this.handleOnKeyDown}
                      style         = {{ width: 55, marginLeft: 10 }}  />
                  </div>
                  
                </div>
                }
              </Col>
            </Row>
          </Spin>
        </Card>
      </Wrapper>
    );
  }
}

export default withRouter(AdvancedTable);
