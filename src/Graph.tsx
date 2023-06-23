import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

type GraphData = {
  time: string;
  A: number;
  B: number;
  C: number;
};

type GraphProps = {
  data: GraphData[];
};

enum TimeScale {
  Minutes = 'Minutes',
  Hours = 'Hours',
  Days = 'Days',
}

enum PlotType {
  A = 'A',
  B = 'B',
  C = 'C',
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  const [timeScale, setTimeScale] = useState<TimeScale>(TimeScale.Minutes);
  const [selectedPlots, setSelectedPlots] = useState<PlotType[]>([PlotType.A, PlotType.B, PlotType.C]);

  const handleTimeScaleChange = (scale: TimeScale) => {
    setTimeScale(scale);
  };

  const handlePlotSelection = (plot: PlotType) => {
    if (selectedPlots.includes(plot)) {
      setSelectedPlots(selectedPlots.filter((p) => p !== plot));
    } else {
      setSelectedPlots([...selectedPlots, plot]);
    }
  };

  // Get maximum value for a specific plot type
  const getMaxValueForPlot = (plot: PlotType) => {
    return Math.max(...data.map((item) => item[plot]));
  };

  // Render graph based on selected plots and time scale
  const renderGraph = () => {
    // Filter data based on selected plots
    const filteredData = data.filter((item) => selectedPlots.includes(item.time));

    // Generate x-axis labels based on the time scale
    const xLabels = data.map((item) => item.time);

    // Generate y-axis labels for each plot type
    const yLabels = selectedPlots.map((plot) => ({
      plot,
      maxValue: getMaxValueForPlot(plot),
    }));

    // Prepare dataset for each selected plot
    const datasets = selectedPlots.map((plot) => ({
      label: plot,
      data: filteredData.map((item) => item[plot]),
      fill: false,
    }));

    // Configure chart options
    const options = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Value',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      },
    };

    // Create chart data object
    const chartData = {
      labels: xLabels,
      datasets: datasets,
    };

    return <Line data={chartData} options={options} />;
  };

  // Render the tabs for plot selection
  const renderTabs = () => {
    return (
      <div>
        <h2>Tabs</h2>
        {Object.values(PlotType).map((plot) => (
          <button
            key={plot}
            onClick={() => handlePlotSelection(plot)}
            style={{ backgroundColor: selectedPlots.includes(plot) ? 'green' : 'white' }}
          >
            {plot}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h2>Time Scale</h2>
        {Object.values(TimeScale).map((scale) => (
          <button
            key={scale}
            onClick={() => handleTimeScaleChange(scale)}
            style={{ backgroundColor: timeScale === scale ? 'green' : 'white' }}
          >
            {scale}
          </button>
        ))}
      </div>
      {renderGraph()}
      {renderTabs()}
    </div>
  );
};

export default Graph;
