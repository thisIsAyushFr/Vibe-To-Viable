/**
 * AI Patient Brief templates.
 *
 * Each template represents one medically coherent consultation brief: the
 * summary, medications, risk highlight, key clinical info and attention note
 * all describe the SAME condition, so a generated brief always reads as a
 * realistic, internally consistent clinical snapshot rather than a random
 * mix of unrelated facts.
 *
 * Shape of a template:
 *   {
 *     id: string,
 *     summary: string,
 *     medications: { name: string, frequency: string }[],
 *     risk: { title: string, value: string, note: string },
 *     keyInfo: string[],
 *     attention: string,
 *   }
 */
export const AI_BRIEF_TEMPLATES = [
  {
    id: 'hypertension-followup',
    summary:
      "45-year-old patient returning for hypertension follow-up. BP was elevated during the previous visit. Currently taking Amlodipine. Blood pressure trend remains above target range.",
    medications: [
      { name: 'Amlodipine 5mg', frequency: 'Once Daily' },
      { name: 'Hydrochlorothiazide 12.5mg', frequency: 'Once Daily' },
    ],
    risk: {
      title: 'Uncontrolled BP Trend',
      value: '148/92 mmHg',
      note: 'Blood pressure remains above target (130/80 mmHg). Consider dose escalation or add-on therapy.',
    },
    keyInfo: [
      'Hypertension — diagnosed 2019',
      'Current medication: Amlodipine 5mg',
      'Last BP: 148/92 mmHg',
      'No history of stroke or MI',
      'Sodium-restricted diet advised',
    ],
    attention: 'Blood pressure remained elevated during the previous visit.',
  },
  {
    id: 'type2-diabetes-followup',
    summary:
      "52-year-old patient with Type 2 Diabetes Mellitus presenting for routine glycemic follow-up. Reports good medication adherence with mild fatigue.",
    medications: [
      { name: 'Metformin 500mg', frequency: 'Twice Daily' },
      { name: 'Glimepiride 2mg', frequency: 'Once Daily (Morning)' },
    ],
    risk: {
      title: 'Suboptimal Glycemic Control',
      value: 'HbA1c 7.8%',
      note: 'HbA1c remains above target (<7.0%). Consider intensifying therapy and reinforcing dietary counseling.',
    },
    keyInfo: [
      'Type 2 Diabetes — diagnosed 2021',
      'Recent HbA1c: 7.8%',
      'Fasting glucose: 148 mg/dL',
      'No diabetic retinopathy on last screening',
      'Annual foot exam due',
    ],
    attention: 'HbA1c trending upward over the last two visits.',
  },
  {
    id: 'asthma-review',
    summary:
      "29-year-old patient with moderate persistent asthma returning for routine review. Reports occasional nocturnal cough, no recent ER visits.",
    medications: [
      { name: 'Budesonide/Formoterol 160/4.5mcg', frequency: 'Twice Daily' },
      { name: 'Salbutamol Inhaler', frequency: 'As Needed (PRN)' },
    ],
    risk: {
      title: 'Increased Reliever Use',
      value: '4x / week',
      note: 'Rescue inhaler use exceeds twice-weekly threshold, suggesting suboptimal control. Consider step-up therapy.',
    },
    keyInfo: [
      'Asthma — diagnosed in childhood',
      'Triggers: dust, cold air',
      'Peak flow: 78% of personal best',
      'No recent hospitalization',
      'Inhaler technique reviewed last visit',
    ],
    attention: 'Reliever inhaler use has increased over the past month.',
  },
  {
    id: 'copd-followup',
    summary:
      "64-year-old patient with COPD (GOLD Stage II) presenting for routine follow-up. Reports stable breathlessness on exertion, ex-smoker (quit 2018).",
    medications: [
      { name: 'Tiotropium Bromide 18mcg', frequency: 'Once Daily' },
      { name: 'Formoterol Inhaler', frequency: 'Twice Daily' },
    ],
    risk: {
      title: 'Declining Exercise Tolerance',
      value: 'SpO2 92% on exertion',
      note: 'Mild desaturation on exertion noted. Consider pulmonary function retest and pulmonary rehabilitation referral.',
    },
    keyInfo: [
      'COPD — diagnosed 2020, GOLD Stage II',
      'Ex-smoker, quit 2018 (30 pack-year history)',
      'Last spirometry: FEV1 62% predicted',
      'Annual influenza vaccination up to date',
      'No exacerbations in past 6 months',
    ],
    attention: 'Mild oxygen desaturation observed on exertion.',
  },
  {
    id: 'hypothyroidism-followup',
    summary:
      "38-year-old female with primary hypothyroidism returning for thyroid function follow-up. Reports mild fatigue, otherwise asymptomatic.",
    medications: [
      { name: 'Levothyroxine 75mcg', frequency: 'Once Daily (Empty Stomach)' },
    ],
    risk: {
      title: 'Subclinical Undertreatment',
      value: 'TSH 6.8 mIU/L',
      note: 'TSH remains above target range (0.4–4.0 mIU/L). Consider levothyroxine dose adjustment.',
    },
    keyInfo: [
      'Hypothyroidism — diagnosed 2020',
      'Recent TSH: 6.8 mIU/L',
      'Free T4: within low-normal range',
      'No palpable goiter',
      'Compliant with morning dosing schedule',
    ],
    attention: 'TSH remains above target despite current dose.',
  },
  {
    id: 'hyperthyroidism-followup',
    summary:
      "33-year-old female with Graves' disease on antithyroid therapy, returning for routine monitoring. Reports resolution of earlier palpitations.",
    medications: [
      { name: 'Methimazole 10mg', frequency: 'Once Daily' },
      { name: 'Propranolol 20mg', frequency: 'Twice Daily (As Needed for Symptoms)' },
    ],
    risk: {
      title: 'Improving Thyroid Function',
      value: 'TSH 0.9 mIU/L',
      note: 'Thyroid function trending toward normalization. Continue current dose with repeat panel in 6 weeks.',
    },
    keyInfo: [
      "Graves' disease — diagnosed 2022",
      'Recent TSH: 0.9 mIU/L',
      'Free T4 trending down toward normal',
      'No ophthalmopathy noted',
      'Liver function monitored periodically on methimazole',
    ],
    attention: 'Continue monitoring liver function while on methimazole.',
  },
  {
    id: 'post-mi-cardiac-followup',
    summary:
      "58-year-old male, 6 weeks post-myocardial infarction, presenting for cardiac follow-up. Reports good exercise tolerance, no chest pain or dyspnea.",
    medications: [
      { name: 'Aspirin 75mg', frequency: 'Once Daily' },
      { name: 'Atorvastatin 40mg', frequency: 'Once Daily (Night)' },
      { name: 'Metoprolol Succinate 25mg', frequency: 'Once Daily' },
    ],
    risk: {
      title: 'Post-MI Risk Monitoring',
      value: 'LDL 98 mg/dL',
      note: 'LDL slightly above post-MI target (<70 mg/dL). Consider statin dose optimization.',
    },
    keyInfo: [
      'STEMI — 6 weeks post-PCI',
      'LDL cholesterol: 98 mg/dL',
      'Ejection fraction: 50% on recent echo',
      'Cardiac rehabilitation in progress',
      'No recurrent chest pain reported',
    ],
    attention: 'LDL remains above the recommended post-MI target.',
  },
  {
    id: 'atrial-fibrillation-followup',
    summary:
      "70-year-old patient with paroxysmal atrial fibrillation returning for anticoagulation and rate control review.",
    medications: [
      { name: 'Apixaban 5mg', frequency: 'Twice Daily' },
      { name: 'Bisoprolol 5mg', frequency: 'Once Daily' },
    ],
    risk: {
      title: 'Stroke Risk (CHA2DS2-VASc)',
      value: 'Score: 4',
      note: 'Elevated stroke risk score confirms continued need for anticoagulation. Reinforce adherence.',
    },
    keyInfo: [
      'Atrial fibrillation — diagnosed 2021',
      'CHA2DS2-VASc score: 4',
      'Heart rate well controlled at rest',
      'No bleeding events reported',
      'Renal function stable for apixaban dosing',
    ],
    attention: 'Confirm continued anticoagulation adherence given elevated stroke risk.',
  },
  {
    id: 'post-op-knee-replacement',
    summary:
      "61-year-old female, 2 weeks post-total knee replacement, presenting for surgical follow-up. Reports improving mobility with physiotherapy.",
    medications: [
      { name: 'Paracetamol 650mg', frequency: 'Thrice Daily' },
      { name: 'Rivaroxaban 10mg', frequency: 'Once Daily (DVT Prophylaxis)' },
    ],
    risk: {
      title: 'Post-Op Wound Monitoring',
      value: 'Mild swelling noted',
      note: 'Mild incisional swelling without erythema or discharge. Continue monitoring for signs of infection or DVT.',
    },
    keyInfo: [
      'Total knee replacement — POD 14',
      'Wound healing well, sutures removed',
      'Physiotherapy in progress',
      'No fever or calf tenderness',
      'Weight-bearing as tolerated',
    ],
    attention: 'Continue DVT prophylaxis and monitor wound for infection.',
  },
  {
    id: 'post-op-cardiac-bypass',
    summary:
      "66-year-old male, 4 weeks post-CABG, returning for surgical and cardiac follow-up. Reports gradual improvement in energy levels.",
    medications: [
      { name: 'Aspirin 75mg', frequency: 'Once Daily' },
      { name: 'Atorvastatin 40mg', frequency: 'Once Daily (Night)' },
      { name: 'Furosemide 20mg', frequency: 'Once Daily' },
    ],
    risk: {
      title: 'Fluid Status Monitoring',
      value: 'Mild pedal edema',
      note: 'Mild bilateral ankle edema noted, likely post-surgical. Monitor weight and adjust diuretic if needed.',
    },
    keyInfo: [
      'CABG (triple vessel) — 4 weeks post-op',
      'Sternal wound healing well',
      'Cardiac rehabilitation initiated',
      'No arrhythmia on recent ECG',
      'Daily weight monitoring advised',
    ],
    attention: 'Monitor for fluid retention and sternal wound healing.',
  },
  {
    id: 'post-op-appendectomy',
    summary:
      "24-year-old male, 1 week post-laparoscopic appendectomy, returning for routine surgical follow-up. Reports minimal pain, resumed normal diet.",
    medications: [
      { name: 'Amoxicillin-Clavulanate 625mg', frequency: 'Twice Daily (5-day course)' },
      { name: 'Paracetamol 500mg', frequency: 'As Needed' },
    ],
    risk: {
      title: 'Surgical Site Recovery',
      value: 'Healing well',
      note: 'Port site incisions clean and dry with no signs of infection. Continue routine wound care.',
    },
    keyInfo: [
      'Laparoscopic appendectomy — POD 7',
      'No fever or wound discharge',
      'Bowel function normalized',
      'Cleared for light activity',
      'Dissolvable sutures — no removal needed',
    ],
    attention: 'No current concerns; routine recovery check advised in 1 week.',
  },
  {
    id: 'urinary-tract-infection',
    summary:
      "34-year-old female presenting with dysuria and urinary frequency for 3 days, consistent with an uncomplicated urinary tract infection.",
    medications: [
      { name: 'Nitrofurantoin 100mg', frequency: 'Twice Daily (5-day course)' },
      { name: 'Phenazopyridine 100mg', frequency: 'As Needed for Dysuria' },
    ],
    risk: {
      title: 'Recurrent UTI Pattern',
      value: '3rd episode in 12 months',
      note: 'Recurrent UTIs noted. Consider urine culture and evaluation for underlying predisposing factors.',
    },
    keyInfo: [
      'Uncomplicated UTI — symptom onset 3 days ago',
      'Urinalysis positive for leukocyte esterase and nitrites',
      'No flank pain or fever (rules out pyelonephritis)',
      'Adequate hydration advised',
      'Urine culture sent for sensitivity',
    ],
    attention: 'Recurrent infections warrant further urological evaluation.',
  },
  {
    id: 'upper-respiratory-infection',
    summary:
      "27-year-old patient presenting with sore throat, nasal congestion, and low-grade fever for 2 days, consistent with a viral upper respiratory infection.",
    medications: [
      { name: 'Paracetamol 500mg', frequency: 'Thrice Daily as Needed' },
      { name: 'Cetirizine 10mg', frequency: 'Once Daily (Night)' },
    ],
    risk: {
      title: 'Symptom Monitoring',
      value: 'Temp 99.8°F',
      note: 'Mild fever with no signs of bacterial superinfection. Advise rest, hydration, and follow-up if symptoms worsen beyond 5 days.',
    },
    keyInfo: [
      'Viral URI — symptom onset 2 days ago',
      'No breathlessness or chest pain',
      'Throat exam: mild erythema, no exudate',
      'No antibiotics indicated at this time',
      'Advised symptomatic management',
    ],
    attention: 'Return if fever persists beyond 5 days or breathing difficulty develops.',
  },
  {
    id: 'cellulitis-skin-infection',
    summary:
      "48-year-old male presenting with redness, warmth, and swelling of the left lower leg for 2 days, consistent with cellulitis.",
    medications: [
      { name: 'Cephalexin 500mg', frequency: 'Four Times Daily (7-day course)' },
    ],
    risk: {
      title: 'Spreading Erythema Risk',
      value: 'Margin marked, 6cm',
      note: 'Erythema margin marked for monitoring. Advise return immediately if spreading, fever, or increasing pain occurs.',
    },
    keyInfo: [
      'Cellulitis — left lower leg, onset 2 days ago',
      'No abscess or fluctuance on exam',
      'No fever at presentation',
      'History of minor skin trauma at site',
      'Limb elevation advised',
    ],
    attention: 'Monitor for spreading infection or systemic signs of sepsis.',
  },
  {
    id: 'dyslipidemia-followup',
    summary:
      "55-year-old patient with dyslipidemia returning for lipid panel follow-up. Asymptomatic, reports moderate adherence to dietary advice.",
    medications: [
      { name: 'Rosuvastatin 10mg', frequency: 'Once Daily (Night)' },
    ],
    risk: {
      title: 'LDL Above Target',
      value: 'LDL 142 mg/dL',
      note: 'LDL remains above target (<100 mg/dL) for cardiovascular risk category. Consider statin dose increase.',
    },
    keyInfo: [
      'Dyslipidemia — diagnosed 2020',
      'Recent LDL: 142 mg/dL',
      'HDL: 42 mg/dL',
      'No history of cardiovascular events',
      'Dietary counseling reinforced',
    ],
    attention: 'LDL remains above target despite current statin dose.',
  },
  {
    id: 'ckd-followup',
    summary:
      "67-year-old patient with Stage 3 chronic kidney disease returning for renal function follow-up. Reports stable energy levels, no edema.",
    medications: [
      { name: 'Losartan 50mg', frequency: 'Once Daily' },
      { name: 'Sodium Bicarbonate 500mg', frequency: 'Twice Daily' },
    ],
    risk: {
      title: 'Declining eGFR Trend',
      value: 'eGFR 42 mL/min',
      note: 'eGFR trending downward from prior visit. Recommend nephrology follow-up and avoid nephrotoxic medications.',
    },
    keyInfo: [
      'CKD Stage 3 — diagnosed 2019',
      'Recent eGFR: 42 mL/min/1.73m²',
      'Serum creatinine: 1.6 mg/dL',
      'Blood pressure at goal',
      'Avoid NSAIDs and contrast dye when possible',
    ],
    attention: 'eGFR trending downward; nephrology referral recommended.',
  },
  {
    id: 'gerd-followup',
    summary:
      "41-year-old patient with gastroesophageal reflux disease returning for symptom follow-up. Reports partial improvement with current therapy.",
    medications: [
      { name: 'Omeprazole 20mg', frequency: 'Once Daily (Before Breakfast)' },
    ],
    risk: {
      title: 'Persistent Reflux Symptoms',
      value: '3–4 episodes/week',
      note: 'Residual reflux symptoms despite therapy. Consider dose optimization or evaluation for refractory GERD.',
    },
    keyInfo: [
      'GERD — diagnosed 2022',
      'Symptom frequency: 3–4 times/week',
      'No alarm features (dysphagia, weight loss, bleeding)',
      'Lifestyle modifications reviewed',
      'No prior endoscopy performed',
    ],
    attention: 'Consider endoscopy if symptoms persist despite optimized therapy.',
  },
  {
    id: 'migraine-followup',
    summary:
      "31-year-old female with episodic migraine returning for headache management follow-up. Reports 4 migraine days in the past month.",
    medications: [
      { name: 'Sumatriptan 50mg', frequency: 'As Needed (Onset of Attack)' },
      { name: 'Propranolol 40mg', frequency: 'Twice Daily (Prophylaxis)' },
    ],
    risk: {
      title: 'Frequent Migraine Days',
      value: '4 days/month',
      note: 'Migraine frequency remains above threshold for optimal prophylaxis response. Consider reviewing preventive regimen.',
    },
    keyInfo: [
      'Episodic migraine — diagnosed 2018',
      'Migraine days: 4 in past month',
      'No aura symptoms reported',
      'Headache diary maintained by patient',
      'No red-flag neurological symptoms',
    ],
    attention: 'Review prophylactic therapy given persistent migraine frequency.',
  },
  {
    id: 'osteoarthritis-followup',
    summary:
      "63-year-old female with bilateral knee osteoarthritis returning for pain management follow-up. Reports morning stiffness lasting under 30 minutes.",
    medications: [
      { name: 'Paracetamol 650mg', frequency: 'Thrice Daily' },
      { name: 'Glucosamine Sulfate 500mg', frequency: 'Once Daily' },
    ],
    risk: {
      title: 'Functional Limitation',
      value: 'Moderate on exertion',
      note: 'Pain moderately limits prolonged walking. Consider physiotherapy referral and weight management counseling.',
    },
    keyInfo: [
      'Bilateral knee osteoarthritis — diagnosed 2019',
      'Kellgren-Lawrence Grade II on recent X-ray',
      'BMI: 29.4',
      'No signs of joint effusion or warmth',
      'Physiotherapy referral pending',
    ],
    attention: 'Consider physiotherapy and weight management to reduce joint load.',
  },
  {
    id: 'iron-deficiency-anemia-followup',
    summary:
      "26-year-old female with iron deficiency anemia returning for follow-up after 6 weeks of oral iron supplementation. Reports improved energy levels.",
    medications: [
      { name: 'Ferrous Sulfate 325mg', frequency: 'Once Daily (With Vitamin C)' },
    ],
    risk: {
      title: 'Improving Hemoglobin Trend',
      value: 'Hb 10.8 g/dL',
      note: 'Hemoglobin improving but still below normal range. Continue supplementation and recheck in 6 weeks.',
    },
    keyInfo: [
      'Iron deficiency anemia — diagnosed 6 weeks ago',
      'Recent hemoglobin: 10.8 g/dL (up from 9.2 g/dL)',
      'Ferritin pending repeat testing',
      'Menorrhagia identified as likely cause',
      'Dietary iron intake counseling provided',
    ],
    attention: 'Continue iron therapy and investigate underlying cause of blood loss.',
  },
  {
    id: 'allergic-rhinitis-followup',
    summary:
      "22-year-old patient with seasonal allergic rhinitis returning for symptom review. Reports moderate relief with current antihistamine.",
    medications: [
      { name: 'Fexofenadine 120mg', frequency: 'Once Daily' },
      { name: 'Fluticasone Nasal Spray', frequency: 'Once Daily (Each Nostril)' },
    ],
    risk: {
      title: 'Persistent Nasal Congestion',
      value: 'Moderate severity',
      note: 'Residual nasal congestion despite combination therapy. Consider allergy testing if symptoms persist beyond season.',
    },
    keyInfo: [
      'Allergic rhinitis — seasonal pattern',
      'Triggers: pollen, dust mites',
      'No asthma or eczema history',
      'Nasal exam: mild mucosal edema',
      'Combination therapy initiated last visit',
    ],
    attention: 'Consider allergy panel testing if symptoms persist.',
  },
  {
    id: 'osa-followup',
    summary:
      "49-year-old male with obstructive sleep apnea returning for CPAP compliance follow-up. Reports improved daytime alertness.",
    medications: [
      { name: 'CPAP Therapy', frequency: 'Nightly Use' },
    ],
    risk: {
      title: 'CPAP Compliance',
      value: '5.2 hrs/night avg',
      note: 'Average nightly CPAP usage slightly below the recommended 6+ hours. Reinforce compliance counseling.',
    },
    keyInfo: [
      'Obstructive sleep apnea — diagnosed 2021 (AHI 28)',
      'CPAP usage: 5.2 hrs/night average',
      'BMI: 31.2',
      'Daytime sleepiness improving (Epworth score down)',
      'Weight loss counseling ongoing',
    ],
    attention: 'Reinforce CPAP adherence to reach recommended nightly usage.',
  },
  {
    id: 'antenatal-followup',
    summary:
      "28-year-old female, 28 weeks pregnant, presenting for routine antenatal follow-up. Reports normal fetal movements, no complaints.",
    medications: [
      { name: 'Folic Acid 5mg', frequency: 'Once Daily' },
      { name: 'Iron + Folic Acid Combination', frequency: 'Once Daily' },
    ],
    risk: {
      title: 'Routine Antenatal Monitoring',
      value: 'BP 118/76 mmHg',
      note: 'Blood pressure and fetal growth within normal limits. Continue routine antenatal care schedule.',
    },
    keyInfo: [
      'Gestational age: 28 weeks',
      'Blood pressure: 118/76 mmHg (normal)',
      'Fundal height consistent with gestational age',
      'No proteinuria on urine dipstick',
      'Next glucose tolerance test scheduled',
    ],
    attention: 'No current concerns; continue routine antenatal schedule.',
  },
  {
    id: 'anxiety-depression-followup',
    summary:
      "36-year-old patient with generalized anxiety and depressive symptoms returning for medication follow-up. Reports gradual improvement in mood.",
    medications: [
      { name: 'Sertraline 50mg', frequency: 'Once Daily (Morning)' },
    ],
    risk: {
      title: 'Residual Anxiety Symptoms',
      value: 'PHQ-9: 8 (mild)',
      note: 'Mild residual symptoms on standardized screening. Continue current dose and reassess in 4 weeks.',
    },
    keyInfo: [
      'Generalized anxiety disorder with depressive features — diagnosed 3 months ago',
      'PHQ-9 score: 8 (mild, improved from 14)',
      'No suicidal ideation reported',
      'Attending counseling sessions biweekly',
      'Sleep quality improving',
    ],
    attention: 'Continue monitoring mood scores; reassess therapy in 4 weeks.',
  },
];

/** Returns one random, internally-consistent AI brief template. */
export function getRandomAiBriefTemplate() {
  const index = Math.floor(Math.random() * AI_BRIEF_TEMPLATES.length);
  return AI_BRIEF_TEMPLATES[index];
}
