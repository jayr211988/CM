import React, { Fragment } from "react";
import queryString from "query-string";
import { Table, Pagination, Popconfirm, Form, Spin, Card } from "antd";
import _ from "lodash";

// COMPONENTS
import EditableCell from "./EditableCell";
import { EditableContext } from "./context";
import { Wrapper } from "fe-components/Wrappers";

// HELPERS
import {
  fnShowTotal,
  fnQueryParams,
  fnFilterSorter,
  fnGetData
} from "./helpers";

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingKey: '',
      loading: true,
      statusCode: 200,
      resetLoading: false,
    };
    this.handleFetchDebounce = _.debounce(this.fetch, 1000);
  }

  componentDidMount() {
    this.handleFilterChange({});
  }

  componentWillUnmount() {
    this.handleFetchDebounce.cancel();
  }

  async fetch(params) {
    const data = await fnGetData(this.props.list, params);
    if(data.total === 0 && data.data.length === 0 && (data.meta && data.meta.current_page > 1 || !data.meta)) {
      params = { ...params, page: "1" };
      this.handleFilterChange(params);
    } else {
      this.setState(data);
    }
  }

  isEditing = record => record[this.props.keyValue] === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const params = {
        [this.props.keyValue]: key,
        ...row
      }
      const newData = this.state.data;
      const index = newData.findIndex(item => key === item[this.props.keyValue]);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        this.setState({ editingKey: '', loading: true });
        this.props.handleUpdateRow({ ...item, ...params });
      }
    });
  }

  async edit(key) {
    await this.cancel()
    this.setState({ editingKey: key });
  }

  handleTableChange = (pagination, filters, sorters) => {
    let _sort_order;
    if (sorters.order) {
      _sort_order = sorters.order === "ascend" ? "asc" : "desc";
    }
    this.handleFilterChange({ ...filters, _sort_by: sorters.field, _sort_order });
  };

  handlePaginationChange = (page, pageSize) => {
    this.handleFilterChange({ page, items_per_page: pageSize });
  }

  handleFilterChange = (props) => {
    this.setState({ loading: true });
    const { history, location } = this.props;
    const { search, pathname } = location;

    let urlParamsObject = queryString.parse(search);
    urlParamsObject = { ...urlParamsObject, ...props };
    const params = fnQueryParams(urlParamsObject);
    history.push({ pathname, search: params });
    this.handleFetchDebounce(queryString.parse(params));
  }

  handleClearFilters = async () => {
    this.setState({ loading: true,resetLoading:true  });
    const { history, location } = this.props;
    const { _sort_by, _sort_order } = queryString.parse(location.search);
    const search = fnQueryParams({ _sort_by, _sort_order, page: 1 });
    history.push({ pathname: location.pathname, search });
    await this.fetch(queryString.parse(search));
    this.setState({ resetLoading:false });
  }

  handleClearAll = async () => {
    this.setState({ loading: true,resetLoading:true  });
    const { history, location } = this.props;
    history.push({ pathname: location.pathname, search: fnQueryParams({ page: 1 }) });
    await this.fetch({});
    this.setState({ resetLoading:false });
  }

  render() {
    const { total, loading, statusCode, resetLoading } = this.state;
    const {
      location,
      filterComponent: FilterComponent
    } = this.props;
    const urlParamsObject = queryString.parse(location.search || "");
    const currentPage = urlParamsObject.page ? parseInt(urlParamsObject.page, 10) : 1;
    const pageSize = urlParamsObject.items_per_page ? parseInt(urlParamsObject.items_per_page, 10) : 10;


    const components = {
      body: { cell: EditableCell }
    };

    const columns = this.props.columns.map(col => {
      if(col.dataIndex === "operation"){
        return {
          ...col,
          render: (text, record) => {
            const editable = this.isEditing(record);
            const { keyValue } = this.props;
            return editable ? (
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: 15
              }}>
                <EditableContext.Consumer>
                  {form => (
                    <Popconfirm
                      title="Save changes to this record?"
                      onConfirm={() => this.save(form, record[keyValue])}
                      okText="Yes"
                      cancelText="No">
                    <p
                      style={{ marginRight: 16, color: "#FF8A00", display: "inherit", cursor: "pointer" }}
                    >
                      Save
                    </p>
                    </Popconfirm>
                  )}
                </EditableContext.Consumer>
                  <img
                    alt=""
                    onClick={() => this.cancel(record[keyValue])}
                    style={{ color:"#6D6E71", height: 16, width: 16, cursor: "pointer" }}
                    src={ require("fe-common/assets/img/ic_close@2x.png") } />
              </div>
            ) : (
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 15
              }}>
                <img
                  alt=""
                  onClick={ () => this.edit(record[keyValue]) }
                  style={{
                    cursor: "pointer",
                    color:"#FF8A00",
                    height: 16,
                    width: 16
                  }}
                  src={ require("fe-common/assets/img/ic_edit@2x.png") } />
              </div>
            );
          },
        }
      }

      if (!col.editable) {
        return {
          ...col,
          ...fnFilterSorter({ col, urlParamsObject })
        };
      }
      return {
        ...col,
        onCell: record => ({
          record,
          // data: this.state.data && this.state.data,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          limitcharacterinput: col.limitcharacterinput, 
          editing: this.isEditing(record),
        }),
        ...fnFilterSorter({ col, urlParamsObject })
      };
    });

    return (
      <Wrapper code={statusCode}>
        <EditableContext.Provider value={this.props.form}>
          <Card style={{ margin: 24 }}>
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
                  rowClassName  = "editable-row"
                  components    = {components}
                  rowKey        = { (record) => record[this.props.keyValue] }
                  dataSource    = {this.state.data}
                  columns       = {columns}
                  pagination    = {false}
                  onChange      = {this.handleTableChange}
                  locale        = {{ emptyText: "No data available yet." }}
                />
              }
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 30
              }}>
                {
                  !resetLoading &&
                    <Pagination
                      showSizeChanger
                      showQuickJumper
                      pageSizeOptions   = { ["10", "25", "50", "100"] }
                      current           = { currentPage }
                      pageSize          = { pageSize }
                      total             = { this.state.total }
                      showTotal         = { (totalPagination, range) => fnShowTotal(total, totalPagination, range) }
                      onChange          = { this.handlePaginationChange }
                      onShowSizeChange  = { this.handlePaginationChange }
                    />
                }
              </div>
            </Spin>
          </Card>
        </EditableContext.Provider>
      </Wrapper>
    );
  }
}

export default Form.create()(EditableTable);
// export default withRouter(FormComponent);
