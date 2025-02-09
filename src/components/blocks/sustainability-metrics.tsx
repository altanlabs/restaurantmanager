import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { client } from "@/lib/database";
import Chart from "../ui/chart";

interface SustainabilityMetric {
  id: string;
  metric_date: string;
  local_sourcing_percentage: number;
  waste_reduction_rate: number;
  sustainable_packaging_score: number;
}

export function SustainabilityMetrics() {
  const [metrics, setMetrics] = useState<SustainabilityMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await client.from('Sustainability_Metrics')
          .select('*')
          .orderBy('metric_date', 'desc')
          .limit(6);
        setMetrics(response.data as SustainabilityMetric[]);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const chartData = {
    labels: metrics.map(m => new Date(m.metric_date).toLocaleDateString()),
    datasets: [
      {
        label: 'Local Sourcing %',
        data: metrics.map(m => m.local_sourcing_percentage),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Waste Reduction %',
        data: metrics.map(m => m.waste_reduction_rate),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      },
      {
        label: 'Packaging Score',
        data: metrics.map(m => m.sustainable_packaging_score),
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1
      }
    ]
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Sustainability Metrics</h2>
        <p className="text-muted-foreground">Last 6 months performance</p>
      </div>

      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          Loading...
        </div>
      ) : metrics.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center">
          No metrics available
        </div>
      ) : (
        <div className="h-[300px]">
          <Chart
            type="line"
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div>
      )}
    </Card>
  );
}