import React, { useState } from 'react';
import Graph from './Graph';

type DataPoint = {
  time: string;
  value: number;
};

type Tab = {
  label: string;
  data: DataPoint[];
};

const App = () => {
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const tabs: Tab[] = [
    {
      label: 'A',
      data: [
        { time: '00:00', value: 10 },
        { time: '01:00', value: 20 },
        // Add more data points for plot A
      ],
    },
    {
      label: 'B',
      data: [
        { time: '00:00', value: 5 },
        { time: '01:00', value: 15 },
        // Add more data points for plot B
      ],
    },
    {
      label: 'C',
      data: [
        { time: '00:00', value: 8 },
        { time: '01:00', value: 18 },
        // Add more data points for plot C
      ],
    },
  ];

  const handleTabClick = (label: string) => {
    if (selectedTabs.includes(label)) {
      setSelectedTabs(selectedTabs.filter((tab) => tab !== label));
    } else {
      setSelectedTabs([...selectedTabs, label]);
    }
  };

  return (
    <div className='container'>
      <div>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            style={{ fontWeight: selectedTabs.includes(tab.label) ? 'bold' : 'normal' }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs
          .filter((tab) => selectedTabs.includes(tab.label))
          .map((tab) => (
            <Graph key={tab.label} data={tab.data} />
          ))}
      </div>
    </div>
  );
};

export default App;
