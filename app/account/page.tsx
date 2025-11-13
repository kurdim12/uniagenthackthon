'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Crown, Zap, TrendingUp, Calendar, FileText, 
  Brain, HardDrive, Users, CreditCard, Settings 
} from 'lucide-react';

interface SubscriptionData {
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  status: string;
  trialEndsAt?: string;
  usage: {
    aiRequests: { current: number; limit: number };
    storage: { current: number; limit: number };
    courses: { current: number; limit: number };
  };
}

export default function AccountPage() {
  const router = useRouter();
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch('/api/account');
      if (response.ok) {
        const accountData = await response.json();
        setData(accountData);
      }
    } catch (error) {
      console.error('Failed to fetch account data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        alert('Failed to open billing portal. Please try again.');
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open billing portal. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'PRO': return Crown;
      case 'ENTERPRISE': return Zap;
      default: return FileText;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'PRO': return 'from-purple-600 to-pink-600';
      case 'ENTERPRISE': return 'from-blue-600 to-cyan-600';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading account...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load account data</p>
      </div>
    );
  }

  const PlanIcon = getPlanIcon(data.plan);
  const planColor = getPlanColor(data.plan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your subscription and usage</p>
        </motion.div>

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-gradient-to-r ${planColor} rounded-2xl p-8 mb-8 text-white`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                <PlanIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{data.plan} Plan</h2>
                <p className="text-white/80 capitalize">Status: {data.status.toLowerCase()}</p>
                {data.trialEndsAt && (
                  <p className="text-white/80 text-sm mt-1">
                    Trial ends: {new Date(data.trialEndsAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => router.push('/pricing')}
              className="px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              {data.plan === 'FREE' ? 'Upgrade Plan' : 'Change Plan'}
            </button>
          </div>
        </motion.div>

        {/* Usage Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* AI Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">AI Requests</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-semibold">
                  {data.usage.aiRequests.current} / {data.usage.aiRequests.limit === -1 ? '∞' : data.usage.aiRequests.limit}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                  style={{
                    width: data.usage.aiRequests.limit === -1 
                      ? '100%' 
                      : `${Math.min((data.usage.aiRequests.current / data.usage.aiRequests.limit) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Storage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                <HardDrive className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Storage</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-semibold">
                  {formatBytes(data.usage.storage.current)} / {formatBytes(data.usage.storage.limit)}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min((data.usage.storage.current / data.usage.storage.limit) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold">Courses</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active</span>
                <span className="font-semibold">
                  {data.usage.courses.current} / {data.usage.courses.limit === -1 ? '∞' : data.usage.courses.limit}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all"
                  style={{
                    width: data.usage.courses.limit === -1 
                      ? '100%' 
                      : `${Math.min((data.usage.courses.current / data.usage.courses.limit) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <button 
            onClick={handleManageBilling}
            disabled={portalLoading || data.plan === 'FREE'}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-left hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {portalLoading ? 'Loading...' : 'Billing Portal'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {data.plan === 'FREE' ? 'Upgrade to access billing' : 'Manage subscription and invoices'}
                </p>
              </div>
            </div>
          </button>

          <button className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-left hover:shadow-lg transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Update profile and preferences</p>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
