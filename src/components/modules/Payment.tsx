"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Border from "../ui/Border/Border";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import styles from "./Payment.module.scss";
import Button from "../ui/Button/Button";

const Payment = () => {
  const params = useSearchParams();
  const searchData = {
    passenger: params.get("passenger"),
    price: params.get("price"),
    status: params.get("status"),
  };
  const status = searchData.status === "available";
  const router = useRouter();

  return (
    <div className={styles.payment}>
      <div className={styles.status}>
        {status ? (
          <CheckCircleRoundedIcon color="success" />
        ) : (
          <CancelRoundedIcon color="error" />
        )}
        <div>{`Kabin seçiminiz ${
          status ? "tamamlandı" : "tamamlanamadı"
        }`}</div>
      </div>
      <Border />
      {status ? (
        <div className={styles.total}>
          <span>toplam Tutar</span>
          <span>TRY {searchData.price}</span>
        </div>
      ) : (
        <div className={styles.turnBack}>
          <Button
            text="Başa Dön"
            onClick={() => {
              router.push("/");
            }}
            size={styles.buttonWidth}
          />
        </div>
      )}
    </div>
  );
};

export default Payment;
