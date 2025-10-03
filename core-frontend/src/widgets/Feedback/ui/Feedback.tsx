import { FC } from "react";

import styles from "./styles.module.scss";

export const Feedback: FC = () => {
  return (
    <section className={styles.feedback}>
      <div>
        <h4>Есть вопросы или необходима консультация?</h4>
        <p>
          Заполните форму и наш специалист ответит на все возникшие вопросы!
        </p>
      </div>
    </section>
  );
};
