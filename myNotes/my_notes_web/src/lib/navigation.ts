import {lessonModules} from "./lesson-modules.mjs";
import type { Locale } from "./i18n";
import analysisOrganization from "./analysis-organization.json" with {type:"json"};
type Label = Record<Locale, string>;
export type CourseId="linear-algebra"|"analysis"|"learning"|"reasoning";
interface Chapter {
  course:CourseId;
  directLessons?:boolean;
  id: string;
  title: Label;
  description: Label;
  groups: { key: string; title: Label; orders: number[] }[];
}
export const chapters: Chapter[] = [
  {
    course:"linear-algebra",
    id: "sheet-1-1",
    title: {
      en: "Exercise sheet 1.1",
      de: "Übungsblatt 1.1",
    },
    description: {
      en: "Linear maps, matrix products, and their geometric meaning.",
      de: "Lineare Abbildungen, Matrixprodukte und ihre geometrische Bedeutung.",
    },
    groups: [
      {
        key: "foundations",
        title: { en: "Foundations", de: "Grundlagen" },
        orders: [1, 2, 3],
      },
      {
        key: "connections",
        title: { en: "Connections", de: "Zusammenhänge" },
        orders: [4, 5],
      },
      {
        key: "applications",
        title: { en: "Applications", de: "Anwendungen" },
        orders: [6, 7],
      },
      {
        key: "revision",
        title: { en: "Revision", de: "Wiederholen" },
        orders: [8],
      },
    ],
  },
  {
    course:"linear-algebra",
    id: "sheet-2-1",
    title: {
      en: "Exercise sheet 2.1",
      de: "Übungsblatt 2.1",
    },
    description: {
      en: "Shears, determinants, and how matrix products reveal their structure.",
      de: "Kippungen, Determinanten und die Struktur von Matrixprodukten.",
    },
    groups: [
      {
        key: "shears-area",
        title: {
          en: "Shears and geometry",
          de: "Kippungen und Geometrie",
        },
        orders: [9, 10, 11],
      },
      {
        key: "structure",
        title: {
          en: "Products and proofs",
          de: "Produkte und Beweise",
        },
        orders: [12, 13],
      },
      {
        key: "worked",
        title: {
          en: "Worked exercises",
          de: "Ausgearbeitete Aufgaben",
        },
        orders: [14, 15, 16],
      },
      {
        key: "recap",
        title: { en: "Revision", de: "Wiederholen" },
        orders: [17],
      },
    ],
  },
];
export type AreaId='mathematics'|'learning-teaching'|'thinking';
export const areas:{id:AreaId;title:Label;icon:'math'|'learning'|'reasoning'}[]=[
 {id:'mathematics',title:{en:'Mathematics',de:'Mathematik'},icon:'math'},
 {id:'learning-teaching',title:{en:'Learning & Teaching',de:'Lernen & Lehren'},icon:'learning'},
 {id:'thinking',title:{en:'Reasoning',de:'Denken & Argumentieren'},icon:'reasoning'},
];
export const areaFor=(id:AreaId)=>areas.find(a=>a.id===id)!;
export const courses:{id:CourseId;area:AreaId;title:Label;description:Label}[]=[
 {id:'linear-algebra',area:'mathematics',title:{en:'Linear Algebra I',de:'Lineare Algebra I'},description:{en:'Linear maps, matrices, and the geometry and structure of their products.',de:'Lineare Abbildungen, Matrizen sowie Geometrie und Struktur ihrer Produkte.'}},
 {id:'analysis',area:'mathematics',title:{en:'Analysis I',de:'Analysis I'},description:{en:'Mathematical language, logic, and the foundations of rigorous proof.',de:'Mathematische Sprache, Logik und die Grundlagen präziser Beweise.'}},
];
courses.push({id:'learning',area:'learning-teaching',title:{en:'Learning methodology',de:'Lernmethodik'},description:{en:'Study methods, worked examples, and records of independent practice.',de:'Lernmethoden, ausgearbeitete Beispiele und Nachweise selbstständiger Praxis.'}});
courses.push({id:'reasoning',area:'thinking',title:{en:'The Art of Reasoning',de:'Die Kunst des Denkens'},description:{en:'Clear thinking across mathematics, philosophy, and psychology.',de:'Klares Denken in Mathematik, Philosophie und Psychologie.'}});
chapters.push({id:'reasoning-part-one',course:'reasoning',directLessons:true,title:{en:'Part One',de:'Teil Eins'},description:{en:'From everyday observations to precise reasoning.',de:'Von alltäglichen Beobachtungen zu präzisem Denken.'},groups:[{key:'lessons',title:{en:'Lessons',de:'Lektionen'},orders:[1,2,3,4,5,6,7,8]}]});
chapters.push({id:'reasoning-part-two',course:'reasoning',directLessons:true,title:{en:'Part Two',de:'Teil Zwei'},description:{en:'Seeing the structure beneath the words.',de:'Die Struktur hinter den Wörtern erkennen.'},groups:[{key:'lessons',title:{en:'Lessons',de:'Lektionen'},orders:[9,10,11,12,13,14,15,16]}]});
chapters.push({id:'reasoning-part-three',course:'reasoning',directLessons:true,title:{en:'Part Three',de:'Teil Drei'},description:{en:'Building and inspecting proofs.',de:'Beweise entwickeln und prüfen.'},groups:[{key:'lessons',title:{en:'Lessons',de:'Lektionen'},orders:[17,18,19,20,21,22,23,24]}]});
chapters.push({id:'reasoning-part-four',course:'reasoning',directLessons:true,title:{en:'Part Four',de:'Teil Vier'},description:{en:'Investigating problems before a solution is visible.',de:'Probleme untersuchen, bevor eine Lösung sichtbar ist.'},groups:[{key:'lessons',title:{en:'Lessons',de:'Lektionen'},orders:[25,26,27,28]}]});
const learningChapters:Chapter[]=[
 {id:'learning-methods',course:'learning',title:{en:'Principles and methods',de:'Prinzipien und Methoden'},description:{en:'Give each method a clear job: organize, explain, choose, and recall.',de:'Jeder Methode eine klare Aufgabe geben: ordnen, erklären, auswählen und abrufen.'},groups:[{key:'orientation',title:{en:'Start with a purpose',de:'Mit einem Ziel beginnen'},orders:[1,2]},{key:'methods',title:{en:'The four methods',de:'Die vier Methoden'},orders:[3,4,5,6]}]},
 {id:'learning-practice',course:'learning',title:{en:'The study workflow',de:'Der Lernablauf'},description:{en:'Turn the methods into attempts, feedback, and evidence you can revisit.',de:'Aus Methoden werden Versuche, Rückmeldungen und überprüfbare Ergebnisse.'},groups:[{key:'practice',title:{en:'Practise and repair',de:'Üben und verbessern'},orders:[7,8,9]},{key:'continuity',title:{en:'Evidence and continuity',de:'Nachweise und Kontinuität'},orders:[10,11,12,13]}]},
 {id:'learning-transcripts',course:'learning',title:{en:'Transcript reading guides',de:'Lesehilfen zu den Transkripten'},description:{en:'Understand the four sources, their useful ideas, and what their claims leave open.',de:'Die vier Quellen, ihre brauchbaren Ideen und offenen Behauptungen verstehen.'},groups:[{key:'readings',title:{en:'Read critically',de:'Kritisch lesen'},orders:[14,15,16,17]}]},
];
chapters.push(...learningChapters);
const analysisChapters:Chapter[]=analysisOrganization.modules.map(module=>({
 id:module.id,course:'analysis',title:module.title,description:module.title,
 groups:[{key:'lessons',title:module.title,orders:module.orders}],
}));
chapters.push(...analysisChapters);
chapters.push({id:'analysis-second-exam-prep',course:'analysis',directLessons:true,title:{en:'Second Exam Prep',de:'Vorbereitung auf die zweite Klausur'},description:{en:'Revision sheets for the second exam.',de:'Lernzettel für die zweite Klausur.'},groups:[{key:'lessons',title:{en:'Revision sheets',de:'Lernzettel'},orders:[21]}]});
// Each activated module owns one order; registration is deterministic even if 31 arrives before 30.
for(const m of lessonModules){
 let chapter=chapters.find(c=>c.id===m.chapter);
 if(!chapter){
  if(!m.chapterDefinition)throw new Error(`Module needs an explicit chapter definition: ${m.id}`);
  const d=m.chapterDefinition;chapter={...d,directLessons:true,groups:[{key:'lessons',title:{en:'Lessons',de:'Lektionen'},orders:[]}]};chapters.push(chapter!);
 }else if(m.chapterDefinition&&(JSON.stringify(chapter.title)!==JSON.stringify(m.chapterDefinition.title)||JSON.stringify(chapter.description)!==JSON.stringify(m.chapterDefinition.description)))throw new Error(`Conflicting module chapter: ${m.chapter}`);
 if(chapter!.course!==m.course||chapters.some(c=>c.course===m.course&&c.groups.some(g=>g.orders.includes(m.order))))throw new Error(`Module navigation collision: ${m.id}`);
 chapter!.groups[0].orders.push(m.order);chapter!.groups[0].orders.sort((a,b)=>a-b);
}
export function courseFor(id:CourseId){const c=courses.find(c=>c.id===id);if(!c)throw new Error(`Unknown course ${id}`);return c;}
export function chapterFor(id:string){const c=chapters.find(c=>c.id===id);if(!c)throw new Error(`Unknown chapter ${id}`);return c;}
export const chaptersFor=(course:CourseId)=>chapters.filter(c=>c.course===course);
export function validateOutline(lessons:{order:number;chapter:string;course:CourseId}[]) {
 const listed=chapters.flatMap(c=>c.groups.flatMap(g=>g.orders.map(order=>({order,chapter:c.id,course:c.course}))));
 if(new Set(listed.map(x=>x.course+':'+x.order)).size!==listed.length)throw new Error('Duplicate navigation order in a course');
 const same=(x:typeof listed[number],l:typeof lessons[number])=>x.order===l.order&&x.chapter===l.chapter&&x.course===l.course;
 if(lessons.some(l=>!listed.some(x=>same(x,l)))||listed.some(x=>!lessons.some(l=>same(x,l))))throw new Error('Every published lesson must appear in its own course/chapter exactly once');
}
