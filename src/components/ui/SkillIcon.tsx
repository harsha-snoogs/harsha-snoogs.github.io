import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiSass,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiFlutter,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiAntdesign,
  SiRadixui,
  SiRedux,
  SiReactquery,
  SiGit,
  SiVercel,
  SiGithubactions,
  SiJira,
  SiOpenapiinitiative,
  SiSocketdotio,
  SiWeb3Dotjs,
} from 'react-icons/si';
import { FaAws, FaCode } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3: SiCss,
  SiCss,
  SiNodedotjs,
  SiSass,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiFlutter,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiAntdesign,
  SiRadixui,
  SiRedux,
  SiReactquery,
  SiGit,
  SiVisualstudiocode: FaCode,
  SiAmazonwebservices: FaAws,
  SiVercel,
  SiGithubactions,
  SiJira,
  SiOpenapiinitiative,
  SiSocketdotio,
  SiWeb3Dotjs,
};

interface SkillIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function SkillIcon({ name, className, size = 24 }: SkillIconProps) {
  const Icon = iconMap[name];

  if (!Icon) {
    return (
      <div
        className={className}
        style={{ width: size, height: size }}
      />
    );
  }

  return <Icon className={className} size={size} />;
}
