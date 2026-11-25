export type Lang='en'|'de';
export const pick=(l:Lang,en:string,de:string)=>l==='de'?de:en;
export const names=(l:Lang)=>l==='de'?['A. Im Freien','B. Überdacht','C. Innenraum']:['A. Outdoor','B. Covered','C. Indoor'];
export const copy=(l:Lang)=>({
 names:names(l),dry:pick(l,'Dry weather','Trockenes Wetter'),rain:pick(l,'Rain','Regen'),
 weather:pick(l,'Change the weather','Das Wetter ändern'),utility:pick(l,'Change the preference model','Das Präferenzmodell ändern'),decision:pick(l,'Explore the decision','Die Entscheidung untersuchen'),
 p:pick(l,'Probability of rain (%)','Regenwahrscheinlichkeit (%)'),pn:pick(l,'Enter rain probability (%)','Regenwahrscheinlichkeit eingeben (%)'),k:pick(l,'Negative weight of losses','Negative Gewichtung von Verlusten'),kn:pick(l,'Enter loss weight','Verlustgewicht eingeben'),
 constraints:pick(l,'Apply constraints','Nebenbedingungen anwenden'),modes:pick(l,'No additional constraints|Upfront budget at most €800|Modeled loss at most €100|Both constraints','Keine zusätzlichen Bedingungen|Vorabkosten höchstens 800 €|Modellierter Verlust höchstens 100 €|Beide Bedingungen').split('|'),
 reset:pick(l,'Reset','Zurücksetzen'),resetDone:pick(l,'Initial assumptions restored.','Ausgangsannahmen wiederhergestellt.'),invalid:pick(l,'Enter a finite number within the stated bounds. The last valid display is retained.','Gib eine endliche Zahl innerhalb der angegebenen Grenzen ein. Die letzte gültige Darstellung bleibt erhalten.'),
 plot:pick(l,'Expected profit (€)','Erwarteter Gewinn (€)'),money:pick(l,'Expected money (€)','Gelderwartungswert (€)'),units:pick(l,'Expected utility (model units)','Erwartungsnutzen (Modelleinheiten)'),
 best:pick(l,'Highest expected monetary profit among feasible options','Höchster Gelderwartungswert unter den zulässigen Optionen'),tie:pick(l,'Equal best values','Gleich hohe Bestwerte'),excluded:pick(l,'Excluded','Ausgeschlossen'),allowed:pick(l,'Feasible','Zulässig'),
 cost:pick(l,'Upfront cost','Vorabkosten'),loss:pick(l,'Worst modeled loss','Größter modellierter Verlust'),net:pick(l,'Net consequence','Nettoergebnis'),
 scroll:pick(l,'Wide decision diagram; scroll horizontally','Breites Entscheidungsdiagramm; horizontal scrollbar'),
 scope:pick(l,'Fictional teaching model. The loss cap checks both modeled weather states, even when the slider assigns one state probability zero. Upfront cost and net loss are different quantities.','Fiktives Lehrmodell. Die Verlustgrenze prüft beide modellierten Wetterlagen, auch wenn der Regler einer davon die Wahrscheinlichkeit null zuweist. Vorabkosten und Nettoverlust sind verschiedene Größen.'),
 utilityScope:pick(l,'At 20% rain probability. Gains have weight 1; losses have the selected weight. These units represent an illustrative preference model, not euros or a universal psychological law.','Bei 20 % Regenwahrscheinlichkeit. Gewinne haben Gewicht 1, Verluste das gewählte Gewicht. Die Einheiten gehören zu einem beispielhaften Präferenzmodell; sie sind weder Euro noch ein allgemeines psychologisches Gesetz.'),
 descriptions:pick(l,'Cheap and spacious; exposed to rain.|Moderate cost; partial weather protection.|Higher cost; modeled revenue unchanged by rain.','Günstig und geräumig; Regen ausgesetzt.|Mittlere Kosten; teilweise vor Regen geschützt.|Höhere Kosten; modellierte Einnahmen bei Regen unverändert.').split('|')
});
