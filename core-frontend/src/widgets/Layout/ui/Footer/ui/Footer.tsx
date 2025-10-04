import { FC } from "react";
import { RecallButton } from "@/entities/ui/RecallButton";
import { Icon } from "@/shared/ui";

import { FooterProps } from "../interfaces";
import styles from "./styles.module.scss";

const socialNetworks = ["tg", "vk", "inst", "youtube", "dzen"];

export const Footer: FC<FooterProps> = ({ variables }) => {
  const variableValue = (name: string) =>
    variables.find((v) => v.name === name)?.value ?? "";

  return (
    <footer className={styles.wrapper}>
      <div className={styles.footer}>
        <div className={styles.contacts}>
          <a
            className={styles.contact}
            href={`tel:${variableValue("phone_sales")}`}
          >
            <Icon name="phone" width={35} height={35} />

            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Звонок</h3>
              <p className={styles.contactText}>
                {variableValue("phone_sales")}
              </p>
            </div>
          </a>
          <a
            className={styles.contact}
            href={`mailto:${variableValue("email")}`}
          >
            <Icon name="email" width={40} height={40} />

            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Электронная почта</h3>
              <p className={styles.contactText}>{variableValue("email")}</p>
            </div>
          </a>
        </div>

        <div className={styles.sections}>
          <ul className={styles.socialNetworks}>
            {socialNetworks.map(
              (network) =>
                variableValue(network) && (
                  <li key={network} className={styles.socialNetwork}>
                    <a href={variableValue(network)} target="_blank">
                      <Icon name={network} width={30} height={30} />
                    </a>
                  </li>
                )
            )}
          </ul>

          <div className={styles.recallButton}>
            <RecallButton />
          </div>
        </div>

        <p className={styles.copyright}>© 2025 ZHBL</p>
      </div>
    </footer>
  );
};
