export type Locale = "en" | "de";
const en = {
  "titles": {
    "examples": "Examples are not the whole domain",
    "pairing": "Combining complete pairs",
    "general": "The same structure for arbitrary inputs",
    "dependencies": "Every transition has a reason",
    "types": "A proposition specifies a requirement",
    "notation": "Mathematics and Lean notation",
    "kernel": "Constructing and checking a proof",
    "search": "Finding a path is a different task",
    "ai": "A plausible argument with a false equality",
    "layers": "Five questions behind a verified theorem",
    "delivery": "Deduction inside a delivery model",
    "closing": "General reasoning covers every admissible pair"
  },
  "reset": "Reset",
  "previous": "Previous",
  "next": "Next",
  "reference": "Show reference answer",
  "choose": "Choose an answer before comparing.",
  "resetStatus": "Initial state restored.",
  "matches": "Your choice matches the reference answer.",
  "reconsider": "Compare the scope of the procedure with the scope of the claim.",
  "case": "Situation",
  "step": "Step",
  "tested": "Tested",
  "untested": "Not yet tested",
  "tests": "tests",
  "sum": "Sum",
  "first": "First number",
  "second": "Second number",
  "verified": "cases checked",
  "goal": "Remaining requirement",
  "context": "Assumptions and available facts",
  "command": "Lean instruction",
  "number": "Number",
  "pairs": "pairs",
  "total": "Total pairs",
  "witness": "Proposed witness",
  "correct": "The equality holds for this instance.",
  "incorrect": "The equality fails for this instance.",
  "accidental": "The product witness works accidentally here; this does not justify the identity for arbitrary inputs.",
  "gridHelp": "Choose how many ordered pairs to check. Each visible point represents one addition. The arrows continue beyond this finite window.",
  "gridCaption": "Even when all 120 visible points are checked, infinitely many pairs remain outside the window. A green point records a tested case, not a universal proof.",
  "finiteHelp": "The complete domain is S × S, with S = {0, 2, 4, 6}. Check all 16 ordered pairs, including zero and the reversed pairs.",
  "checkAll": "Check all 16 pairs",
  "finitePending": "The 16 sums are displayed; exhaustive checking has not yet been requested.",
  "finiteDone": "All 16 sums are even. This proves the statement restricted to S × S, assuming correct arithmetic and complete enumeration.",
  "proofHelp": "A guided reconstruction of the proof, not a live Lean session. The intermediate displays explain the obligations; the complete code appears below.",
  "proofMeanings": [
    "State the theorem for arbitrary natural numbers and assume both are even.",
    "Unpack the existential assumptions to obtain pair counts and their defining equalities.",
    "Propose a + b as the new witness. Its defining equality still needs a proof.",
    "Substitute the two equalities. The remaining calculation is distributivity in reverse.",
    "Reverse Nat.mul_add to establish the required equality. The complete proof has no remaining goal."
  ],
  "witnessHelp": "This numerical illustration checks one instance. It is not a live Lean proof checker. Use the sliders or number fields, from 0 to 6.",
  "invalid": "Enter a whole number from 0 to 6. The previous value has been restored.",
  "challengeHelp": "Evaluate what each procedure establishes. Answers stay in this activity; no score or mastery judgment is calculated.",
  "questions": [
    "A program checks ten million pairs of even natural numbers and finds no counterexample.",
    "A computer correctly checks every pair in a precisely defined finite set.",
    "An AI produces a convincing algebraic argument with one unjustified equality.",
    "Lean verifies a completed formal proof under the stated assumptions.",
    "An automated proof search runs out of time without finding a proof."
  ],
  "options": [
    [
      "The universal theorem is proved.",
      "The tested cases satisfy the property.",
      "No counterexample can exist."
    ],
    [
      "The restricted statement is proved.",
      "All natural numbers have been checked.",
      "The result cannot count as a proof."
    ],
    [
      "The conclusion must be false.",
      "The proof is valid because the conclusion is true.",
      "The proposed proof is invalid."
    ],
    [
      "The formal conclusion follows within the system.",
      "Every assumption is empirically true.",
      "The informal question was necessarily translated correctly."
    ],
    [
      "The proposition is false.",
      "The search has not established the proposition.",
      "No mathematical proof can exist."
    ]
  ],
  "reasons": [
    "The computation establishes the tested instances. Its finite sample does not cover the universal domain.",
    "Correct checking of every member of the specified finite domain proves that restricted statement. It says nothing about cases outside it.",
    "The unjustified equality breaks this argument. A true conclusion does not repair an invalid step.",
    "The formal conclusion follows from the declared assumptions within the accepted system. Faithful translation and empirical truth are separate questions.",
    "A resource-limited search can miss a proof. Its failure establishes neither falsity nor unprovability."
  ],
  "exampleCaption": "Illustrative counter: 1,000,000 tested cases, 0 counterexamples. These figures are a teaching scenario, not a computation performed by this page. Does a finite sample settle the universal statement?",
  "pairCaption": "Three blue pairs and four purple pairs combine into seven complete pairs. No object is left unpaired.",
  "generalCaption": "The pair counts may be any natural numbers, including zero. Combining a pairs with b pairs produces a + b pairs.",
  "dependencies": [
    "Assume both inputs are even",
    "Definition of evenness; choose witnesses",
    "Substitution of equals",
    "Distributive law, reversed",
    "Natural numbers are closed under addition; witness a + b"
  ],
  "types": [
    "Proposition: the required type",
    "Proof term: an inhabitant",
    "Type checking: does the term have the required type?"
  ],
  "typeCaption": "A conceptual fit analogy, not a picture of Lean’s internal data structures. Persuasiveness is not the criterion.",
  "notation": [
    "Natural number, including zero",
    "Proposition",
    "There exists",
    "Multiplication",
    "Equality"
  ],
  "kernel": [
    "Formal statement",
    "Human reasoning and automated tactics",
    "Candidate proof term",
    "Kernel: checks the formal term",
    "Accepted relative to the rules and assumptions / rejected"
  ],
  "kernelCaption": "Construction can use complicated search or automation. The resulting proof term still has to satisfy the checking rules. A placeholder is not a completed proof.",
  "search": [
    "Initial goal",
    "Possible strategies",
    "Dead end",
    "Completed proof",
    "Search timeout: no conclusion about falsity"
  ],
  "searchCaption": "Branches are proof strategies, not numerical test cases. Finding a proof and checking a supplied proof are distinct tasks.",
  "aiCaption": "Fictional AI draft: the conclusion is true, but the last equality fails in general. Substituting a = 2 and b = 3 gives 10 ≠ 12.",
  "layers": [
    "Intended question: what do we mean?",
    "Formal statement: was it translated faithfully?",
    "Foundations and assumptions: what is accepted?",
    "Formal proof: does the conclusion follow?",
    "Application: does the model fit this situation?"
  ],
  "delivery": [
    "Empirical assumption: every route takes at most 30 minutes.",
    "Model: delivery time = route time + loading time.",
    "Deduction: delivery time ≤ 30 minutes + loading time."
  ],
  "deliveryCaption": "The inference preserves the inequality. It does not measure routes or establish that the model describes every real delivery.",
  "closing": [
    "Finite examples",
    "General proof",
    "All admissible cases",
    "Machine-checkable reasoning, relative to a formal system"
  ],
  "closingCaption": "The general argument covers infinitely many inputs through arbitrary variables. It does not calculate every pair individually.",
  "labTitles": {
    "grid": "Testing within an infinite domain",
    "bounded": "Exhausting a finite domain",
    "proof": "Follow the proof state",
    "witness": "Try the proposed witness",
    "challenge": "What has actually been established?"
  }
};
const de: typeof en = {
  "titles": {
    "examples": "Beispiele sind nicht der ganze Bereich",
    "pairing": "Vollständige Paare zusammenfügen",
    "general": "Dieselbe Struktur für beliebige Eingaben",
    "dependencies": "Jeder Übergang hat eine Begründung",
    "types": "Eine Aussage stellt eine Anforderung",
    "notation": "Mathematik und Lean-Notation",
    "kernel": "Einen Beweis konstruieren und prüfen",
    "search": "Einen Weg finden ist eine andere Aufgabe",
    "ai": "Ein plausibles Argument mit einer falschen Gleichheit",
    "layers": "Fünf Fragen hinter einem geprüften Satz",
    "delivery": "Deduktion in einem Liefermodell",
    "closing": "Allgemeines Schließen erfasst jedes zulässige Paar"
  },
  "reset": "Zurücksetzen",
  "previous": "Zurück",
  "next": "Weiter",
  "reference": "Referenzantwort anzeigen",
  "choose": "Wähle vor dem Vergleich eine Antwort.",
  "resetStatus": "Ausgangszustand wiederhergestellt.",
  "matches": "Deine Wahl stimmt mit der Referenzantwort überein.",
  "reconsider": "Vergleiche den Geltungsbereich des Verfahrens mit dem der Behauptung.",
  "case": "Situation",
  "step": "Schritt",
  "tested": "Geprüft",
  "untested": "Noch nicht geprüft",
  "tests": "Tests",
  "sum": "Summe",
  "first": "Erste Zahl",
  "second": "Zweite Zahl",
  "verified": "Fälle geprüft",
  "goal": "Verbleibende Anforderung",
  "context": "Annahmen und verfügbare Tatsachen",
  "command": "Lean-Anweisung",
  "number": "Zahl",
  "pairs": "Paare",
  "total": "Paare insgesamt",
  "witness": "Vorgeschlagener Zeuge",
  "correct": "Die Gleichheit gilt für diesen Einzelfall.",
  "incorrect": "Die Gleichheit gilt für diesen Einzelfall nicht.",
  "accidental": "Der Produktzeuge funktioniert hier zufällig; das rechtfertigt die Identität für beliebige Eingaben nicht.",
  "gridHelp": "Wähle die Anzahl der zu prüfenden geordneten Paare. Jeder sichtbare Punkt steht für eine Addition. Der Bereich setzt sich jenseits dieses endlichen Ausschnitts fort.",
  "gridCaption": "Auch nach Prüfung aller 120 sichtbaren Punkte bleiben unendlich viele Paare außerhalb des Ausschnitts. Ein grüner Punkt steht für einen geprüften Fall, nicht für einen allgemeinen Beweis.",
  "finiteHelp": "Der vollständige Bereich ist S × S mit S = {0, 2, 4, 6}. Prüfe alle 16 geordneten Paare, einschließlich null und der umgekehrten Paare.",
  "checkAll": "Alle 16 Paare prüfen",
  "finitePending": "Die 16 Summen sind dargestellt; die vollständige Prüfung wurde noch nicht angefordert.",
  "finiteDone": "Alle 16 Summen sind gerade. Bei korrekter Rechnung und vollständiger Aufzählung beweist dies die auf S × S beschränkte Aussage.",
  "proofHelp": "Eine geführte Rekonstruktion des Beweises, keine laufende Lean-Sitzung. Die Zwischenanzeigen erläutern die Beweispflichten; der vollständige Code steht darunter.",
  "proofMeanings": [
    "Formuliere den Satz für beliebige natürliche Zahlen und nehme an, dass beide gerade sind.",
    "Entpacke die Existenzaussagen, um Paaranzahlen und ihre definierenden Gleichheiten zu erhalten.",
    "Schlage a + b als neuen Zeugen vor. Die definierende Gleichheit muss noch bewiesen werden.",
    "Setze die beiden Gleichheiten ein. Es bleibt das Distributivgesetz in umgekehrter Richtung.",
    "Kehre Nat.mul_add um, um die benötigte Gleichheit zu erhalten. Der vollständige Beweis hat kein offenes Ziel mehr."
  ],
  "witnessHelp": "Diese numerische Darstellung prüft einen Einzelfall. Sie ist kein laufender Lean-Beweisprüfer. Verwende die Regler oder Zahlenfelder von 0 bis 6.",
  "invalid": "Gib eine ganze Zahl von 0 bis 6 ein. Der vorige Wert wurde wiederhergestellt.",
  "challengeHelp": "Beurteile, was das jeweilige Verfahren nachweist. Antworten bleiben in dieser Aktivität; es gibt keine Punktzahl oder Bewertung deines Lernstands.",
  "questions": [
    "Ein Programm prüft zehn Millionen Paare gerader natürlicher Zahlen und findet kein Gegenbeispiel.",
    "Ein Computer prüft jedes Paar einer genau festgelegten endlichen Menge korrekt.",
    "Eine KI erzeugt ein überzeugendes algebraisches Argument mit einer unbegründeten Gleichheit.",
    "Lean prüft einen vollständigen formalen Beweis unter den angegebenen Annahmen.",
    "Eine automatische Beweissuche findet vor Ablauf der verfügbaren Zeit keinen Beweis."
  ],
  "options": [
    [
      "Der allgemeine Satz ist bewiesen.",
      "Die geprüften Fälle erfüllen die Eigenschaft.",
      "Ein Gegenbeispiel kann nicht existieren."
    ],
    [
      "Die eingeschränkte Aussage ist bewiesen.",
      "Alle natürlichen Zahlen wurden geprüft.",
      "Das Ergebnis kann nicht als Beweis gelten."
    ],
    [
      "Die Schlussfolgerung muss falsch sein.",
      "Der Beweis ist gültig, weil die Schlussfolgerung wahr ist.",
      "Der vorgeschlagene Beweis ist ungültig."
    ],
    [
      "Die formale Schlussfolgerung folgt innerhalb des Systems.",
      "Jede Annahme ist empirisch wahr.",
      "Die informelle Frage wurde notwendigerweise richtig übersetzt."
    ],
    [
      "Die Aussage ist falsch.",
      "Die Suche hat die Aussage nicht nachgewiesen.",
      "Es kann keinen mathematischen Beweis geben."
    ]
  ],
  "reasons": [
    "Die Rechnung weist die getesteten Einzelfälle nach. Die endliche Stichprobe deckt den allgemeinen Bereich nicht ab.",
    "Die korrekte Prüfung jedes Elements des festgelegten endlichen Bereichs beweist die eingeschränkte Aussage. Über Fälle außerhalb sagt sie nichts aus.",
    "Die unbegründete Gleichheit unterbricht dieses Argument. Eine wahre Schlussfolgerung repariert keinen ungültigen Schritt.",
    "Die formale Schlussfolgerung folgt aus den angegebenen Annahmen im akzeptierten System. Übersetzungstreue und empirische Wahrheit sind eigene Fragen.",
    "Eine Suche mit begrenzten Ressourcen kann einen Beweis übersehen. Ihr Scheitern weist weder Falschheit noch Unbeweisbarkeit nach."
  ],
  "exampleCaption": "Illustrativer Zähler: 1.000.000 getestete Fälle, 0 Gegenbeispiele. Diese Zahlen sind ein Lehrszenario, keine von dieser Seite ausgeführte Rechnung. Entscheidet eine endliche Stichprobe die allgemeine Aussage?",
  "pairCaption": "Drei blaue und vier violette Paare ergeben sieben vollständige Paare. Kein Objekt bleibt ohne Partner.",
  "generalCaption": "Die Paaranzahlen dürfen beliebige natürliche Zahlen sein, einschließlich null. Aus a Paaren und b Paaren werden a + b Paare.",
  "dependencies": [
    "Beide Eingaben seien gerade",
    "Definition der Geradheit; Zeugen wählen",
    "Gleiche Ausdrücke einsetzen",
    "Distributivgesetz, umgekehrt",
    "Abgeschlossenheit der natürlichen Zahlen unter Addition; Zeuge a + b"
  ],
  "types": [
    "Aussage: der verlangte Typ",
    "Beweisterm: ein Bewohner",
    "Typprüfung: hat der Term den verlangten Typ?"
  ],
  "typeCaption": "Eine anschauliche Passform-Analogie, keine Darstellung der internen Datenstrukturen von Lean. Überzeugungskraft ist nicht das Kriterium.",
  "notation": [
    "Natürliche Zahl, einschließlich null",
    "Aussage",
    "Es existiert",
    "Multiplikation",
    "Gleichheit"
  ],
  "kernel": [
    "Formale Aussage",
    "Menschliches Denken und automatisierte Taktiken",
    "Vorgeschlagener Beweisterm",
    "Kernel: prüft den formalen Term",
    "Unter den Regeln und Annahmen akzeptiert / zurückgewiesen"
  ],
  "kernelCaption": "Die Konstruktion kann aufwendige Suche oder Automatisierung nutzen. Der resultierende Beweisterm muss trotzdem die Prüfregeln erfüllen. Ein Platzhalter ist kein vollständiger Beweis.",
  "search": [
    "Ausgangsziel",
    "Mögliche Strategien",
    "Sackgasse",
    "Vollständiger Beweis",
    "Zeitablauf der Suche: kein Nachweis der Falschheit"
  ],
  "searchCaption": "Die Zweige stehen für Beweisstrategien, nicht für numerische Testfälle. Einen Beweis zu finden und einen vorliegenden Beweis zu prüfen sind verschiedene Aufgaben.",
  "aiCaption": "Fiktiver KI-Entwurf: Die Schlussfolgerung ist wahr, aber die letzte Gleichheit gilt nicht allgemein. Mit a = 2 und b = 3 ergibt sich 10 ≠ 12.",
  "layers": [
    "Gemeinte Frage: Was meinen wir?",
    "Formale Aussage: Wurde die Frage getreu übersetzt?",
    "Grundlagen und Annahmen: Was wird akzeptiert?",
    "Formaler Beweis: Folgt die Schlussfolgerung?",
    "Anwendung: Passt das Modell zur Situation?"
  ],
  "delivery": [
    "Empirische Annahme: Jede Route dauert höchstens 30 Minuten.",
    "Modell: Lieferzeit = Fahrzeit + Ladezeit.",
    "Deduktion: Lieferzeit ≤ 30 Minuten + Ladezeit."
  ],
  "deliveryCaption": "Der Schluss erhält die Ungleichung. Er misst keine Routen und weist nicht nach, dass das Modell jede reale Lieferung beschreibt.",
  "closing": [
    "Endliche Beispiele",
    "Allgemeiner Beweis",
    "Alle zulässigen Fälle",
    "Maschinell prüfbares Schließen, relativ zu einem formalen System"
  ],
  "closingCaption": "Das allgemeine Argument erfasst mit beliebigen Variablen unendlich viele Eingaben. Es berechnet nicht jedes Paar einzeln.",
  "labTitles": {
    "grid": "Tests in einem unendlichen Bereich",
    "bounded": "Einen endlichen Bereich vollständig prüfen",
    "proof": "Den Beweiszustand verfolgen",
    "witness": "Den vorgeschlagenen Zeugen erproben",
    "challenge": "Was wurde tatsächlich nachgewiesen?"
  }
};
export const copy = (locale:Locale) => locale === "de" ? de : en;
