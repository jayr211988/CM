import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Icon, Popconfirm } from "antd";


function ActionButton(props) {

  const handleOk = () => {
    const uuid = record[props.keyValue];
    props.delete(uuid);
  };

  const { record } = props;
  const uuid = record[props.keyValue];
  const isOwnProfile = props && props.record && props.profile && props.record.name == props.profile.name;
  const isSuperAdmin =  props && props.record && props.profile &&
    ( props.record.role == "Super Administrator" && props.profile.role == "Administrator")

  return (
    <div style={{textAlign: "right"}}>
      <Link 
        style={{ pointerEvents: (isSuperAdmin) ? "initial" : "pointer"}}
        disabled={(isSuperAdmin) ? true : false}
        to={(isSuperAdmin) ? "#" : `${props.edit}/${uuid}` }
      >
        <img alt="" style={{ 
          opacity: (isSuperAdmin) && "0.5",
          ...styles,   
          cursor: (isSuperAdmin) ? "not-allowed" : "pointer"}} src={ require("fe-common/assets/img/ic_edit@2x.png") } />
      </Link>
      <Popconfirm
        onConfirm={handleOk}
        okType="danger"
        okText="Yes"
        disabled={ (isOwnProfile || isSuperAdmin) ? true : false}
        cancelText="No"
        // title="Delete this record?"
        title={<div style={{width: 170}}>Delete this record?</div>}
        icon={ <Icon type="close-circle" theme="filled" style={{ color: '#e96061'}} />}
      >
        <img alt="" style={{
          opacity: (isOwnProfile || isSuperAdmin) && "0.5",
          ...styles,   
          cursor: (isOwnProfile || isSuperAdmin) ? "not-allowed" : "pointer",
          }} src={ require("fe-common/assets/img/ic_delete@2x.png") } />
      </Popconfirm>
      <Link to={`${props.view}/${uuid}`}>
        <img alt="" style={styles} src={ require("fe-common/assets/img/ic_view@2x.png") } />
      </Link>
    </div>
  );
}

const styles = {
  marginRight: 25,
  color: "#FF8A00",
  cursor: "pointer",
  height: 16,
  width: 16
};

export default withRouter(ActionButton);