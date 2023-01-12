export const NormalParagraph = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <p className={`mb-2 ${className}`}>{children}</p>
);
