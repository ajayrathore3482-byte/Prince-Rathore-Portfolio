import {
  Braces,
  Code2,
  Database,
  FileCode2,
  FileSpreadsheet,
  GitBranch,
  Github,
  HardDrive,
  LayoutGrid,
  Mail,
  Package,
  Palette,
  RefreshCw,
  Server,
  Workflow,
} from 'lucide-react';
import GlassCard from './GlassCard';

const ICON_MAP = {
  'file-code': FileCode2,
  palette: Palette,
  braces: Braces,
  'layout-grid': LayoutGrid,
  code: Code2,
  server: Server,
  database: Database,
  workflow: Workflow,
  refresh: RefreshCw,
  'git-branch': GitBranch,
  github: Github,
  package: Package,
  'hard-drive': HardDrive,
  spreadsheet: FileSpreadsheet,
  mail: Mail,
};

/**
 * Interactive skill category card displaying grouped technologies with icons (no fake percentages).
 */
export default function SkillCard({ category }) {
  const isViolet = category.accent === 'violet';
  const HeaderIcon = isViolet ? Server : category.id === 'tools' ? Package : Code2;

  return (
    <GlassCard interactive className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                isViolet
                  ? 'border-[#8B5CF6]/35 bg-[#8B5CF6]/12 text-[#8B5CF6]'
                  : 'border-[#398BFF]/35 bg-[#398BFF]/12 text-[#398BFF]'
              }`}
            >
              <HeaderIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">
                {category.label}
              </h3>
              <p className="text-xs text-[#A1A1AA]">{category.items.length} technologies</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">{category.description}</p>

        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {category.items.map((skill) => {
            const SkillIcon = ICON_MAP[skill.icon] || Code2;
            return (
              <li
                key={skill.name}
                className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#080A12]/70 px-3 py-2.5 text-sm font-medium text-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#398BFF]/45 hover:bg-[#101522]"
              >
                <SkillIcon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isViolet
                      ? 'text-[#8B5CF6] group-hover:text-white'
                      : 'text-[#398BFF] group-hover:text-white'
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">{skill.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </GlassCard>
  );
}

