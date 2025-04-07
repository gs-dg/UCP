import React, { useCallback, useContext, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReactECharts from 'echarts-for-react'
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import botLogo from '../../../assets/bot-logo.mp4'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Home.css'


const Home = () => {
  const { darkMode, isNavOpen, selectedAccount, isBotopen, setIsBotOpen } = useContext(ThemeContext);
  const [chartStates, setChartStates] = useState({
    chart1: true,
    chart2: true,
    chart3: true,
    chart4: true,
    chart5: true,
    chart6: true
  });

  // Toggle function using useCallback to prevent unnecessary re-renders
  const toggleChart = useCallback((chartKey) => {
    setChartStates((prev) => ({
      ...prev,
      [chartKey]: !prev[chartKey]
    }));
  }, []);

  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: '30%',
      right: '10%',
      bottom: '15%',
      top: '10%',
    },
    legend: {
      show: false,
    },
    yAxis: [
      {
        type: 'category',
        data: [
          'rds-public-ip',
          's3-public-read-prohibited',
          'iam-idp-compliance',
          'iam-roles-external-perms',
          'ec2-rogue-emi',
        ],
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          color: 'black'
        }
      },
    ],
    xAxis: [
      {
        type: 'value',
        min: 0,
        max: 30,
        interval: 5,
        axisLabel: {
          color: 'black'
        }
      },
    ],
    series: [
      {
        name: 'Compliance',
        type: 'bar',
        data: selectedAccount.name == 'Governance' ? [30, 22, 17, 10, 4].reverse() : [28, 18, 16, 12, 8].reverse(),
        itemStyle: {
          color: function (params) {
            const colors = ['#CA1ECD', '#D4D93F', '#166186', '#F38181', '#AA1717'];
            return colors[params.dataIndex];
          },
          borderRadius: [0, 10, 10, 0],
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
        },
      },
    ],
  }

  const option2 = {
    tooltip: {
      trigger: 'item',
      theme: darkMode ? 'dark' : 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: darkMode ? '#fff' : '#000',
        backgroundColor: darkMode ? '#333' : '#fff',
      },
      formatter: '{b}: {c} ({d}%)',  // Show name, value, and percentage when hovering
    },
    legend: {
      top: '5%',
      right: '5%',
      orient: 'vertical',
      textStyle: {
        color: '#000',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 10,
          formatter: '{c}',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: selectedAccount.name == 'Governance' ? [
          { value: 25, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 30, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 20, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 15, name: 'Low', itemStyle: { color: '#CA1ECD' } },
          { value: 10, name: 'Info', itemStyle: { color: '#D4D93F' } },
        ] : [
          { value: 30, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 22, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 23, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 11, name: 'Low', itemStyle: { color: '#CA1ECD' } },
          { value: 16, name: 'Info', itemStyle: { color: '#D4D93F' } },
        ],
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '37%',
        top: 'center',
        style: {
          text: `Total\n${25 + 30 + 20 + 15 + 10}`,  // Total value
          textAlign: 'center',
          textVerticalAlign: 'middle',
          font: 'bold 14px Arial',  // Font style and size
          fill: darkMode ? 'green' : '#f90000',  // Text color based on dark mode
        },
      },
    ],
  };

  const option3 = {
    tooltip: {
      trigger: 'item',
      theme: darkMode ? 'dark' : 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: darkMode ? '#fff' : '#000',
        backgroundColor: darkMode ? '#333' : '#fff',
      },
      formatter: '{b}: {c} ({d}%)',  // Show name, value, and percentage when hovering
    },
    legend: {
      top: '5%',
      right: '5%',
      orient: 'vertical',
      textStyle: {
        color: '#000',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '105%'],
        center: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2,
        },
        startAngle: 180,
        endAngle: 360,
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
          formatter: '{c}',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: selectedAccount.name == 'Governance' ? [
          { value: 110, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 90, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 60, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 20, name: 'Low', itemStyle: { color: '#CA1ECD' } },
        ] : [
          { value: 100, name: 'High', itemStyle: { color: '#F38181' } },
          { value: 70, name: 'Critical', itemStyle: { color: '#AA1717' } },
          { value: 50, name: 'Medium', itemStyle: { color: '#166186' } },
          { value: 40, name: 'Low', itemStyle: { color: '#CA1ECD' } },
        ],
      },
    ],
  };

  const option4 = {
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        label: {
          show: true,
          position: 'outside',
          color: '#000',
          fontSize: 12,
          formatter: '{c} ({d}%) \n{b}',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
          },
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: '#000', // Set the label line (arrow) color to black
          },
        },
        data: selectedAccount.name == 'Governance' ? [
          { value: 5733, name: 'Optimal', itemStyle: { color: '#99FF99' } },
          { value: 2911, name: 'Savings Opportunity', itemStyle: { color: '#99CCFF' } },
          { value: 305, name: 'Identified Risk', itemStyle: { color: '#F38181' } },
        ] : [
          { value: 4597, name: 'Optimal', itemStyle: { color: '#99FF99' } },
          { value: 3215, name: 'Savings Opportunity', itemStyle: { color: '#99CCFF' } },
          { value: 401, name: 'Identified Risk', itemStyle: { color: '#F38181' } },
        ],
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '5%',
        top: '15%',
        style: {
          text: '\nEC2: 3200\nRDS: 1560\nASG: 28 \n\n\n\n\n\n\nVM: 980\nScale Sets: 90\n',
          font: '13px Arial, sans-serif',
          fill: '#000',
          width: 100,
        },
      },
      {
        type: 'text',
        left: '5%',
        top: '15%',
        style: {
          text: 'AWS',  // Bold "AWS"
          font: 'bold 14px Arial, sans-serif',
          fill: '#000',
          width: 100,
        },
      },
      {
        type: 'text',
        left: '5%',
        top: '15%',
        style: {
          text: '\n\n\n\n\n\n\n\nAzure',  // Bold "Azure"
          font: 'bold 14px Arial, sans-serif',
          fill: '#000',
          width: 100,
        },
      }
    ],
  };

  const option5 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: {
      type: 'category',
      data: ['HIGH', 'MEDIUM', 'CRITICAL', 'INFO', 'LOW'],
      axisLabel: {
        show: true,  // Hide the labels on the x-axis
        color: 'black',
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'black'
      }
    },
    grid: { show: false },
    legend: {
      show: true,
      data: ['HIGH', 'MEDIUM', 'CRITICAL', 'INFO', 'LOW'],
      top: '5%',
      left: 'center',
    },
    series: [
      {
        data: selectedAccount.name == 'Governance' ? [
          { value: 80, itemStyle: { color: '#F38181' } },
          { value: 60, itemStyle: { color: '#166186' } },
          { value: 30, itemStyle: { color: '#AA1717' } },
          { value: 20, itemStyle: { color: '#D4D93F' } },
          { value: 50, itemStyle: { color: '#CA1ECD' } },
        ] : [
          { value: 90, itemStyle: { color: '#F38181' } },
          { value: 45, itemStyle: { color: '#166186' } },
          { value: 20, itemStyle: { color: '#AA1717' } },
          { value: 50, itemStyle: { color: '#D4D93F' } },
          { value: 60, itemStyle: { color: '#CA1ECD' } },
        ],
        type: 'bar',
        barWidth: 38,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
        }
      },
    ]
  }

  const option6 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      show: true,
      data: ['ENABLED', 'DISABLED'],
      bottom: '5%',
      left: 'center',  // Align it to the center horizontally
    },
    xAxis: [
      {
        type: 'category',
        data: ['HIGH', 'MEDIUM', 'CRITICAL', 'INFO', 'LOW'],
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          show: true,
          color: 'black',
        }
      },
    ],
    grid: { show: false },
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 30,
        interval: 5,
        style: { fontSize: '15px', color: darkMode ? '#fff' : '#000' },
        axisLabel: {
          color: 'black'
        }
      },
    ],
    series: [
      {
        name: 'ENABLED',
        type: 'bar',
        barGap: 0,
        data: selectedAccount.name == 'Governance' ? [18, 24, 18, 6, 18] : [20, 26, 16, 7, 15],
        itemStyle: {
          color: '#00FF00',
          borderRadius: [10, 10, 0, 0]
        },
        // barWidth: 10,
      },
      {
        name: 'DISABLED',
        type: 'bar',
        data: selectedAccount.name == 'Governance' ? [6, 9, 12, 6, 9] : [5, 11, 8, 6, 10],
        itemStyle: {
          color: '#FF0000',
          borderRadius: [10, 10, 0, 0]
        },
      },
    ],
  };


  return (
    <div className={`h-full w-full flex-1 overflow-y-auto ${!isNavOpen ? 'ml-16' : 'ml-48'} ${isBotopen ? 'mr-64' : ' md:px-14'} px-4 py-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`} style={{ backgroundColor: darkMode ? '' : '' }}>
      {/* Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "AWS Account", value: `${selectedAccount.name}(${selectedAccount.ou}): ${selectedAccount.id}`, color: "border-green-500", icon: <CloudQueueOutlinedIcon style={{ color: "rgb(34 197 94)" }} /> },
          { title: "Remediation Score", value: "65%", color: "border-blue-500", icon: <TrendingUpRoundedIcon style={{ color: "rgb(85 149 255)" }} /> },
          { title: "Exceptions", value: "150", color: "border-yellow-500", icon: <VerifiedUserIcon style={{ color: "rgb(234 179 8)" }} /> },
          { title: "Critical Findings", value: "123", color: "border-red-500", icon: <ReportProblemIcon style={{ color: "red" }} /> },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-t-md border-b-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-md hover:translate-y-1 ${item.color} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          >
            <div className="flex justify-between">
              <span>{item.title}</span>
              {item.icon}
            </div>
            <p className="text-md">{item.value}</p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {[
          { title: "Top Non-compliant rules by Resource Count", option: option1, key: "chart1" },
          { title: "Non-compliant findings by Severity", option: option2, key: "chart2" },
          { title: "Tenable vulnerabilities for recorded Assets", option: option3, key: "chart3" },
          { title: "Densify cost saving opportunities", option: option4, key: "chart4" },
          { title: "Resource Exceptions distribution by Severity", option: option5, key: "chart5" },
          { title: "Remediation posture status by Severity", option: option6, key: "chart6" }
        ].map((chart, index) => (
          <div key={index} className={`p-3 rounded-md transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} style={{ backgroundColor: darkMode ? '' : 'rgba(190, 217, 250, .7)' }}>
            <div className='flex justify-between mb-2'>
              <h3 
                className='font-semibold'>{chart.title} 
                <span>
                  <Tippy interactive={false} placement="top" arrow={false} className='info-tippy' content={<span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias impedit dolorum fugiat eveniet ut perferendis a consectetur vero minima, voluptates veritatis architecto pariatur iste molestiae, est tempore magni, recusandae soluta.</span>}>
                    <InfoOutlinedIcon className="focus:outline-none" style={{height: '16px', width: '16px', marginLeft: '5px'}}/>
                  </Tippy>
                </span>
              </h3>
              {/* <button onClick={() => toggleChart(chart.key)} className="px-3 py-1 bg-blue-500 rounded-md text-white cursor-pointer">
                {chartStates[chart.key] ? 'Info' : 'Chart'}
              </button> */}
            </div>
            <div className={`${darkMode ? 'bg-gray-200' : 'bg-white'} rounded-md`} >
              {/* <div className="w-full rounded-md"> */}
                <div className={`relative h-72 w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]`} style={{ transform: chartStates[chart.key] ? "rotateY(0deg)" : "rotateY(180deg)" }}>
                  <div className="absolute inset-0 w-full h-full transition-all duration-500 [backface-visibility:hidden]" style={{ transform: "rotateY(0deg)" }}>
                    <ReactECharts option={chart.option} />
                  </div>
                  {/* <div className="inset-0 w-full h-full transition-all duration-500 [backface-visibility:hidden] flex items-center justify-center bg-white p-4 rounded-md" style={{ transform: "rotateY(180deg)" }}>
                    <div className="overflow-y-auto px-2 h-64 rounded-md">
                      <div className="overflow-y-auto px-2 h-64 rounded-md text-justify">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias impedit dolorum fugiat eveniet ut perferendis a consectetur vero minima, voluptates veritatis architecto pariatur iste molestiae, est tempore magni, recusandae soluta. Labore adipisci iste consequatur aliquam nihil eos odio dolor, nobis, excepturi hic architecto dolores! Mollitia placeat id recusandae iure quibusdam voluptates necessitatibus eaque repellendus, iusto voluptatum corrupti et fuga accusantium eum quos? Velit accusamus sed veniam alias amet eveniet delectus facere molestiae quos quod ea, harum magni quisquam! Consectetur ea mollitia praesentium ratione doloremque tempora veniam, dignissimos assumenda, non expedita totam dolorem!
                      </div>
                    </div>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Need Help Button */}
      {!isBotopen && <div className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-colors overflow:hidden bg-transparent" >
        <Tippy content={<span>Need Help ?</span>} interactive={false} placement="top">
          <div className="relative w-full h-full" onClick={() => setIsBotOpen(true)}>
            <video
              src={botLogo}
              autoPlay
              loop
              muted
              style={{ border: 'none', width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', borderRadius: '50%' }}
            />
          </div>
        </Tippy>
      </div>}
    </div>
  );
};

export default Home;
