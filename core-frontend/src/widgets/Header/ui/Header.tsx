import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { RecallButton } from "@/entities/RecallButton";
import { Icon } from "@/shared/ui/Icon";

import styles from "./styles.module.scss";

export const Header: FC = () => {
  const email = "sale@zhbl.by",
    phone_sales = "+375 (29) 741-52-26",
    phone_services = "+375 (44) 758-16-43";

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image width={140} height={57} src="/logo.avif" alt="Logo" />
        </Link>

        <div className={styles.block}>
          <Icon name="phone" width={25} height={25} />

          <div className={styles.phoneList}>
            <a className={styles.blockText} href={`tel:${phone_sales}`}>
              {phone_sales}
            </a>
            <a className={styles.blockText} href={`tel:${phone_services}`}>
              {phone_services}
            </a>
          </div>
        </div>

        <div className={styles.block}>
          <Icon name="email" width={30} height={30} />

          <a className={styles.blockText} href={`mailto:${email}`}>
            {email}
          </a>
        </div>

        <RecallButton />
      </header>
    </div>
  );
};
