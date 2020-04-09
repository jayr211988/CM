import React from "react";
import { Avatar } from "antd";

function CardInfo({ name, position, contact }) {
  return (
    <div style={{color: '#511565', fontSize: 12}}>
        <div style={styles.name}>{name}</div>
        <div><Avatar size="small" icon="user"  style={{ backgroundColor: '#6a0e98' }} /></div>
        <div>{position}</div>
        <div>{contact}</div>
    </div>
  );
}

export default CardInfo;

const styles = {
  name: {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    background: 'rgba(82, 22, 102, 0.82)',
    color:' white',
    borderRadius: '10px',
    marginBottom: '1px',
    padding: '0px 7px'
  }
}
