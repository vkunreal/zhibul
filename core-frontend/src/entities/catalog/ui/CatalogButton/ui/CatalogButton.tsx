"use client";

import { Icon } from "@/shared/ui/Icon";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

export const CatalogButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCatalogClick = () => {
    if (pathname === "/katalog") {
      router.back();
    } else {
      router.push("/katalog");
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={handleCatalogClick}
      >
        <Icon name="menu" width={30} height={30} />

        <span className={styles.buttonTitle}>Каталог</span>
      </button>

      <Icon className={styles.triangle} name="treug" width={30} height={30} />
    </div>
  );
};
