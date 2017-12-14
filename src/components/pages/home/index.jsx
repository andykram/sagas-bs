import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { XYPlot, StackedBarSeries, CrossHair, XAxis, YAxis, LinearGradient } from '@data-ui/xy-chart';
import { apiFetch } from 'actions/api';

import './styles';

class Home extends Component {
  static propTypes = {
    apiFetch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.tooltip = this.tooltip.bind(this);
  }

  tooltip(event, datum, data, color) {
    return (
      <div>
        <strong style={{ color }}>{datum.label}</strong>
      </div>
    );
  }

  componentDidMount() {
    this.props.apiFetch('/data-bucket.json');
  }

  componentWillReceiveProps(newProps) {
    console.log({ newProps });
  }

  render() {
    const stackKeys = ['New York', 'San Francisco'];
    const timeSeriesData = [{ 'New York': 63.4, 'San Francisco': 62.7 }];

    return (
      <XYPlot
        width={500}
        height={500}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear' }}
        renderTooltip={this.tooltip}
        snapTooltipToDataX
      >
        <YAxis label="Time" />
        <YAxis label="Number of Actions" />
        <StackedBarSeries
          data={timeSeriesData}
          stackKeys={stackKeys}
        />
      </XYPlot>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log({ state, props });
  return props;
};

export default connect(mapStateToProps, {
  apiFetch,
})(Home);
