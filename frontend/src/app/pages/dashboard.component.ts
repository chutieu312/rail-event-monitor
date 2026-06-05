import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { IncidentBannerComponent } from '../components/incident-banner.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { EventWebSocketService } from '../services/event-websocket.service';
import { Incident, Train, TrainEvent } from '../types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, IncidentBannerComponent],
  template: `
    <header class="topbar">
      <h1>Rail Operations Dashboard</h1>
      <button (click)="logout()">Log out</button>
    </header>

    <app-incident-banner [incidents]="incidents()" />

    <main class="layout">
      <section class="panel">
        <h2>Train Status</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Route</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let train of trains()">
              <td>{{ train.trainCode }}</td>
              <td>{{ train.route }}</td>
              <td>{{ train.status }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="panel">
        <h2>Live Event Log</h2>
        <div class="event-list">
          <article *ngFor="let event of events()" class="event-item">
            <strong>{{ event.trainCode }}</strong>
            <span>{{ event.eventType }}</span>
            <span *ngIf="event.status">Status: {{ event.status }}</span>
            <small *ngIf="event.createdAt">{{ event.createdAt | date: 'short' }}</small>
            <small *ngIf="!event.createdAt">Live event</small>
          </article>
          <p *ngIf="events().length === 0">No events yet.</p>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        color: #fff;
        background: linear-gradient(90deg, #0f4c81, #1a759f);
      }

      .layout {
        display: grid;
        gap: 18px;
        grid-template-columns: 1fr 1fr;
        padding: 20px;
      }

      .panel {
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #e5e7eb;
      }

      .event-list {
        max-height: 420px;
        overflow: auto;
        display: grid;
        gap: 10px;
      }

      .event-item {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 10px;
        display: grid;
        gap: 4px;
      }

      @media (max-width: 900px) {
        .layout {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  trains = signal<Train[]>([]);
  events = signal<TrainEvent[]>([]);
  incidents = signal<Incident[]>([]);
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly apiService: ApiService,
    private readonly websocketService: EventWebSocketService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.apiService.getTrains().subscribe((data) => this.trains.set(data));
    this.apiService.getEvents().subscribe((data) => this.events.set(data));
    this.apiService.getActiveIncidents().subscribe((data) => this.incidents.set(data));

    this.subscriptions.add(
      this.websocketService.connectEvents().subscribe((event) => {
        this.events.update((current) => [event, ...current].slice(0, 100));
        if (event.trainCode && event.status) {
          this.trains.update((current) =>
            current.map((train) =>
              train.trainCode === event.trainCode ? { ...train, status: event.status as string } : train
            )
          );
        }
      })
    );

    this.subscriptions.add(
      this.websocketService.connectIncidents().subscribe((incident) => this.upsertIncident(incident))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }

  private upsertIncident(incident: Incident) {
    this.incidents.update((current) => {
      const existing = current.filter((item) => item.id !== incident.id);
      return [incident, ...existing].slice(0, 10);
    });
  }
}
