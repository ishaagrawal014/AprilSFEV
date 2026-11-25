import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2 } from 'lucide-react';
import content from '@/pages/InvestorWebsite//data/content.json';

export default function Partners() {
  const deliveryPartners = [
    { name: 'Zepto', color: 'bg-purple-500' },
    { name: 'Swiggy', color: 'bg-orange-500' },
    { name: 'Zomato', color: 'bg-red-500' },
    { name: 'Blinkit', color: 'bg-yellow-500' },
    { name: 'Dunzo', color: 'bg-blue-500' },
  ];

  const allPartners = [...deliveryPartners, ...deliveryPartners];

  const achievements = [
    '10,000+ deliveries per day',
    '3,820+ vehicles deployed',
    '8+ operational locations',
    '30+ satisfied fleet partners',
    '1 Cr+ green kilometers',
    '₹10 Cr+ revenue milestone'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-up">
            {content.partners.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {content.partners.subtitle}
          </p>
        </div>
      </section>

      {/* Delivery Partners */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powering India's Top Delivery Platforms</h2>
              <p className="text-muted-foreground">
                Our EV fleet serves riders from the country's leading logistics companies
              </p>
            </div>

            {/* Marquee Scroll */}
            <div className="overflow-hidden mb-16">
              <div className="flex gap-5 animate-marquee">
                {allPartners.map((partner, index) => (
                  <Card key={index} className="p-8 flex items-center justify-center min-w-[180px]">
                    <div className="text-center">
                      <div className={`h-16 w-16 rounded-full ${partner.color} mx-auto mb-3 flex items-center justify-center`}>
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                      <div className="font-semibold text-lg">{partner.name}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-10 shadow-elevated bg-gradient-hero">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Validated Product-Market Fit
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Partners Trust Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Delivery Platforms Choose Us</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Reliable Fleet</h3>
                <p className="text-muted-foreground">
                  Well-maintained vehicles with 24/7 support ensuring zero downtime for riders
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Trained Riders</h3>
                <p className="text-muted-foreground">
                  Professional rider management with safety training and performance tracking
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Cost Efficiency</h3>
                <p className="text-muted-foreground">
                  EVs offer 60% lower running costs compared to petrol bikes, benefiting riders
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Scalable Operations</h3>
                <p className="text-muted-foreground">
                  Proven ability to scale fleet size rapidly based on platform demand
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Owner Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Strong Demand = Consistent Returns for You
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our partnerships with leading delivery platforms ensure continuous demand for EVs, 
              translating to reliable monthly income for fleet investors. With delivery volumes 
              growing 5x in the last 2 years, your investment rides on proven market demand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary">
                <Link to="/investment">View Investment Plans</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/opportunity">Learn About the Opportunity</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}