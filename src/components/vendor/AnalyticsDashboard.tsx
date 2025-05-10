
import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 5000 },
  { name: 'Mar', revenue: 6000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 5500 },
  { name: 'Jun', revenue: 8000 },
  { name: 'Jul', revenue: 9000 },
];

const campaignData = [
  { name: 'Email', value: 30 },
  { name: 'Social', value: 45 },
  { name: 'Direct', value: 25 },
];

const metricsData = [
  { name: 'Engagement', value: 75 },
  { name: 'Retention', value: 65 },
  { name: 'Conversion', value: 42 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const MetricCard = ({ title, value, subtext, trend }: { title: string, value: string, subtext: string, trend?: number }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-gray-500 text-sm font-medium mb-2 font-sf-pro">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold mr-2 font-sf-pro">{value}</span>
        {trend && (
          <span className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1 font-sf-pro">{subtext}</p>
    </motion.div>
  );
};

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="TOTAL MEMBERS"
          value="2,453"
          subtext="Active loyalty members"
          trend={12}
        />
        <MetricCard
          title="REDEMPTION RATE"
          value="68%"
          subtext="From all rewards issued"
          trend={5}
        />
        <MetricCard
          title="AVG SPEND"
          value="$42.80"
          subtext="Per transaction with card"
          trend={8}
        />
        <MetricCard
          title="ROI"
          value="342%"
          subtext="On loyalty program investment"
          trend={15}
        />
      </div>

      <motion.div 
        className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-medium mb-4 font-sf-pro">Revenue from Loyalty Members</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={revenueData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "white", 
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2D5F63" 
              activeDot={{ r: 8 }}
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-4 font-sf-pro">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {campaignData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium mb-4 font-sf-pro">Key Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={metricsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Bar dataKey="value" fill="#2D5F63" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-medium mb-4 font-sf-pro">Marketing Campaign ROI</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sf-pro">Campaign</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sf-pro">Spend</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sf-pro">Revenue</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sf-pro">ROI</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sf-pro">CPC</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sf-pro">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">Summer Promotion</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$2,400</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$12,540</td>
                <td className="py-3 px-4 whitespace-nowrap text-green-600 font-sf-pro">522%</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$1.25</td>
                <td className="py-3 px-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-sf-pro">Active</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">Holiday Special</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$3,600</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$9,820</td>
                <td className="py-3 px-4 whitespace-nowrap text-green-600 font-sf-pro">273%</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$2.10</td>
                <td className="py-3 px-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-sf-pro">Completed</span></td>
              </tr>
              <tr>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">Birthday Rewards</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$1,200</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$5,670</td>
                <td className="py-3 px-4 whitespace-nowrap text-green-600 font-sf-pro">472%</td>
                <td className="py-3 px-4 whitespace-nowrap font-sf-pro">$0.85</td>
                <td className="py-3 px-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-sf-pro">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
