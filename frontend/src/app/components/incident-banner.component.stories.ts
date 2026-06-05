import type { Meta, StoryObj } from '@storybook/angular';
import { IncidentBannerComponent } from './incident-banner.component';

const meta: Meta<IncidentBannerComponent> = {
  title: 'Operations/Incident Banner',
  component: IncidentBannerComponent
};

export default meta;
type Story = StoryObj<IncidentBannerComponent>;

export const ActiveIncidents: Story = {
  args: {
    incidents: [
      {
        id: 1,
        trainCode: 'TR-1002',
        severity: 'HIGH',
        summary: 'Signal anomaly reported for TR-1002',
        details: 'Dispatcher review requested after repeated status changes.',
        status: 'OPEN',
        openedAt: new Date().toISOString()
      },
      {
        id: 2,
        trainCode: 'TR-1003',
        severity: 'MEDIUM',
        summary: 'Delay threshold exceeded for TR-1003',
        details: 'Train is holding at the Pittsburgh approach.',
        status: 'OPEN',
        openedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString()
      }
    ]
  }
};

export const Clear: Story = {
  args: {
    incidents: []
  }
};
