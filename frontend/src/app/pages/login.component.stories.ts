import { Router } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';

const authServiceStub = {
  login: () => of({ token: 'storybook-token' }),
  logout: () => undefined,
  getToken: () => null,
  isAuthenticated: () => false
};

const routerStub = {
  navigateByUrl: () => Promise.resolve(true)
};

const meta: Meta<LoginComponent> = {
  title: 'Pages/Login',
  component: LoginComponent,
  decorators: [
    applicationConfig({
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    })
  ]
};

export default meta;
type Story = StoryObj<LoginComponent>;

export const DemoCredentials: Story = {};
