'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for trying out UNI-Agent',
      features: [
        'Up to 3 courses',
        '50 AI requests per month',
        '100MB storage',
        'Basic flashcards',
        'Study planner',
        'Notes & materials',
      ],
      limitations: [
        'No voice input',
        'No calendar export',
        'No analytics',
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      icon: Crown,
      price: { monthly: 9.99, annual: 7.99 },
      description: 'Best for serious students',
      features: [
        'Unlimited courses',
        '1,000 AI requests per month',
        '5GB storage',
        'Advanced flashcards',
        'AI study planner',
        'Voice input',
        'Calendar export (iCal)',
        'Advanced analytics',
        'Grade predictions',
        'Priority support',
      ],
      limitations: [],
      cta: 'Start 7-Day Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: { monthly: 49.99, annual: 39.99 },
      description: 'For teams and institutions',
      features: [
        'Everything in Pro',
        'Unlimited AI requests',
        '50GB storage',
        'Team workspaces (50 members)',
        'Custom integrations',
        'API access',
        'Dedicated support',
        'White-label option',
        'SLA guarantee',
        'Advanced security',
      ],
      limitations: [],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const handleSelectPlan = (planName: string) => {
    if (planName === 'Free') {
      router.push('/auth/signup?plan=free');
    } else if (planName === 'Enterprise') {
      window.location.href = 'mailto:sales@uniagent.com?subject=Enterprise Plan Inquiry';
    } else {
      router.push(`/auth/signup?plan=${planName.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-muted-foreground hover:scale-105'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-medium transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-muted-foreground hover:scale-105'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-primary/10 to-purple-600/10 border-2 border-primary shadow-2xl scale-105'
                    : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-1 rounded-full text-sm font-semibold shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-purple-600">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>

                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">${price}</span>
                    {price > 0 && (
                      <span className="text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'annual' && price > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Save ${((plan.price.monthly - plan.price.annual) * 12).toFixed(2)}/year
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-xl hover:scale-105'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            <details className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <summary className="font-semibold cursor-pointer">Can I change plans later?</summary>
              <p className="mt-3 text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </details>
            <details className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <summary className="font-semibold cursor-pointer">What payment methods do you accept?</summary>
              <p className="mt-3 text-muted-foreground">
                We accept all major credit cards, debit cards, and PayPal through Stripe.
              </p>
            </details>
            <details className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <summary className="font-semibold cursor-pointer">Is there a free trial?</summary>
              <p className="mt-3 text-muted-foreground">
                Yes! Pro and Enterprise plans come with a 7-day free trial. No credit card required.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
