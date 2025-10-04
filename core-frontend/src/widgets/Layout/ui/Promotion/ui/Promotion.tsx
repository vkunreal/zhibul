import { FC } from "react";

import styles from "./styles.module.scss";
import { PROMO_BLOCKS } from "../utils";
import { Icon } from "@/shared/ui";
import { getVariables } from "@/shared/api";

export const Promotion: FC = async () => {
  const variables = await getVariables();

  const variableValue = (name: string) =>
    variables.find((v) => v.name === name)?.value ?? "";

  return (
    <div className={styles.wrapper}>
      <div className={styles.promotion}>
        {PROMO_BLOCKS.map(({ icon, variable, postfix }, i) => (
          <div className={styles.promotionBlock} key={i}>
            <Icon name={icon} width={36} height={36} />
            <h2 className={styles.title}>{variableValue(variable)}</h2>
            <p className={styles.postfix}>{postfix}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
