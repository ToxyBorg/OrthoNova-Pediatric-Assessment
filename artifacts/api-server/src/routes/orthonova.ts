import { Router, type IRouter } from "express";
import {
  CreateAssessmentBody,
  CreatePatientBody,
  GetAssessmentParams,
  GetPatientParams,
  UpdateAssessmentBody,
  UpdateAssessmentParams,
  UpdatePatientBody,
  UpdatePatientParams,
} from "@workspace/api-zod";

type PatientRecord = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  school: string;
  className: string;
  guardian: string | null;
  notes: string | null;
  status: "demo" | "active" | "archived";
};

type AssessmentRecord = {
  id: string;
  patientId: string;
  patientName: string;
  assessmentName: string;
  status: "in_progress" | "completed";
  startedAt: string;
  completedAt: string | null;
  progress: number;
  totalScore: number | null;
  interpretation: string | null;
  vpScore: number | null;
  ranScore: number | null;
  paScore: number | null;
};

const patients: PatientRecord[] = [
  {
    id: "demo-lina-benali",
    firstName: "Lina",
    lastName: "Benali",
    dateOfBirth: "2021-03-18",
    school: "École Les Oliviers",
    className: "Grande section",
    guardian: "Nadia Benali",
    notes: "Dossier de démonstration",
    status: "demo",
  },
];

const assessments: AssessmentRecord[] = [
  {
    id: "demo-assessment-lina",
    patientId: "demo-lina-benali",
    patientName: "Lina Benali",
    assessmentName: "Dépistage précoce de la dyslexie",
    status: "in_progress",
    startedAt: new Date().toISOString(),
    completedAt: null,
    progress: 24,
    totalScore: null,
    interpretation: null,
    vpScore: null,
    ranScore: null,
    paScore: null,
  },
];

const router: IRouter = Router();

router.get("/patients", (_req, res) => res.json(patients));
router.post("/patients", (req, res) => {
  const data = CreatePatientBody.parse(req.body);
  const patient: PatientRecord = {
    id: crypto.randomUUID(),
    ...data,
    guardian: data.guardian ?? null,
    notes: data.notes ?? null,
    status: "active",
  };
  patients.unshift(patient);
  res.status(201).json(patient);
});
router.get("/patients/:id", (req, res) => {
  const { id } = GetPatientParams.parse(req.params);
  const patient = patients.find((entry) => entry.id === id);
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  return res.json(patient);
});
router.patch("/patients/:id", (req, res) => {
  const { id } = UpdatePatientParams.parse(req.params);
  const patient = patients.find((entry) => entry.id === id);
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  const data = UpdatePatientBody.parse(req.body);
  Object.assign(patient, data);
  return res.json(patient);
});

router.get("/assessments", (_req, res) => res.json(assessments));
router.post("/assessments", (req, res) => {
  const data = CreateAssessmentBody.parse(req.body);
  const assessment: AssessmentRecord = {
    id: crypto.randomUUID(),
    ...data,
    status: "in_progress",
    startedAt: new Date().toISOString(),
    completedAt: null,
    progress: 0,
    totalScore: null,
    interpretation: null,
    vpScore: null,
    ranScore: null,
    paScore: null,
  };
  assessments.unshift(assessment);
  res.status(201).json(assessment);
});
router.get("/assessments/:id", (req, res) => {
  const { id } = GetAssessmentParams.parse(req.params);
  const assessment = assessments.find((entry) => entry.id === id);
  if (!assessment) return res.status(404).json({ error: "Assessment not found" });
  return res.json(assessment);
});
router.patch("/assessments/:id", (req, res) => {
  const { id } = UpdateAssessmentParams.parse(req.params);
  const assessment = assessments.find((entry) => entry.id === id);
  if (!assessment) return res.status(404).json({ error: "Assessment not found" });
  const data = UpdateAssessmentBody.parse(req.body);
  Object.assign(assessment, data);
  return res.json(assessment);
});

export default router;