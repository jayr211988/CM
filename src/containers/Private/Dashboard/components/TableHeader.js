// LIBRARIES
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "antd";

// COMPONENTS
import { Text } from "fe-components";

export default function TableHeader(props) {

  const handleToggleTable = () => {
    props.handleToggleTable();
  }

  return(
    <Wrapper>
      <Text size={15} weight="bold">
        {props.title}
      </Text>
      {
        props.isOpen
        ? <span> 
            <Link 
              to={{
                pathname: `/activity?_route_id=${props.route_id}&_title=${props.title}`,
              }}
              onClick={()=> { 
                // setter
                localStorage.setItem(props.route_id.toString(),  JSON.stringify(props.activities) );
              }}
              target="_blank"
            >
              <Icon type="select" style={{fontSize:'18px',marginRight:'10px', cursor: 'pointer' }} />
            </Link>
            <IconComponent onClick={handleToggleTable} type="minus-square" />
        </span>
        : <span> 
            <Link 
              to={{
                pathname: `/activity?_route_id=${props.route_id}&_title=${props.title}`,
              }}
              onClick={()=> { 
                // setter
                localStorage.setItem(props.route_id.toString(),  JSON.stringify(props.activities) );
              }}
              target="_blank"
            >
              <Icon type="select" style={{fontSize:'18px',marginRight:'10px', cursor: 'pointer' }} />
            </Link>
            <IconComponent onClick={handleToggleTable} type="plus-square" />
        </span>
      }
    </Wrapper>
  )
}

const IconComponent = styled(Icon)`
  font-size: 18px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  background: rgb(231, 231, 237);
  height: 48px;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 24px;
`;