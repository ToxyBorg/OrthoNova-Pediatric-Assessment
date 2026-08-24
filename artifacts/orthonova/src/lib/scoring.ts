import { assessmentDomains, firstAssessmentItems, type AssessmentDomain } from '@/data/assessment-content';

export type ScoreMap = Record<number, number>;

export const scoreAssessment = (scores: ScoreMap) => {
  const domainScores = (Object.keys(assessmentDomains) as AssessmentDomain[]).reduce((acc, domain) => {
    acc[domain] = firstAssessmentItems
      .filter((item) => item.domain === domain)
      .reduce((total, item) => total + (scores[item.id] ?? 0), 0);
    return acc;
  }, {} as Record<AssessmentDomain, number>);

  const vp = domainScores.VP;
  const ranRaw = Math.max(0, Math.min(9, domainScores.RAN));
  const pa = domainScores.PA;
  const total = vp + ranRaw / 1.8 + pa / 5;
  const max = 20;
  const completion = Math.round((Object.keys(scores).length / firstAssessmentItems.length) * 100);
  const interpretation = total >= 18 ? 'Excellent' : total >= 15 ? 'Très bon' : total >= 12 ? 'Bon' : total >= 9 ? 'Modéré' : total >= 6 ? 'Faible' : 'Très faible';
  const recommendation = total >= 18
    ? 'Aucun indicateur préoccupant. Un suivi périodique annuel est recommandé.'
    : total >= 15
      ? 'Très peu d’indicateurs. Un suivi tous les 6 mois est recommandé.'
      : total >= 12
        ? 'Quelques indicateurs légers. Un suivi tous les 3 mois avec soutien complémentaire est recommandé.'
        : total >= 9
          ? 'Indicateurs modérés. Une intervention précoce et un suivi mensuel sont recommandés.'
          : total >= 6
            ? 'Indicateurs importants. Une intervention immédiate et un suivi hebdomadaire sont nécessaires.'
            : 'Indicateurs très importants. Une évaluation complète et une orientation immédiate sont nécessaires.';

  return { domainScores: { VP: vp, RAN: ranRaw, PA: pa }, normalized: { RAN: ranRaw / 1.8, PA: pa / 5 }, total, max, completion, interpretation, recommendation };
};

export const sectionLabel = (domain: AssessmentDomain) => assessmentDomains[domain].label;