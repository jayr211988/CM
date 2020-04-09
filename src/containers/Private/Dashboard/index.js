// LIBRARIES
import React, { Component, Fragment, useContext } from "react";
import { Row, Col, Input, Icon, DatePicker, Button, notification, Spin } from "antd";
import queryString from "query-string";
import _ from "lodash";


// COMPONENTS
import { Text, BreadCrumb } from "fe-components";
import { HeaderWrapper, ContentWrapper } from "fe-components/Styled";
import DashboardTable from "./components/DashboardTable";
import ReusableTableHook from "./ReusableTable"

import DownloadFile from "js-file-download";
import { FILE_DOWNLOAD } from "fe-utils/api";
import NOTIFICATION from "fe-constants/notification";

import { fnGetActivities } from "./helpers";
import { fnQueryParams } from "../../../components/AdvancedTable/helper"
import { getPermission } from 'fe-context/provider/helper'



const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      range: ["", ""],
      isRequestPending: false,
      _search: "",
      timer: null,
      count: 0
    }
    this.handleFetchDebounce = _.debounce(this.fetch, 1000); // searchj
  }

  async componentDidMount() {
    // this.setState({isRequestPending: true}); // searchj
    // const result = await fnGetActivities();
    // const { data: permission } = await getPermission();
    // this.setState({...result,isRequestPending: false, permission: permission && permission[0]});

    // let timer = setInterval(
    //   this.reLoadData,
    //   15000
    // )
    // this.setState({timer})
    const { messageTitle, descriptionMessage, styles } = NOTIFICATION.EMPTY_EXPORTED;

    notification.open({
      message: messageTitle,
      description: '.....',
      style: styles
    })


  }

  reLoadData = async () => {
    // this.setState({isRequestPending: true}); 
    const result = await fnGetActivities();
    if (result && result.dashboard && result.dashboard.length > 0) {
      this.setState({
        ...result,
        //isRequestPending: false
      });
    } else {
      if (result && result.dashboard) {
        this.setState({
          ...result,
        });
      }
    }

  }

  stopTimer = async () => {
    this.setState({ isTimerRequestPending: true })
    clearInterval(this.state.timer)
    await sleep(500)
    this.setState({ timer: null, isTimerRequestPending: false, range: ["", ""], calendarStartDate: null, _search: "" })
  }

  startTimer = async () => {
    // await this.setState({ isRequestPending: true })
    this.setState({ isTimerRequestPending: true })

    let timer = setInterval(
      this.reLoadData,
      15000
    )
    this.setState({ timer, isTimerRequestPending: false, range: ["", ""], calendarStartDate: null, _search: "" })
    this.reLoadData()
  }

  // searchj
  componentWillUnmount() {
    this.handleFetchDebounce.cancel();
    clearInterval(this.state.timer)
  }

  // searchj
  handleFilterChange = (event, disableDebounce = false) => {

    let test = {
      _search: event.target.value,
    }

    this.setState({ loading: true });
    const { history, location } = this.props;
    const { search, pathname } = location;

    let urlParamsObject = queryString.parse(search);
    urlParamsObject = { ...urlParamsObject, ...test };
    const params = fnQueryParams(urlParamsObject);
    history.push({ pathname, search: params });

    if (disableDebounce) {
      this.fetch(queryString.parse(params));
    } else {
      this.handleFetchDebounce(queryString.parse(params));
    }
  }
  handleChange = (moment, stringDate) => {
    this.setState({ range: stringDate });
    //  reset Start Date calendar 
    if (moment.length === 0) {
      this.setState({ calendarStartDate: null })
    }
  }

  handleExportCSV = async () => {
    const { message, description, style } = NOTIFICATION.EXPORTED;
    const { messageTitle, descriptionMessage, styles } = NOTIFICATION.EMPTY_EXPORTED;
    const [start_date, end_date] = this.state.range;

    // if(start_date && end_date && start_date == end_date) {
    //   return notification.error({ message: "Error", description: "End date should be before start date."})
    // }
    this.setState({ isRequestPending: true })
    try {
      let response = await FILE_DOWNLOAD('v1/api_prop_name/activity/export', { start_date, end_date });
      const filename =
        response.request.getResponseHeader('Content-Disposition')
          ? response.request.getResponseHeader('Content-Disposition').split("filename=")
          : ["Reports.csv", "Reports.csv"]

      if (response.status === 200) {
        DownloadFile(response.csv, filename[1]);
        notification.open({ message, description, style });
      }
      if (response.status === 201) {
        notification.open({
          message: messageTitle,
          description: descriptionMessage,
          style: styles
        })
      }
      this.setState({
        isRequestPending: false,
        range: ["", ""],
        calendarStartDate: null
      })
    } catch (error) {
      this.setState({
        isRequestPending: false,
        range: ["", ""],
        calendarStartDate: null
      })
    }
  }


  disabledDate = (current) => {
    if (this.state.calendarStartDate) {
      if (current && current.format() < this.state.calendarStartDate.format()) {
        return true
      } else {
        const calendarStartDate = this.state.calendarStartDate;
        const newDate = calendarStartDate.clone();
        newDate.add(7, 'days')
        return current && current.format("YYYY-MM-DD") > (newDate.format("YYYY-MM-DD"))
      }
    }
  }

  // searchj
  async fetch(params) {
    let searchIsNull;
    if (params && params._search) {
      searchIsNull = params._search
    } else {
      searchIsNull = null
    }

    this.setState({
      isRequestPending: true,
      ...params,
    });
    const data = await fnGetActivities({ ...params, _search: searchIsNull });
    if (data.total === 0 && data.data.length === 0 && (data.meta && data.meta.current_page > 1 || !data.meta)) {
      params = { ...params };
      this.handleFilterChange(params);
    } else {

      this.setState({ ...data, _search: searchIsNull });
    }
    this.setState({ isRequestPending: false });
  }

  handleFetchData = async (query = {}, _route) => {
    const { _search } = this.state;
    this.setState({ fetching: true });
    query._search = _search;
    const { dashboard: activities } = await fnGetActivities(query);

    let dashboard = this.state.dashboard;
    if (_route && dashboard && activities) {
      dashboard.map(activity => {
        if (activity.route_id == _route && activities) {
          return activity.activities = activities && activities.length > 0 && activities[0].activities;
        }
      })
    }

    this.setState({ dashboard, fetching: false });
  }


  render({ range, dashboard } = this.state) {


    return (
      <Fragment>
        <HeaderWrapper>
          <Row>
            <Col span={12}>
              <div style={{ position: "absolute", top: '-35px' }}>
                <Text size={22} weight="bold">Administration</Text>
              </div>
              <div style={{ position: "absolute", top: 2 }}>
                <Text size={15} weight="500" >User Management </Text>
                <div style={styles.underline}></div>
              </div>
            </Col>
          </Row>
        </HeaderWrapper>
        <ContentWrapper>
          <ReusableTableHook />
        </ContentWrapper>
      </Fragment>
    )
  }
}

const styles = {
  underline: {
    position: 'relative',
    width: '100%',
    height: '3px',
    background: '#6A0998'
  }
}