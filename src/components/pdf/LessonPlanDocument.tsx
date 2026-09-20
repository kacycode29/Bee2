import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Phase, MarkingGrid } from "@/lib/fiche-pedagogique";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 9, fontFamily: "Helvetica", color: "#1e293b" },
  title: { fontSize: 15, fontWeight: 700, marginBottom: 8, textAlign: "center" },
  headerGrid: { marginBottom: 10 },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#cbd5e1",
    paddingVertical: 2,
  },
  headerLabel: { width: "35%", fontWeight: 700, color: "#475569" },
  headerValue: { width: "65%" },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#ffffff",
    backgroundColor: "#0f172a",
    padding: 4,
    marginTop: 10,
  },
  phaseTable: { borderWidth: 0.5, borderColor: "#cbd5e1" },
  stepRow: { borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", padding: 4 },
  stepHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  stepTitle: { fontWeight: 700 },
  stepTiming: { color: "#92400e" },
  colsRow: { flexDirection: "row", gap: 6 },
  col: { width: "50%" },
  colLabel: { fontSize: 7, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 1 },
  bullet: { fontSize: 8.5, lineHeight: 1.3 },
  remarks: { fontSize: 8, color: "#475569", marginTop: 2, backgroundColor: "#f8fafc", padding: 3 },
  objectivesList: { marginTop: 4 },
  gridTable: { marginTop: 10, borderWidth: 0.5, borderColor: "#cbd5e1" },
  gridRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1" },
  gridCellHead: {
    flex: 1,
    padding: 3,
    fontWeight: 700,
    backgroundColor: "#f1f5f9",
    fontSize: 8,
  },
  gridCell: { flex: 1, padding: 3, fontSize: 7.5 },
});

function HeaderRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerLabel}>{label}</Text>
      <Text style={styles.headerValue}>{value}</Text>
    </View>
  );
}

