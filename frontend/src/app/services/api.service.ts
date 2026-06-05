import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incident, Train, TrainEvent } from '../types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  getTrains() {
    return this.http.get<Train[]>('/api/trains');
  }

  getEvents() {
    return this.http.get<TrainEvent[]>('/api/events');
  }

  getActiveIncidents() {
    return this.http.get<Incident[]>('/api/incidents/active');
  }
}
