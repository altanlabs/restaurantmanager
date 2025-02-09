import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  type: 'line';
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

export default function Chart({ data, options }: ChartProps) {
  return (
    <Line 
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          }
        },
        ...options
      }}
    />
  );
}