export function LessonPlanDocument({
  sessionTitle,
  unitNumber,
  unitTitle,
  lessonNumber,
  lessonTitle,
  typeOfSession,
  date,
  teacherName,
  provincialDirectorate,
  school,
  classLabel,
  boysCount,
  girlsCount,
  attendance,
  learnersWithSpecialNeeds,
  competence,
  languageMainSkill,
  lessonContentVocab,
  lessonContentGrammar,
  languageFunctions,
  objectives,
  methodsTechniques,
  teachingAids,
  durationMin,
  phases,
  activityContext,
  appreciationCriteria,
  expectedProduction,
  markingGrid,
}: {
  sessionTitle: string;
  unitNumber: string;
  unitTitle: string;
  lessonNumber: string;
  lessonTitle: string;
  typeOfSession: string;
  date: string;
  teacherName: string;
  provincialDirectorate?: string | null;
  school?: string | null;
  classLabel: string;
  boysCount?: number | null;
  girlsCount?: number | null;
  attendance?: string | null;
  learnersWithSpecialNeeds?: string | null;
  competence: string;
  languageMainSkill: string;
  lessonContentVocab?: string | null;
  lessonContentGrammar?: string | null;
  languageFunctions?: string | null;
  objectives: string[];
  methodsTechniques?: string | null;
  teachingAids?: string | null;
  durationMin: number;
  phases: Phase[];
  activityContext?: string | null;
  appreciationCriteria: string[];
  expectedProduction: string[];
  markingGrid: MarkingGrid | null;
}) {
  const sessionTypeLabel =
    typeOfSession === "LEARNING"
      ? "Learning session"
      : typeOfSession === "CONSOLIDATION"
        ? "Consolidation session"
        : "Problem-solving session (situation d'intégration)";

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>FICHE PÉDAGOGIQUE — {sessionTitle.toUpperCase()}</Text>

        <View style={styles.headerGrid}>
          <HeaderRow label="Date" value={date} />
          <HeaderRow label="Teacher's name" value={teacherName} />
          <HeaderRow label="Provincial directorate" value={provincialDirectorate} />
          <HeaderRow label="School" value={school} />
          <HeaderRow label="Class" value={classLabel} />
          <HeaderRow
            label="Class size"
            value={
              boysCount != null || girlsCount != null
                ? `Boys: ${boysCount ?? "—"}   Girls: ${girlsCount ?? "—"}`
                : undefined
            }
          />
          <HeaderRow label="Attendance" value={attendance} />
          <HeaderRow label="Learners with special needs" value={learnersWithSpecialNeeds} />
          <HeaderRow label="Competence" value={competence} />
          <HeaderRow label="Unit" value={`${unitNumber} — ${unitTitle}`} />
          <HeaderRow label="Lesson" value={`${lessonNumber} — ${lessonTitle}`} />
          <HeaderRow label="Type of session" value={sessionTypeLabel} />
          <HeaderRow label="Language main skill" value={languageMainSkill} />
          <HeaderRow label="Vocabulary" value={lessonContentVocab} />
          <HeaderRow label="Grammar" value={lessonContentGrammar} />
          <HeaderRow label="Language function(s)" value={languageFunctions} />
          <HeaderRow label="Methods / Techniques" value={methodsTechniques} />
          <HeaderRow label="Teaching aids / Materials" value={teachingAids} />
          <HeaderRow label="Duration" value={`${durationMin} mn`} />
        </View>

        {objectives.length > 0 && (
          <View style={styles.objectivesList}>
            <Text style={{ fontWeight: 700, fontSize: 9 }}>Objectives</Text>
            {objectives.map((o, i) => (
              <Text key={i} style={styles.bullet}>
                • {o}
              </Text>
            ))}
          </View>
        )}

        {activityContext && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: 700, fontSize: 9 }}>Activity context</Text>
            <Text style={styles.bullet}>{activityContext}</Text>
            {appreciationCriteria.length > 0 && (
              <>
                <Text style={{ fontWeight: 700, fontSize: 9, marginTop: 4 }}>
                  Appreciation criteria
                </Text>
                {appreciationCriteria.map((c, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {c}
                  </Text>
                ))}
              </>
            )}
            {expectedProduction.length > 0 && (
              <>
                <Text style={{ fontWeight: 700, fontSize: 9, marginTop: 4 }}>
                  Expected production
                </Text>
                {expectedProduction.map((p, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {p}
                  </Text>
                ))}
              </>
            )}
          </View>
        )}

        {phases.map((phase, i) => (
          <View key={i} wrap={false}>
            <Text style={styles.sectionTitle}>{phase.name}</Text>
            <View style={styles.phaseTable}>
              {phase.steps.map((step, j) => (
                <View key={j} style={styles.stepRow}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepTiming}>{step.timingMin} mn</Text>
                  </View>
                  <View style={styles.colsRow}>
                    {step.teacherActivities.length > 0 && (
                      <View style={styles.col}>
                        <Text style={styles.colLabel}>Teacher&apos;s activities</Text>
                        {step.teacherActivities.map((a, k) => (
                          <Text key={k} style={styles.bullet}>
                            • {a}
                          </Text>
                        ))}
                      </View>
                    )}
                    {step.learnerActivities.length > 0 && (
                      <View style={styles.col}>
                        <Text style={styles.colLabel}>Learner&apos;s activities</Text>
                        {step.learnerActivities.map((a, k) => (
                          <Text key={k} style={styles.bullet}>
                            • {a}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                  {step.remarks && <Text style={styles.remarks}>{step.remarks}</Text>}
                </View>
              ))}
            </View>
          </View>
        ))}

        {markingGrid && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Grille de correction critériée</Text>
            <View style={styles.gridTable}>
              <View style={styles.gridRow}>
                <Text style={styles.gridCellHead}>Instruction</Text>
                <Text style={styles.gridCellHead}>Pertinence</Text>
                <Text style={styles.gridCellHead}>Language accuracy</Text>
                <Text style={styles.gridCellHead}>Coherence</Text>
              </View>
              {markingGrid.rows.map((row, i) => (
                <View key={i} style={styles.gridRow}>
                  <Text style={styles.gridCell}>{row.instruction}</Text>
                  <Text style={styles.gridCell}>
                    {row.pertinence.map((p) => `${p.indicator} (${p.points}pt)`).join("\n")}
                  </Text>
                  <Text style={styles.gridCell}>
                    {row.languageAccuracy.map((p) => `${p.indicator} (${p.points}pt)`).join("\n")}
                  </Text>
                  <Text style={styles.gridCell}>
                    {row.coherence.map((p) => `${p.indicator} (${p.points}pt)`).join("\n")}
                  </Text>
                </View>
              ))}
              <View style={styles.gridRow}>
                <Text style={[styles.gridCell, { fontWeight: 700 }]}>Total</Text>
                <Text style={[styles.gridCell, { fontWeight: 700 }]}>
                  {markingGrid.totals.pertinence} pts
                </Text>
                <Text style={[styles.gridCell, { fontWeight: 700 }]}>
                  {markingGrid.totals.languageAccuracy} pts
                </Text>
                <Text style={[styles.gridCell, { fontWeight: 700 }]}>
                  {markingGrid.totals.coherence} pts
                </Text>
              </View>
              <View style={styles.gridRow}>
                <Text style={[styles.gridCell, { fontWeight: 700 }]}>Refinement</Text>
                <Text style={[styles.gridCell, { fontWeight: 700 }]} >
                  {markingGrid.totals.refinement} pts
                </Text>
                <Text style={[styles.gridCell, { fontWeight: 700 }]}>—</Text>
                <Text style={[styles.gridCell, { fontWeight: 700 }]}>
                  Total: {markingGrid.totals.grand} pts
                </Text>
              </View>
            </View>
          </View>
        )}

        <Text
          style={{ position: "absolute", bottom: 16, left: 32, right: 32, fontSize: 7, color: "#94a3b8", textAlign: "center" }}
          fixed
        >
          Généré avec Bee2 — canevas APC/PI, programme officiel du post-primaire (Burkina Faso)
        </Text>
      </Page>
    </Document>
  );
}
