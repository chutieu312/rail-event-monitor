import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Incident } from '../types';

@Component({
  selector: 'app-incident-banner',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf],
  template: `
    <section class="incident-banner" *ngIf="incidents.length > 0" aria-live="polite">
      <div class="banner-heading">
        <div>
          <span>Active Incidents</span>
          <strong>{{ incidents.length }}</strong>
        </div>
      </div>

      <div class="incident-grid">
        <article *ngFor="let incident of incidents" class="incident-item">
          <div class="incident-meta">
            <strong>{{ incident.trainCode }}</strong>
            <span [class.high]="incident.severity === 'HIGH'">{{ incident.severity }}</span>
          </div>
          <p>{{ incident.summary }}</p>
          <small>{{ incident.details }}</small>
          <time *ngIf="incident.openedAt">{{ incident.openedAt | date: 'short' }}</time>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      .incident-banner {
        margin: 16px 20px 0;
        border: 1px solid #f8c471;
        border-left: 6px solid #d35400;
        border-radius: 8px;
        background: #fff8ed;
        padding: 14px;
      }

      .banner-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .banner-heading div {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .banner-heading span {
        color: #6b3d00;
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
      }

      .banner-heading strong {
        display: inline-grid;
        min-width: 28px;
        height: 28px;
        place-items: center;
        border-radius: 999px;
        color: #fff;
        background: #d35400;
        font-size: 0.9rem;
      }

      .incident-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .incident-item {
        display: grid;
        gap: 6px;
        border: 1px solid #f1d2a7;
        border-radius: 8px;
        background: #fff;
        padding: 10px;
      }

      .incident-meta {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: center;
      }

      .incident-meta span {
        border-radius: 999px;
        background: #f4d03f;
        color: #4d3800;
        padding: 3px 8px;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .incident-meta span.high {
        background: #e74c3c;
        color: #fff;
      }

      p {
        margin: 0;
        font-weight: 700;
      }

      small,
      time {
        color: #6b7280;
      }
    `
  ]
})
export class IncidentBannerComponent {
  @Input() incidents: Incident[] = [];
}
