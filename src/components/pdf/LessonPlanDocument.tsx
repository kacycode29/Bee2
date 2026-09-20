import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ActivityStep, VocabCandidate } from "@/lib/text-engine";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#1e293b" },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 10, color: "#64748b", marginBottom: 16 },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    color: "#92400e",
    textTransform: "uppercase",
  },
  bullet: { marginBottom: 3, lineHeight: 1.4 },
  activityRow: {
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#f59e0b",
  },
  activityHeader: { flexDirection: "row", justifyContent: "space-between" },
  activityTitle: { fontWeight: 700 },
  activityMinutes: { color: "#64748b" },
  activityDesc: { marginTop: 2, color: "#334155", lineHeight: 1.4 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#94a3b8",
    textAlign: "center",
  },
});

export function LessonPlanDocument({
  title,
  level,
  durationMin,
  textTitle,
  objectives,
  warmup,
  vocabulary,
  activities,
  assessment,
}: {
  title: string;
  level: string;
  durationMin: number;
  textTitle: string;
  objectives: string[];
  warmup: string;
  vocabulary: VocabCandidate[];
  activities: ActivityStep[];
  assessment: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Niveau {level} · {durationMin} minutes · Texte support : {textTitle}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objectifs</Text>
          {objectives.map((o, i) => (
            <Text key={i} style={styles.bullet}>
              • {o}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mise en route</Text>
          <Text style={styles.bullet}>{warmup}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulaire ciblé</Text>
          {vocabulary.map((v, i) => (
            <Text key={i} style={styles.bullet}>
              • {v.word} — « {v.sentence} »
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Déroulé de la séance</Text>
          {activities.map((a, i) => (
            <View key={i} style={styles.activityRow}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>{a.title}</Text>
                <Text style={styles.activityMinutes}>{a.minutes} min</Text>
              </View>
              <Text style={styles.activityDesc}>{a.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Évaluation</Text>
          <Text style={styles.bullet}>{assessment}</Text>
        </View>

        <Text style={styles.footer} fixed>
          Généré avec Bee2 — bee2.app
        </Text>
      </Page>
    </Document>
  );
}
