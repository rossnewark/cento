import { Building2, Users2, LineChart } from 'lucide-react';

export interface Service {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  details: string;
}

const services: Service[] = [
  {
    title: 'Business Strategy',
    icon: Building2,
    description: 'Develop comprehensive strategies to drive your business forward.',
    details: 'Our strategic planning process involves market analysis, competitive positioning, and growth strategy development. We help you identify opportunities and create actionable plans for success.'
  },
  {
    title: 'Management Consulting',
    icon: Users2,
    description: 'Optimize your operations and improve organizational effectiveness.',
    details: 'From organizational restructuring to process optimization, we provide expert guidance to enhance your management systems and team performance.'
  },
  {
    title: 'Performance Analysis',
    icon: LineChart,
    description: 'Data-driven insights to enhance business performance.',
    details: 'Using advanced analytics and industry benchmarks, we help you measure, analyze, and improve key performance indicators across your organization.'
  }
];

export default services;