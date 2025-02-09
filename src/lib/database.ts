// Temporary mock client until we resolve the database initialization issue
class MockClient {
  private baseURL: string;
  private baseId: string;

  constructor(config: { baseURL: string; baseId: string }) {
    this.baseURL = config.baseURL;
    this.baseId = config.baseId;
  }

  from(table: string) {
    return {
      select: (fields: string) => ({
        limit: (n: number) => ({
          orderBy: (field: string, direction: string) => ({
            data: [] // Return empty array for now
          }),
          data: [] // Return empty array for now
        }),
        data: [] // Return empty array for now
      })
    };
  }
}

export const client = new MockClient({
  baseURL: 'https://api.altan.ai/galaxia/hook/eTDvo8',
  baseId: 'd400b16d-0746-46d0-91f7-bdfef08278d0'
});

// Sample data for development
export const mockData = {
  inventory: [
    {
      id: '1',
      item_name: 'Tomatoes',
      category: 'ingredients',
      quantity: 50,
      unit: 'kg',
      status: 'in stock',
      expiration_date: '2024-03-15'
    },
    // Add more mock data as needed
  ],
  suppliers: [
    {
      id: '1',
      name: 'Local Farm Fresh',
      type: 'local farm',
      sustainability_rating: 5,
      active_status: true,
      contact_person: 'John Doe'
    },
    // Add more mock data as needed
  ],
  sustainability_metrics: [
    {
      id: '1',
      metric_date: '2024-02-01',
      local_sourcing_percentage: 75,
      waste_reduction_rate: 65,
      sustainable_packaging_score: 4
    },
    // Add more mock data as needed
  ]
};