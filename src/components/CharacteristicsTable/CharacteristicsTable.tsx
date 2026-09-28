import type { Characteristic } from "@/content/profile";
import styles from "./CharacteristicsTable.module.css";

type Props = {
  rows: Characteristic[];
};

export function CharacteristicsTable({ rows }: Props) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Parameter</th>
            <th scope="col">Conditions</th>
            <th scope="col" className={styles.val}>
              Value
            </th>
            <th scope="col">Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.parameter}>
              <td>{row.parameter}</td>
              <td className={styles.cond}>{row.conditions}</td>
              <td className={styles.val}>{row.value}</td>
              <td className={styles.unit}>{row.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
