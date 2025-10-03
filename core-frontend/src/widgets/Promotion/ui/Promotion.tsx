import { FC } from "react";

import styles from "./styles.module.scss";
import { PROMO_BLOCKS } from "../utils";
import { Icon } from "@/shared/ui/Icon";

export const Promotion: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.promotion}>
        {PROMO_BLOCKS.map(({ icon, variable, postfix }, i) => (
          <div className={styles.promotionBlock} key={i}>
            <Icon name={icon} width={36} height={36} />
            <h4 className={styles.title}>{variable}</h4>
            <p className={styles.postfix}>{postfix}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
