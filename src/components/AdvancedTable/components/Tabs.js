import React, { Component } from "react";
import { Radio } from "antd";

class Tabs extends Component {
  state = {
    selectedValue: "",
    mounted: false,
  };

  componentDidMount() {
    const { defaultValue, defaultTabSelected } = this.props;
    const selectedValue = defaultValue ? defaultValue : defaultTabSelected.value;
    this.setState({ selectedValue, mounted: true });
  }

  handleChange = (e) => {
    const { defaultTabSelected, tableRef } = this.props;
    if (defaultTabSelected) {
      tableRef.fetch({ [defaultTabSelected.key]: e.target.value });
    }
  }

  render() {
    const { mounted, selectedValue } = this.state;
    const { tabs } = this.props;

    if (!mounted || !tabs) {
      return null;
    }

    return (
      <Radio.Group
        defaultValue={selectedValue}
        buttonStyle="solid"
        onChange={this.handleChange}
      >
        {tabs.length &&
          tabs.map((tab, index) => (
            <Radio.Button key={index} value={tab.value}>
              {tab.name}
            </Radio.Button>
          ))}
      </Radio.Group>
    );
  }
}

export default Tabs;
