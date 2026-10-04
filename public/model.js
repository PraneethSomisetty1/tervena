export const readings = [
 {d:'Sep 15',t:'07:10',s:128,b:80},{d:'Sep 16',t:'07:05',s:130,b:82},
 {d:'Sep 17',t:'07:15',s:129,b:81},{d:'Sep 18',t:'07:10',s:131,b:82},
 {d:'Sep 19',t:'07:00',s:128,b:80},{d:'Sep 20',t:'07:20',s:130,b:81},
 {d:'Sep 21',t:'07:10',s:129,b:80},{d:'Sep 22',t:'19:20',s:139,b:86},
 {d:'Sep 23',t:'19:15',s:141,b:88},{d:'Sep 24',t:'19:25',s:140,b:87},
 {d:'Sep 25',t:'19:10',s:142,b:88},{d:'Sep 26',t:'19:20',s:139,b:86},
 {d:'Sep 27',t:'19:15',s:141,b:87},{d:'Sep 28',t:'19:25',s:140,b:87}
];
export const initial = () => ({view:'clinician',bp:true,wearable:true,share:true,period:14,reviewed:false,context:'My work schedule changed on September 22. I started measuring after work instead of before breakfast.',saved:false});
export const average = (items,key) => items.length ? Math.round(items.reduce((sum,r)=>sum+r[key],0)/items.length) : null;
export const available = (state,source) => state.share && Boolean(state[source]);
export function summary(state) {
 const bp=available(state,'bp'), wearable=available(state,'wearable');
 return {bp,wearable,recent:bp?`${average(readings.slice(7),'s')}/${average(readings.slice(7),'b')}`:null,prior:bp?`${average(readings.slice(0,7),'s')}/${average(readings.slice(0,7),'b')}`:null,delta:bp?average(readings.slice(7),'s')-average(readings.slice(0,7),'s'):null,context:state.share?state.context:null};
}
export function exportReport(state) {
 const s=summary(state);
 return `TERVENA HEALTH — SYNTHETIC DEMO REPORT\nAlex Morgan | CHI-001 | September 29, 2026\nNot for clinical use. No live connections or model inference.\n\nHOME MEASUREMENTS\n${s.bp?`Recent week: ${s.recent} mmHg\nPrior week: ${s.prior} mmHg\nSystolic difference: +${s.delta} mmHg\nMeasurement time changed from morning to evening.`:'Home measurements unavailable: source disconnected or sharing disabled.'}\n\nPATIENT CONTEXT\n${s.context??'Unavailable: sharing disabled.'}\n\nWEARABLE COVERAGE\n${s.wearable?'Prior week: 7/7 days. Recent week: 3/7 days. Missing data do not establish reduced activity.':'Unavailable: source disconnected or sharing disabled.'}\n\nCLINICAL RECORD\nHypertension listed September 1. No medication change recorded. Adherence unknown. No lab values supplied.\n\nREVIEW STATUS\n${state.reviewed?'Reviewed in this demo session.':'Not yet reviewed.'}\nNo chart entry or patient message was sent.\n`;
}
