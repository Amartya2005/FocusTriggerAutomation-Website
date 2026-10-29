import Link from "next/link";
import { footerGroups, site } from "@/lib/site";
import { Container } from "./Container";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const { email, phone, address } = site.contact;
  const hasContactDetails = Boolean(email || phone || address);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.wordmark}>
              {site.name}
            </Link>
            <p className={styles.legalName}>{site.legalName}</p>
            <p className={styles.summary}>
              Proprietary technology products, beginning with {site.productName}, and software solutions for clients.
            </p>

            {hasContactDetails && (
              <address className={styles.contact}>
                {email && <a href={`mailto:${email}`}>{email}</a>}
                {phone && <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>}
                {address && <span>{address}</span>}
              </address>
            )}
          </div>

          <nav aria-label="Footer" className={styles.groups}>
            {footerGroups.map((group) => (
              <div key={group.heading} className={styles.group}>
                <h2 className={styles.groupHeading}>{group.heading}</h2>
                <ul role="list" className={styles.links}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.productName} is a product of {site.legalName}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
