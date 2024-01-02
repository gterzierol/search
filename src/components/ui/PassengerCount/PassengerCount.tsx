import React, { useState } from "react";
import styles from "./PassengerCount.module.scss";
import { Man } from "@mui/icons-material";
interface PassengerCountProps {
  count: number;
  setCount: (value: number) => void;
  getCabinType: (value: string) => void;
}
const PassengerCount = ({
  count = 1,
  setCount,
  getCabinType,
}: PassengerCountProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const handleCounterChange = (operant: "+" | "-") => {
    operant === "+" ? setCount(count + 1) : count > 1 && setCount(count - 1);
  };
  const handleCabinSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.cabin;
    value && getCabinType(value);
  };

  const renderClassAndPassengerPicker = () => {
    return (
      <div className={styles.picker}>
        <p>Kabin ve Yolcu Seçimi</p>
        <div className={styles.cabinSelection}>
          <span>
            <input
              id="economy"
              type="radio"
              name="cabin"
              onChange={handleCabinSelection}
              data-cabin="economy"
            />
            <label htmlFor="economy">economy</label>
          </span>
          <span>
            <input
              id="business"
              type="radio"
              name="cabin"
              onChange={handleCabinSelection}
              data-cabin="business"
            />
            <label htmlFor="business">business</label>
          </span>
        </div>
        <div className={styles.counter}>
          <p>Yolcu</p>
          <div className={styles.counter}>
            <div
              onClick={() => handleCounterChange("-")}
              className={styles.operator}
            >
              -
            </div>
            <div>{count}</div>
            <div
              onClick={() => handleCounterChange("+")}
              className={styles.operator}
            >
              +
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={styles.passengerCount}
      onClick={(e) => {
        !showPicker && setShowPicker(!showPicker);
      }}
    >
      <div className={styles.body}>
        <span>{count}</span>
        <div className={styles.icons}>
          {Array.from(
            { length: count },
            (_, i) => i < 3 && <Man className={styles.icon} key={i} />
          )}
          {count > 3 && <span>+</span>}
        </div>
      </div>
      {showPicker && renderClassAndPassengerPicker()}
    </div>
  );
};

export default PassengerCount;
