import { Fragment } from "react";
import styles from "./SplitWords.module.css";

type Props = {
  text: string;
};

/**
 * Text split into words for a staggered reveal. Screen readers get the
 * unsplit sentence; the visual words are hidden from them. Words stay visible
 * without JavaScript — motion only animates them in.
 */
export function SplitWords({ text }: Props) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-split>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={styles.word}>
              <span className={styles.inner} data-word>
                {word}
              </span>
            </span>
            {/* Spaces live between the boxes; inside an inline-block they collapse. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </>
  );
}
