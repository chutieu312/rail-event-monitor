import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <section class="auth-card">
      <h1>Rail Event Monitor</h1>
      <p>Sign in with demo credentials to access operations dashboards.</p>

      <form (ngSubmit)="submit()" class="auth-form">
        <label>
          Username
          <input type="text" name="username" [(ngModel)]="username" required />
        </label>

        <label>
          Password
          <input type="password" name="password" [(ngModel)]="password" required />
        </label>

        <button type="submit" [disabled]="loading()">{{ loading() ? 'Signing in...' : 'Sign in' }}</button>
        <p class="error" *ngIf="error()">{{ error() }}</p>
      </form>

      <small>Demo login: ops&#64;railmonitor.local / demo1234</small>
    </section>
  `,
  styles: [
    `
      .auth-card {
        max-width: 420px;
        margin: 80px auto;
        background: #fff;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
      }

      .auth-form {
        display: grid;
        gap: 12px;
        margin: 16px 0;
      }

      label {
        display: grid;
        gap: 6px;
        font-weight: 600;
      }

      input {
        padding: 10px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
      }

      button {
        background: #0f4c81;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 10px 14px;
        cursor: pointer;
      }

      .error {
        color: #c62828;
      }
    `
  ]
})
export class LoginComponent {
  username = 'ops@railmonitor.local';
  password = 'demo1234';
  loading = signal(false);
  error = signal('');

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  submit() {
    this.loading.set(true);
    this.error.set('');

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Invalid credentials.');
      }
    });
  }
}
