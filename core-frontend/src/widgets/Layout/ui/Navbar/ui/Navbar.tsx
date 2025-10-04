import { FC } from "react";

import styles from "./styles.module.scss";
import { CatalogButton, CatalogTabs } from "@/entities/catalog";
import cn from "classnames";

export const Navbar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <div className={cn(styles.navSpacer, styles.navSpacerLeft)} />

        <section className={styles.categories}>
          <CatalogButton />
          <CatalogTabs />
        </section>

        <div className={cn(styles.navSpacer, styles.navSpacerRight)} />
      </nav>
    </div>
  );
};
