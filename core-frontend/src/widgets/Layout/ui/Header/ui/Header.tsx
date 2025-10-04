import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { RecallButton } from "@/entities/ui/RecallButton";
import { Icon } from "@/shared/ui";

import { HeaderProps } from "../interfaces";
import styles from "./styles.module.scss";

export const Header: FC<HeaderProps> = ({ variables }) => {
  const variableValue = (name: string) =>
    variables.find((v) => v.name === name)?.value ?? "";

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image width={140} height={57} src="/logo.avif" alt="Logo" />
        </Link>

        <div className={styles.block}>
          <Icon name="phone" width={25} height={25} />

          <div className={styles.phoneList}>
            <a
              className={styles.blockText}
              href={`tel:${variableValue("phone_sales")}`}
            >
              {variableValue("phone_sales")}
            </a>
            <a
              className={styles.blockText}
              href={`tel:${variableValue("phone_services")}`}
            >
              {variableValue("phone_services")}
            </a>
          </div>
        </div>

        <div className={styles.block}>
          <Icon name="email" width={30} height={30} />

          <a
            className={styles.blockText}
            href={`mailto:${variableValue("email")}`}
          >
            {variableValue("email")}
          </a>
        </div>

        <RecallButton />
      </header>
    </div>
  );
};
