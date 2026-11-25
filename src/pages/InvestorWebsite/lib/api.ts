// Mock API functions for Speed Force EV platform
import axios from 'axios';


interface StatsResponse {
  deployed: number;
  active: number;
  greenKilometers: number;
  timestamp: string;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  investmentSlab: string;
  message: string;
}

interface InvestmentData {
  slab: number;
  email: string;
  phone: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get real-time fleet statistics
  async getStats(): Promise<StatsResponse> {
    await delay(500);
    return {
      deployed: 3820,
      active: 3487,
      greenKilometers: 7023732 + Math.floor(Math.random() * 100), // Add random increment for "live" feel
      timestamp: new Date().toISOString()
    };
  },

  // Submit contact form
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    console.log('Contact form submitted:', data);
    
    // Simulate success
    return {
      success: true,
      message: 'Thank you for your interest! Our team will contact you within 24 hours.'
    };
  },

  // Submit investment application
  async submitInvestment(data: InvestmentData): Promise<{ success: boolean; message: string; applicationId?: string }> {
    await delay(1500);
    console.log('Investment application submitted:', data);
    
    // Simulate success with application ID
    return {
      success: true,
      message: 'Investment application submitted successfully!',
      applicationId: `SPF${Date.now().toString().slice(-8)}`
    };
  },

  // Get investment plans/slabs
  async getPlans() {
    await delay(300);
    return [
      {
        id: 1,
        amount: 250000,
        monthlyRent: 8800,
        annualRent: 105600,
        vehicles: 1,
        salvageValue: 37500,
        totalReceivable: 459900
      },
      {
        id: 2,
        amount: 500000,
        monthlyRent: 17600,
        annualRent: 211200,
        vehicles: 2,
        salvageValue: 75000,
        totalReceivable: 919800
      },
      {
        id: 3,
        amount: 1000000,
        monthlyRent: 35200,
        annualRent: 422400,
        vehicles: 4,
        salvageValue: 150000,
        totalReceivable: 1839600
      }
    ];
  }
};

// Analytics tracking mock
export const track = (eventName: string, payload?: Record<string, any>) => {
  console.log('Analytics Event:', eventName, payload);
  // In production, this would send to your analytics service
};
