import { Activity, Bell, ClipboardCheck, FileText, HeartPulse, Home, Languages, Menu, Plus, Settings2, UsersRound, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/lib/i18n';

const navItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/patients', label: 'Mes patients', icon: UsersRound },
  { href: '/assessment/demo-1', label: 'Évaluations', icon: ClipboardCheck },
  { href: '/reports/demo-1', label: 'Rapports', icon: FileText },
];

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-orthonova">
      <div className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] shadow-[4px_5px_0_hsl(177_30%_20%)]">
        <span className="font-display text-[24px] leading-none">O</span>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[hsl(var(--sidebar))] bg-[hsl(var(--accent))]" />
      </div>
      {!compact && <div><p className="font-display text-lg leading-none">OrthoNova</p><p className="mt-1 text-[10px] uppercase tracking-[.2em] opacity-60">langage & lien</p></div>}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { language, toggleLanguage, isArabic } = useLanguage();
  const [mobileNav, setMobileNav] = useState(false);
  const activePath = location === '/' ? '/' : location.startsWith('/patients') ? '/patients' : location.startsWith('/assessment') ? '/assessment/demo-1' : '/reports/demo-1';
  const navigateLabel = isArabic ? 'التنقل' : 'Navigation';

  return (
    <div className="min-h-[100dvh] bg-[hsl(var(--background))]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] flex-col bg-[hsl(var(--sidebar))] px-5 py-6 text-[hsl(var(--sidebar-foreground))] lg:flex" aria-label={navigateLabel}>
        <Link href="/" className="mb-10 block rounded-xl" data-testid="link-sidebar-home"><BrandMark /></Link>
        <div className="mb-4 flex items-center justify-between px-3 text-[10px] font-semibold uppercase tracking-[.18em] opacity-45"><span>{isArabic ? 'مساحتي' : 'Mon espace'}</span><Activity size={14} /></div>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setMobileNav(false)} className={`nav-link flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold ${activePath === href ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] shadow-[inset_3px_0_0_hsl(var(--sidebar-primary))]' : 'opacity-70 hover:bg-[hsl(var(--sidebar-accent))] hover:opacity-100'}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
              <Icon size={18} strokeWidth={1.8} /><span>{isArabic ? ({ Accueil: 'الرئيسية', 'Mes patients': 'مرضاي', Évaluations: 'التقييمات', Rapports: 'التقارير' } as Record<string, string>)[label] : label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent))] p-4">
          <div className="mb-3 flex items-center gap-2 text-[hsl(var(--sidebar-primary))]"><HeartPulse size={16} /><span className="text-xs font-semibold">{isArabic ? 'جلسة آمنة' : 'Espace sécurisé'}</span></div>
          <p className="text-xs leading-5 opacity-65">{isArabic ? 'بياناتك السريرية محفوظة بعناية.' : 'Vos données cliniques restent entre de bonnes mains.'}</p>
        </div>
        <button className="mt-5 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm opacity-65 transition hover:bg-[hsl(var(--sidebar-accent))] hover:opacity-100" onClick={() => window.alert(isArabic ? 'إعدادات الحساب قريباً.' : 'Les réglages du cabinet arrivent bientôt.')} data-testid="button-settings">
          <Settings2 size={18} /><span>{isArabic ? 'الإعدادات' : 'Réglages'}</span>
        </button>
      </aside>

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-30 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/.88)] px-4 py-3 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
            <button className="grid h-11 w-11 place-items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] lg:hidden" onClick={() => setMobileNav((open) => !open)} aria-label={mobileNav ? 'Fermer le menu' : 'Ouvrir le menu'} data-testid="button-mobile-menu">{mobileNav ? <X size={19} /> : <Menu size={19} />}</button>
            <div className="hidden items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] sm:flex"><span className="h-2 w-2 rounded-full bg-[#78b9a7]" /><span>{isArabic ? 'المساحة السريرية' : 'Espace clinique'}</span><span className="opacity-40">/</span><span>{isArabic ? 'صباح الخير، ناديا' : 'Bonjour, Nadia'}</span></div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={toggleLanguage} className="touch-button flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 text-xs font-bold text-[hsl(var(--foreground))] transition hover:border-[hsl(var(--primary))]" data-testid="button-language-toggle"><Languages size={16} className="text-[hsl(var(--primary))]" /><span>{language === 'fr' ? 'FR' : 'عربي'}</span><span className="hidden text-[hsl(var(--muted-foreground))] sm:inline">· {language === 'fr' ? 'العربية' : 'Français'}</span></button>
              <button onClick={() => window.alert(isArabic ? 'لا توجد تنبيهات جديدة.' : 'Aucune nouvelle notification.')} className="relative grid h-11 w-11 place-items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition hover:border-[hsl(var(--primary))]" aria-label="Notifications" data-testid="button-notifications"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /></button>
              <div className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--primary))] text-sm font-bold text-[hsl(var(--primary-foreground))]" data-testid="avatar-clinician">NM</div>
            </div>
          </div>
        </header>
        {mobileNav && <div className="fixed inset-0 z-20 bg-[hsl(var(--sidebar))] p-5 pt-20 text-[hsl(var(--sidebar-foreground))] lg:hidden">
          <Link href="/" onClick={() => setMobileNav(false)} className="mb-9 block"><BrandMark /></Link>
          <nav className="space-y-2">{navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileNav(false)} className="flex min-h-14 items-center gap-4 rounded-xl px-4 text-base font-semibold hover:bg-[hsl(var(--sidebar-accent))]" data-testid={`link-mobile-${label}`}><Icon size={19} />{label}</Link>)}</nav>
        </div>}
        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

export function PageHeading({ eyebrow, title, detail, action }: { eyebrow: string; title: string; detail?: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-[hsl(var(--primary))]" data-testid="text-page-eyebrow">{eyebrow}</p><h1 className="font-display text-4xl tracking-[-.04em] text-[hsl(var(--foreground))] sm:text-5xl" data-testid="text-page-title">{title}</h1>{detail && <p className="mt-2 max-w-2xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">{detail}</p>}</div>{action}</div>;
}

export function EmptyState({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return <div className="card-surface clinical-grid flex min-h-[270px] flex-col items-center justify-center rounded-3xl px-6 py-12 text-center"><div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Plus size={24} /></div><h2 className="font-display text-2xl">{title}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">{detail}</p>{action && <div className="mt-6">{action}</div>}</div>;
}

export function LoadingState() {
  return <div className="space-y-4" data-testid="status-loading"><div className="h-32 animate-pulse rounded-3xl bg-[hsl(var(--muted))]" /><div className="grid gap-4 sm:grid-cols-2"><div className="h-44 animate-pulse rounded-3xl bg-[hsl(var(--muted))]" /><div className="h-44 animate-pulse rounded-3xl bg-[hsl(var(--muted))]" /></div></div>;
}

export function ErrorState({ onRetry, message = 'La connexion avec le dossier a été interrompue.' }: { onRetry?: () => void; message?: string }) {
  return <div className="card-surface rounded-3xl border-[hsl(var(--destructive)/.3)] p-8 text-center" data-testid="status-error"><p className="font-display text-2xl">Un petit contretemps</p><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{message}</p>{onRetry && <button className="mt-5 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-bold text-[hsl(var(--primary-foreground))]" onClick={onRetry} data-testid="button-retry">Réessayer</button>}</div>;
}