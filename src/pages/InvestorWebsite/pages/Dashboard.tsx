import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Car, Calendar, Download, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock investor dashboard - in production, this would be protected and fetch real data
export default function Dashboard() {
  const mockInvestor = {
    name: 'Demo Investor',
    portfolio: {
      invested: 500000,
      vehicles: 2,
      monthlyIncome: 17600,
      totalEarned: 105600,
      nextPayout: '2025-02-05'
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome, {mockInvestor.name}</h1>
          <p className="text-muted-foreground">Your investment dashboard</p>
        </div>

        {/* Notice */}
        <Card className="p-6 mb-8 bg-accent/10 border-accent/20">
          <div className="flex items-start gap-4">
            <Lock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Demo Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                This is a preview of the investor portal. Real investors access their personalized 
                dashboard with live data, payout history, and vehicle tracking after completing the 
                investment process.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              ₹{mockInvestor.portfolio.invested.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-muted-foreground">Total Invested</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              ₹{mockInvestor.portfolio.monthlyIncome.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-muted-foreground">Monthly Income</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              {mockInvestor.portfolio.vehicles}
            </div>
            <div className="text-sm text-muted-foreground">Deployed Vehicles</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              {new Date(mockInvestor.portfolio.nextPayout).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            </div>
            <div className="text-sm text-muted-foreground">Next Payout</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Earnings Summary */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Earnings Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Total Earned to Date</span>
                <span className="font-semibold">₹{mockInvestor.portfolio.totalEarned.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Months Active</span>
                <span className="font-semibold">6 months</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Annualized ROI</span>
                <span className="font-semibold text-primary">21.12%</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Remaining Tenure</span>
                <span className="font-semibold">42 months</span>
              </div>
            </div>
            <Button className="w-full mt-6" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </Card>

          {/* Vehicle Status */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Vehicle Status</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">EV Unit #001</span>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Active</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Total KM: 12,450</p>
                  <p>Last Service: 15 Jan 2025</p>
                  <p>Next Service: 15 Mar 2025</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">EV Unit #002</span>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Active</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Total KM: 11,890</p>
                  <p>Last Service: 10 Jan 2025</p>
                  <p>Next Service: 10 Mar 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <Card className="mt-8 p-8 text-center gradient-hero">
          <h2 className="text-2xl font-bold mb-4">Want to Increase Your Investment?</h2>
          <p className="text-muted-foreground mb-6">
            Add more vehicles to your portfolio and increase monthly income
          </p>
          <Button asChild size="lg" className="gradient-primary">
            <Link to="/contact">Add Investment</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
