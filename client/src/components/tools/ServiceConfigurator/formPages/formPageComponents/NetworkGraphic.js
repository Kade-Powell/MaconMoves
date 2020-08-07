import React from 'react';
import { Graph } from 'react-d3-graph';
import Router from '../../../../../img/router.png';
import { matchedData } from 'express-validator';

const NetworkGraphic = ({ props }) => {
  let initialX = 400;

  const nodes = Object.values(props.serviceConfigForm.deviceVars).map(
    (data) => {
      return { id: data.ipAddress, x: (initialX += 50), y: 150 };
    }
  );
  console.log(`nodes = ${nodes}`);
  let links = [];
  Object.values(props.serviceConfigForm.deviceVars).forEach((device) => {
    nodes.forEach((node) => {
      if (device.sdp1Destination === node.id) {
        links.push({
          source: device.ipAddress,
          target: device.sdp1Destination,
        });
      }
      if (device.sdp2Destination === node.id) {
        links.push({
          source: device.ipAddress,
          target: device.sdp2Destination,
        });
      }
    });
  });

  const data = {
    nodes,
    links,
  };

  console.log(`data = ${data}`);

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used
  const myConfig = {
    directed: true,
    automaticRearrangeAfterDropNode: false,
    maxZoom: 4,
    minZoom: 0.5,
    width: 1050,
    height: 300,
    initialZoom: 1.75,
    node: {
      svg: Router,
      size: 350,
      labelPosition: 'top',
      fontSize: 10,
    },
    link: {
      type: 'CURVE_SMOOTH',
      color: 'grey',
      opacity: 0.7,
      renderLabel: false,
      strokeWidth: 2,
      markerHeight: 6,
      markerWidth: 6,
    },
  };
  // graph event callbacks
  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onDoubleClickNode = function (nodeId) {
    window.alert(`Double clicked node ${nodeId}`);
  };

  const onRightClickNode = function (event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onRightClickLink = function (event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
  };

  return (
    <Graph
      className='WorkSpaceCanvas'
      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onDoubleClickNode={onDoubleClickNode}
      onRightClickNode={onRightClickNode}
      onClickLink={onClickLink}
      onRightClickLink={onRightClickLink}
    />
  );
};

export default NetworkGraphic;
