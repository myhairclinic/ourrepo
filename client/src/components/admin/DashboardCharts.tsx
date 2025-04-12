import { useMemo } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector, AreaChart, Area, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Calendar, Settings, ChevronRight, Layers, Activity, Globe, Map } from "lucide-react";

type ChartProps = {
  data: any[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium text-sm text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.fill }} className="text-sm">
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export const VisitorsChart = ({ data }: ChartProps) => {
  // Örnek veri üretimi
  const visitData = useMemo(() => {
    return [
      { name: 'Oca', visits: 400, uniqueVisitors: 320 },
      { name: 'Şub', visits: 300, uniqueVisitors: 230 },
      { name: 'Mar', visits: 600, uniqueVisitors: 450 },
      { name: 'Nis', visits: 800, uniqueVisitors: 590 },
      { name: 'May', visits: 1000, uniqueVisitors: 720 },
      { name: 'Haz', visits: 900, uniqueVisitors: 650 },
      { name: 'Tem', visits: 1200, uniqueVisitors: 850 }
    ];
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3 shadow-sm">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Ziyaretçi Analizi</h3>
            <p className="text-sm text-gray-500 mt-0.5">Son 7 ay</p>
          </div>
        </div>
        <button className="text-sm text-primary flex items-center font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
          Detaylı Rapor
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={visitData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: 15 }}
              formatter={(value) => <span className="text-sm font-medium">{value}</span>}
            />
            <Area 
              type="monotone" 
              dataKey="visits" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorVisits)" 
              strokeWidth={2}
              name="Toplam Ziyaretçi"
              activeDot={{ r: 6 }}
            />
            <Area 
              type="monotone" 
              dataKey="uniqueVisitors" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorUniqueVisitors)" 
              strokeWidth={2}
              name="Tekil Ziyaretçi"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const AppointmentsChart = ({ data }: ChartProps) => {
  // Örnek veri üretimi
  const chartData = useMemo(() => {
    return [
      { name: 'Bekleyen', value: 5, color: '#f59e0b' },
      { name: 'Onaylanmış', value: 12, color: '#10b981' },
      { name: 'Tamamlanmış', value: 25, color: '#3b82f6' },
      { name: 'İptal', value: 3, color: '#ef4444' },
    ];
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg mr-3 shadow-sm">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Randevu Durumları</h3>
            <p className="text-sm text-gray-500 mt-0.5">Güncel dağılım</p>
          </div>
        </div>
        <button className="text-sm text-primary flex items-center font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
          Tüm Randevular
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="h-72 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              cornerRadius={4}
              stroke="#ffffff"
              strokeWidth={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />} 
              animationDuration={200}
              animationEasing="ease-out"
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              iconSize={10}
              wrapperStyle={{ paddingLeft: 20, fontSize: 13 }}
              formatter={(value, entry, index) => {
                const { color } = chartData[index];
                const total = chartData.reduce((sum, item) => sum + item.value, 0);
                const percent = ((chartData[index].value / total) * 100).toFixed(1);
                return (
                  <span className="flex items-center text-sm">
                    <span style={{ backgroundColor: color }} className="inline-block w-3 h-3 rounded-full mr-2" />
                    <span>{value}: <strong>{chartData[index].value}</strong> ({percent}%)</span>
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const CountryDistributionChart = ({ data }: ChartProps) => {
  // Örnek veri üretimi
  const chartData = useMemo(() => {
    return [
      { name: 'Türkiye', value: 42, color: '#3b82f6' },
      { name: 'Rusya', value: 28, color: '#10b981' },
      { name: 'Azerbaycan', value: 15, color: '#f59e0b' },
      { name: 'Kazakistan', value: 8, color: '#8b5cf6' },
      { name: 'Gürcistan', value: 5, color: '#ec4899' },
      { name: 'Diğer', value: 2, color: '#6b7280' },
    ];
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2 bg-amber-100 rounded-lg mr-3">
            <Layers className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Ülkelere Göre Dağılım</h3>
            <p className="text-sm text-gray-500 mt-0.5">Son 30 gün</p>
          </div>
        </div>
        <button className="text-sm text-primary flex items-center font-medium hover:underline">
          Detaylı Analiz
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            layout="vertical"
            margin={{
              top: 15,
              right: 50,
              left: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
            <XAxis 
              type="number" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              scale="band" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              name="Ziyaretçi Sayısı"
              animationDuration={1500} 
              barSize={20} 
              radius={[0, 4, 4, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ServiceDistributionChart = ({ data }: ChartProps) => {
  // Örnek veri üretimi
  const chartData = useMemo(() => {
    return [
      { name: 'Saç Ekimi', value: 65, color: '#3b82f6' },
      { name: 'Sakal Ekimi', value: 15, color: '#10b981' },
      { name: 'Kaş Ekimi', value: 10, color: '#f59e0b' },
      { name: 'PRP Tedavisi', value: 7, color: '#8b5cf6' },
      { name: 'Mezoterapiler', value: 3, color: '#ec4899' },
    ];
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg mr-3">
            <Settings className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Hizmet Dağılımı</h3>
            <p className="text-sm text-gray-500 mt-0.5">Toplam randevular</p>
          </div>
        </div>
        <button className="text-sm text-primary flex items-center font-medium hover:underline">
          Tüm Hizmetler
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={0}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
              label={({ name, percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value, entry, index) => {
                const { color } = chartData[index];
                const total = chartData.reduce((sum, item) => sum + item.value, 0);
                const percent = ((chartData[index].value / total) * 100).toFixed(1);
                return (
                  <span className="flex items-center text-sm">
                    <span style={{ backgroundColor: color }} className="inline-block w-3 h-3 rounded-full mr-2" />
                    <span>{value}: <strong>{chartData[index].value}</strong> ({percent}%)</span>
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};