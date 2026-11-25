import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {claimIds,sourceIndex,distortions,removal,trace,objection,libraryRelations} from './model.ts';
import {text} from './copy.ts';
import {figureMarkup,removalMarkup,traceMarkup,objectionMarkup,gardenMarkup} from './render.ts';
const manifest=JSON.parse(readFileSync(new URL('./manifest.json',import.meta.url),'utf8'));
// Independent enumeration of the complete premise-retention space.
for(const [a,b,paths,joint] of [[false,false,0,false],[false,true,1,false],[true,false,1,false],[true,true,2,true]])assert.deepEqual(removal(a,b),{independent:paths,linked:joint});
assert.throws(()=>removal(1,true));
assert.equal(claimIds.length,10);assert.equal(new Set(claimIds).size,10);
assert.deepEqual(sourceIndex,{C:0,P5:1,C2:1,P2:2,P3:3,P4:3,C1:null,I:null,O:4,R:4});
assert.deepEqual(distortions,['C','P5','C2','C1','R']);
for(const id of claimIds)for(const requested of [false,true]){const s=trace(id,requested);assert.equal(s.id,id);assert.equal(s.reconstructed,['I','C1'].includes(id));assert.equal(s.distorted,requested&&['C','P5','C2','C1','R'].includes(id));}
assert.throws(()=>trace('unknown'));
for(const grant of [false,true])for(const scope of ['trial','permanent']){const s=objection(grant,scope);assert.equal(s.wages,1200);assert.equal(s.covered,grant&&scope==='trial');assert.equal(s.permanentAffordable,null);}
assert.throws(()=>objection(true,'unknown'));
// An exact authored relation fixture prevents mitigation being redirected to the cost proposition.
assert.deepEqual(libraryRelations,[{id:'demand',from:['P5'],to:'C2',kind:'support'},{id:'demand-policy',from:['C2','I'],to:'C',kind:'joint'},{id:'access',from:['P2'],to:'C',kind:'support'},{id:'staff',from:['P3','P4'],to:'C1',kind:'joint'},{id:'feasible',from:['C1'],to:'C',kind:'support'},{id:'cost',from:['O'],to:'C',kind:'objection'},{id:'mitigation',from:['R'],to:'cost',kind:'mitigation'}]);
for(const locale of ['en','de']){
 const c=text(locale);assert.equal(c.sentences.length,5);assert(!JSON.stringify(c).includes('Freitagn'));assert.deepEqual(Object.keys(c.claims),[...claimIds]);assert.deepEqual(Object.keys(c.roles),[...claimIds]);assert.equal(Object.keys(c.bad).length,5);
 assert.equal(c.sentences.join(' '),(locale==='en'?'The library should remain open until 9 p.m. on weekdays for a three-month trial. During the past month, 80 visitors requested later opening hours, suggesting that there is demand for an evening service. Longer hours would also give residents who work until 6 p.m. an opportunity to visit. Two trained employees are available for the additional shifts, and library regulations require two trained employees to be present during closing. The additional wages would cost €1,200, although a confirmed local grant would cover that amount during the trial.':'Die Bibliothek sollte montags bis freitags für einen dreimonatigen Versuch bis 21 Uhr geöffnet bleiben. Im vergangenen Monat baten 80 Besucherinnen und Besucher um längere Öffnungszeiten; das deutet auf Nachfrage nach einem Abendangebot hin. Längere Öffnungszeiten würden auch Menschen, die bis 18 Uhr arbeiten, einen Besuch ermöglichen. Für die zusätzlichen Schichten stehen zwei geschulte Beschäftigte zur Verfügung; die Bibliotheksordnung verlangt beim Schließen die Anwesenheit von zwei geschulten Beschäftigten. Die zusätzlichen Löhne würden 1.200 € kosten, doch eine zugesagte örtliche Förderung würde diesen Betrag während des Versuchs decken.'));
 for(const figure of manifest.figures){const html=figureMarkup(locale,figure);assert(!/undefined|NaN|katex-error|\bid=/.test(html),`${locale}/${figure}`);assert(html.length>80);}
 for(const id of claimIds)for(const bad of [false,true]){const html=traceMarkup(locale,id,bad);assert(html.includes(`data-trace-claim="${id}"`));if(sourceIndex[id]===null)assert(html.includes(c.notQuoted));else assert(html.includes(c.sentences[sourceIndex[id]]));}
 for(const a of [false,true])for(const b of [false,true])assert(removalMarkup(locale,a,b).includes(c.truth));
 for(const scope of ['trial','permanent'])for(const grant of [false,true]){const html=objectionMarkup(locale,grant,scope);assert(html.includes(c.claims.O));if(scope==='permanent'||!grant)assert(!html.includes(c.mitigates));assert(html.includes(scope==='permanent'?c.outside:grant?c.covered:c.uncovered));}
 const complete=figureMarkup(locale,'complete');for(const id of claimIds)assert(complete.includes(`data-claim="${id}"`));assert(complete.includes('am-joint')||complete.includes(c.joint));assert(gardenMarkup(locale).includes(c.garden.I));assert(gardenMarkup(locale).includes(c.causal));
 const src=readFileSync(new URL(`content/${locale}/reasoning/map-an-argument-without-losing-its-meaning.mdx`,import.meta.url),'utf8');assert(src.includes('order: 51'));assert(src.includes('reviewStatus: unreviewed'));assert.equal((src.match(/<ReasoningFigure /g)||[]).length,11);assert.equal((src.match(/<Interactive /g)||[]).length,4);assert(src.includes(c.sentences.join(' ')));assert(!/FIG[a-z]|LAB[a-z]|utm_source|references\/source|\/Users\/jean/.test(src));
}
console.log('Lesson 51: all four premise-removal states, ten persistent claim/source identities, five fidelity distortions, seven exact support/mitigation relations, four funding/scope cases, fourteen EN/DE figures and all activities verified.');
