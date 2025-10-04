import { FC } from "react";

import styles from "./styles.module.scss";

export const RecallButton: FC = () => {
  return (
    <button type="button" className={styles.recallButton}>
      Заказать звонок
    </button>
  );
};
