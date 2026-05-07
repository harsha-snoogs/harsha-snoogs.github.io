import {
  FaBriefcase,
  FaUsers,
  FaCodeBranch,
  FaRocket,
  FaCode,
  FaUserGraduate,
  FaChartLine,
  FaCheckCircle,
  FaSitemap,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  FaBriefcase,
  FaUsers,
  FaCodeBranch,
  FaRocket,
  FaCode,
  FaUserGraduate,
  FaChartLine,
  FaCheckCircle,
  FaSitemap,
};

interface StatIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function StatIcon({ name, className, size = 24 }: StatIconProps) {
  const Icon = iconMap[name];

  if (!Icon) {
    return <FaRocket className={className} size={size} />;
  }

  return <Icon className={className} size={size} />;
}
