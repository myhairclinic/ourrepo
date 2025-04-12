import { useMemo } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';

type ChartProps = {
  data: any[];
};

export const VisitorsChart = ({ data }: ChartProps) => {
  // Örnek veri üretimi
  const visitData = useMemo(() => {
    return [
      { name: 'Oca', visits: 400 },
      { name: 'Şub', visits: 300 },
      { name: 'Mar', visits: 600 },
      { name: 'Nis', visits: 800 },
      { name: 'May', visits: 1000 },
      { name: 'Haz', visits: 900 },
      { name: 'Tem', visits: 1200 }
    ];
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-gray-700 mb-3">Aylık Ziyaretçi Sayısı</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={visitData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visits" fill="#3b82f6" />
          </BarChart>
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
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-gray-700 mb-3">Randevu Durumları</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
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
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-gray-700 mb-3">Ülkelere Göre Dağılım</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Ziyaretçi Sayısı">
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
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-gray-700 mb-3">Hizmet Dağılımı</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};