"use client";
import { FareCategories, Subcategory } from "@/types/types";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./FareCategoryCard.module.scss";
import storage from "@/lib/storage";

interface FareCategoryCardProps {
  fareCategory: Subcategory;
  promoCode: boolean;
  handlePayment: (price: number) => void;
}
const FareCategoryCard = ({
  fareCategory,
  promoCode,
  handlePayment,
}: FareCategoryCardProps) => {
  const price =
    promoCode && fareCategory.brandCode === "ecoFly"
      ? fareCategory.price.amount / 2
      : fareCategory.price.amount;
  return (
    <div className={styles.fareCategoryCard}>
      <div className={styles.header}>
        <span className={styles.brand}>{fareCategory.brandCode}</span>
        <span>
          <span className={styles.currency}>{fareCategory.price.currency}</span>
          <span>{price}</span>
        </span>
      </div>
      <div className={styles.rights}>
        {fareCategory.rights.map((right) => (
          <span key={right} className={styles.right}>
            {right}
          </span>
        ))}
      </div>
      <Button
        size={styles.buttonWidth}
        onClick={() => handlePayment(price)}
        text="Uçuşu Seç"
        disabled={fareCategory.brandCode !== "ecoFly" && promoCode}
      />
    </div>
  );
};

export default FareCategoryCard;
