export type AssessmentLanguage = 'fr' | 'ar';
export type AssessmentDomain = 'VP' | 'RAN' | 'PA';

export type AssessmentItem = {
  id: number;
  domain: AssessmentDomain;
  title: string;
  prompt: string;
  promptAr: string;
  cue: string;
  options: { label: string; value: number }[];
};

export const assessmentDomains: Record<AssessmentDomain, { label: string; labelAr: string; detail: string; max: number; color: string }> = {
  VP: { label: 'Perception visuelle', labelAr: 'الإدراك البصري', detail: 'Formes, couleurs et mémoire visuelle', max: 20, color: 'coral' },
  RAN: { label: 'Naming rapide', labelAr: 'التسمية السريعة', detail: 'Nommer avec rapidité et fluidité', max: 9, color: 'sun' },
  PA: { label: 'Conscience phonologique', labelAr: 'الوعي الصوتي', detail: 'Jouer avec les syllabes et les sons', max: 50, color: 'lilac' },
};

export const firstAssessmentItems: AssessmentItem[] = [
  { id: 1, domain: 'VP', title: 'Associer les formes', prompt: 'Trouve la même forme.', promptAr: 'اعثر على الشكل المطابق.', cue: 'Carré bleu · cercle rouge · triangle vert · étoile jaune · cœur violet', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 2, domain: 'VP', title: 'Associer les couleurs', prompt: 'Trouve la même couleur.', promptAr: 'اعثر على اللون المطابق.', cue: 'Rouge clair · bleu cyan · vert herbe · jaune citron · orange foncé', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 3, domain: 'VP', title: 'Mémoriser les formes', prompt: 'Regarde, puis retrouve la séquence.', promptAr: 'انظر جيدًا ثم أعد ترتيب الأشكال.', cue: '5 séquences de 3 formes', options: [{ label: '5 séquences correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 4, domain: 'VP', title: 'Mémoriser les couleurs', prompt: 'Regarde, puis retrouve la séquence.', promptAr: 'انظر جيدًا ثم أعد ترتيب الألوان.', cue: '5 séquences de 3 couleurs', options: [{ label: '5 séquences correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 5, domain: 'RAN', title: 'Couleurs RAN', prompt: 'Nomme les 10 couleurs le plus vite possible.', promptAr: 'سمِّ الألوان العشرة بأسرع ما يمكن.', cue: '10 carrés · brun · rose · gris · turquoise · or', options: [{ label: 'Base 3 — sous le seuil', value: 3 }, { label: 'Base 2 — seuil intermédiaire', value: 2 }, { label: 'Base 1 ou 0 — à noter', value: 1 }] },
  { id: 6, domain: 'RAN', title: 'Formes RAN', prompt: 'Nomme les 10 formes le plus vite possible.', promptAr: 'سمِّ الأشكال العشرة بأسرع ما يمكن.', cue: 'Étoile · cœur · flèche · croix · croissant', options: [{ label: 'Base 3 — sous le seuil', value: 3 }, { label: 'Base 2 — seuil intermédiaire', value: 2 }, { label: 'Base 1 ou 0 — à noter', value: 1 }] },
  { id: 7, domain: 'RAN', title: 'Chiffres RAN', prompt: 'Nomme les 10 chiffres le plus vite possible.', promptAr: 'سمِّ الأرقام العشرة بأسرع ما يمكن.', cue: '0 · 2 · 4 · 6 · 8 · 1 · 3 · 5 · 7 · 9', options: [{ label: 'Base 3 — sous le seuil', value: 3 }, { label: 'Base 2 — seuil intermédiaire', value: 2 }, { label: 'Base 1 ou 0 — à noter', value: 1 }] },
  { id: 8, domain: 'PA', title: 'Compter les syllabes', prompt: 'Combien de syllabes entends-tu ?', promptAr: 'كم مقطعًا تسمع؟', cue: 'شمس · قمر · سيارة · تفاح · حديقة', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 9, domain: 'PA', title: 'Supprimer une syllabe', prompt: 'Dis le mot sans la syllabe demandée.', promptAr: 'قل الكلمة بدون المقطع المطلوب.', cue: 'موز → ز · ثلاجة → الجة · جزر → زر · ورقة → رقة · حمار → مار', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 10, domain: 'PA', title: 'Première syllabe', prompt: 'Identifie la première syllabe.', promptAr: 'حدد المقطع الأول.', cue: 'كرسي · طاولة · قلم · دفتر · معلم', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 11, domain: 'PA', title: 'Premier son', prompt: 'Identifie le premier son.', promptAr: 'حدد الصوت الأول.', cue: 'أسد · بطة · تمر · دجاج · سمكة', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 12, domain: 'PA', title: 'Même son initial', prompt: 'Trouve les mots qui commencent par le même son.', promptAr: 'اعثر على الكلمات التي تبدأ بالصوت نفسه.', cue: 'Jeu de mots défini par la source — contenu configurable', options: [{ label: '3 mots identifiés = 1 point', value: 1 }, { label: 'Partiel', value: 0.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 13, domain: 'PA', title: 'Dernier son', prompt: 'Identifie le dernier son.', promptAr: 'حدد الصوت الأخير.', cue: 'باب · قمر · بيت · يد · سمك', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 14, domain: 'PA', title: 'Même son final', prompt: 'Trouve les mots qui se terminent par le même son.', promptAr: 'اعثر على الكلمات التي تنتهي بالصوت نفسه.', cue: 'Jeu de mots défini par la source — contenu configurable', options: [{ label: '3 mots identifiés = 1 point', value: 1 }, { label: 'Partiel', value: 0.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 15, domain: 'PA', title: 'Compter les sons', prompt: 'Combien de sons entends-tu ?', promptAr: 'كم صوتًا تسمع؟', cue: 'دب = 2 · قط = 2 · نار = 3 · تاج = 3 · لم = 2', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 16, domain: 'PA', title: 'Supprimer un son', prompt: 'Supprime le son demandé.', promptAr: 'احذف الصوت المطلوب.', cue: 'دب → ب · قط → ط · نار → ار · تاج → اج · لم → م', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
  { id: 17, domain: 'PA', title: 'Remplacer un son', prompt: 'Remplace le son demandé.', promptAr: 'استبدل الصوت المطلوب.', cue: 'دب → قب · قط → بط · نار → دار · تاج → باج · لم → نم', options: [{ label: '5 réponses correctes', value: 5 }, { label: 'Avec aide', value: 2.5 }, { label: 'À reprendre', value: 0 }] },
];

export const categoryForItem = (id: number) => firstAssessmentItems.find((item) => item.id === id)?.domain ?? 'VP';