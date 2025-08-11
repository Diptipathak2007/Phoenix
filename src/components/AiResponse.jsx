import PropTypes from "prop-types";
import React from 'react'
import { iconlogo } from "../assets/assets";
import { Iconbtn } from "./Button";
const AiResponse = ({aiResponse,children}) => {
  return (
    <div className="">
        <figure className="">
            <img src={iconlogo} width={32} height={32} alt="" />
        </figure>
        {children}
        <div className="markdown-content"></div>

    </div>
  )
}
AiResponse.propTypes={
    aiResponse:PropTypes.string,
    children:PropTypes.any
}

export default AiResponse