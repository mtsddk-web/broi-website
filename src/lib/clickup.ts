// ClickUp API integration for BROI offers
// Spychała will add offers as tasks in ClickUp, and they will appear on the website

export interface ClickUpTask {
  id: string;
  name: string;
  description?: string;
  status: {
    status: string;
  };
  custom_fields?: Array<{
    id: string;
    name: string;
    value?: string | number;
  }>;
  attachments?: Array<{
    id: string;
    url: string;
  }>;
}

export interface Offer {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  type: 'sprzedaz' | 'wynajem';
  description?: string;
  image?: string;
}

const CLICKUP_API_URL = 'https://api.clickup.com/api/v2';

// These will be set via environment variables
const CLICKUP_TOKEN = process.env.CLICKUP_API_TOKEN || '';
const CLICKUP_LIST_ID = process.env.CLICKUP_BROI_LIST_ID || '';

// Custom field IDs (will need to be configured based on actual ClickUp setup)
const CUSTOM_FIELDS = {
  location: process.env.CLICKUP_FIELD_LOCATION || '',
  price: process.env.CLICKUP_FIELD_PRICE || '',
  area: process.env.CLICKUP_FIELD_AREA || '',
  rooms: process.env.CLICKUP_FIELD_ROOMS || '',
  type: process.env.CLICKUP_FIELD_TYPE || '',
};

export async function getOffers(): Promise<Offer[]> {
  // If ClickUp is not configured, return empty array (will show mock data)
  if (!CLICKUP_TOKEN || !CLICKUP_LIST_ID) {
    console.log('ClickUp not configured, using mock data');
    return [];
  }

  try {
    const response = await fetch(
      `${CLICKUP_API_URL}/list/${CLICKUP_LIST_ID}/task?statuses[]=publikuj&statuses[]=aktywna`,
      {
        headers: {
          Authorization: CLICKUP_TOKEN,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    );

    if (!response.ok) {
      console.error('ClickUp API error:', response.status);
      return [];
    }

    const data = await response.json();
    const tasks: ClickUpTask[] = data.tasks || [];

    return tasks.map((task) => mapTaskToOffer(task));
  } catch (error) {
    console.error('Error fetching offers from ClickUp:', error);
    return [];
  }
}

function mapTaskToOffer(task: ClickUpTask): Offer {
  const getCustomFieldValue = (fieldId: string): string | number | undefined => {
    const field = task.custom_fields?.find((f) => f.id === fieldId);
    return field?.value;
  };

  // Get first attachment as image
  const image = task.attachments?.[0]?.url;

  return {
    id: task.id,
    title: task.name,
    location: String(getCustomFieldValue(CUSTOM_FIELDS.location) || 'Lokalizacja nieznana'),
    price: Number(getCustomFieldValue(CUSTOM_FIELDS.price)) || 0,
    area: Number(getCustomFieldValue(CUSTOM_FIELDS.area)) || 0,
    rooms: Number(getCustomFieldValue(CUSTOM_FIELDS.rooms)) || 0,
    type: (getCustomFieldValue(CUSTOM_FIELDS.type) as 'sprzedaz' | 'wynajem') || 'sprzedaz',
    description: task.description,
    image,
  };
}

// Helper to check if ClickUp is configured
export function isClickUpConfigured(): boolean {
  return Boolean(CLICKUP_TOKEN && CLICKUP_LIST_ID);
}
