import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { Incident, TrainEvent } from '../types';

@Injectable({ providedIn: 'root' })
export class EventWebSocketService {
  connect(): Observable<TrainEvent> {
    return this.connectEvents();
  }

  connectEvents(): Observable<TrainEvent> {
    return this.connectTopic<TrainEvent>('/topic/events');
  }

  connectIncidents(): Observable<Incident> {
    return this.connectTopic<Incident>('/topic/incidents');
  }

  private connectTopic<T>(topic: string): Observable<T> {
    return new Observable<T>((observer) => {
      const client = new Client({
        webSocketFactory: () => new SockJS('/ws/events'),
        reconnectDelay: 5000
      });

      client.onConnect = () => {
        client.subscribe(topic, (message) => {
          observer.next(JSON.parse(message.body) as T);
        });
      };

      client.onStompError = (frame) => {
        observer.error(frame.body);
      };

      client.activate();

      return () => {
        client.deactivate();
      };
    });
  }
}
