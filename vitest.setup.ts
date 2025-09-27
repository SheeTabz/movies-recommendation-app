import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock Next.js-specific modules
vi.mock('next/router', () => require('next-router-mock'));
vi.mock('next/navigation', () => require('next-router-mock'));

// Optional: Mock global fetch if your app uses it (e.g., via axios)
global.fetch = vi.fn();