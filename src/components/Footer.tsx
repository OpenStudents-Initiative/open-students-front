import { useIntl } from "react-intl";

export default function Footer() {
  const intl = useIntl();
  const footerText = intl.formatMessage({ id: "footerText" });

  return (
    <footer className="bg-primary fixed bottom-0 w-full h-6 flex items-center justify-center">
      <span className="text-primary-foreground text-sm">{footerText}</span>
    </footer>
  );
}
