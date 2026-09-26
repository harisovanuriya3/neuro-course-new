import type { ContentBlock, Lesson } from "../content/types";
import styles from "./LessonContent.module.css";

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "subheading":
      return <h3>{block.text}</h3>;
    case "list":
      return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "callout":
      return <aside className={styles.idea}><h3>{block.title}</h3><p>{block.text}</p></aside>;
  }
}

export default function LessonContent({ lesson }: { lesson: Lesson }) {
  return (
    <article className={styles.lesson}>
      {lesson.sections.map((section) => (
        <section id={section.id} key={section.id ?? section.title}>
          <h2>{section.title}</h2>
          {section.blocks.map((block, index) => <Block key={index} block={block} />)}
        </section>
      ))}
      <section className={styles.outcomes}>
        <h2>{lesson.outcomes.title}</h2>
        <p>{lesson.outcomes.introduction}</p>
        <ul>{lesson.outcomes.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className={styles.terms}>
        <h2>{lesson.terms.title}</h2>
        <ul>{lesson.terms.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </article>
  );
}
