import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ClozeItem } from "@/lib/text-engine";
import type { VocabEntry, TrueFalseEntry } from "@/lib/exercises";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#1e293b" },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 10, color: "#64748b", marginBottom: 16 },
  body: { lineHeight: 1.5, marginBottom: 16, textAlign: "justify" },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    color: "#92400e",
    textTransform: "uppercase",
  },
  bullet: { marginBottom: 4, lineHeight: 1.4 },
  checkboxRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  nameLine: { fontSize: 10, color: "#64748b", marginBottom: 20 },
});

export function TextWorksheetDocument({
  title,
  level,
  theme,
  body,
  vocabulary,
  trueFalse,
  questions,
  cloze,
}: {
  title: string;
  level: string;
  theme: string;
  body: string;
  vocabulary: VocabEntry[];
  trueFalse: TrueFalseEntry[];
  questions: string[];
  cloze: ClozeItem[];
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Niveau {level} · Thème : {theme}
        </Text>
        <Text style={styles.nameLine}>Nom : ______________________  Classe : __________</Text>

        <Text style={styles.body}>{body}</Text>

        {vocabulary.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vocabulaire</Text>
            {vocabulary.map((v, i) => (
              <Text key={i} style={styles.bullet}>
                • {v.word}: ____________________________
              </Text>
            ))}
          </View>
        )}

        {trueFalse.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vrai ou faux</Text>
            {trueFalse.map((t, i) => (
              <View key={i} style={styles.checkboxRow}>
                <Text>{t.statement}</Text>
                <Text>☐ Vrai   ☐ Faux</Text>
              </View>
            ))}
          </View>
        )}

        {questions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Questions</Text>
            {questions.map((q, i) => (
              <Text key={i} style={styles.bullet}>
                {i + 1}. {q}
              </Text>
            ))}
          </View>
        )}

        {cloze.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Texte à trous</Text>
            {cloze.map((c, i) => (
              <Text key={i} style={styles.bullet}>
                {i + 1}. {c.blanked}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
