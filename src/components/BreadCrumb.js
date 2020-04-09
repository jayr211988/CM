import React from "react";
import { Breadcrumb } from "antd";

export default function BreadCrumb({ items }) {
  return(
    <Breadcrumb separator=">">
      {
        items.map( (item, index)=> {
          return <Breadcrumb.Item key={index}>{item.text || ""}</Breadcrumb.Item>
        })
      }
    </Breadcrumb>
  )
}