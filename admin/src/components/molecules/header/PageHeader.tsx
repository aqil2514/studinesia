interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
