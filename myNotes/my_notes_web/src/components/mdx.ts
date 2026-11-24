/** One registration point for components available to every lesson. */
import MatrixComparison from "./MatrixComparison.astro";
import Math from "./Math.astro";
import ReasoningFigure from './ReasoningFigure.astro';
import Note from "./Note.astro";
import Exercise from "./Exercise.astro";
import Explorer from "./Explorer.astro";
import MatrixProduct from "./interactive/MatrixProduct.astro";
import Flow from "./Flow.astro";
import Interactive from "./interactive/Interactive.astro";
import VectorFigure from "./VectorFigure.astro";
import NumberDomains from './NumberDomains.astro';
import ExpressionTrees from './ExpressionTrees.astro';
import ProcessDiagram from './ProcessDiagram.astro';
import LearningFigure from './LearningFigure.astro';
import QuestionLens from './QuestionLens.astro';
import StudyTemplate from './StudyTemplate.astro';
import RelationMap from './RelationMap.astro';
import MindMap from './interactive/MindMap.astro';
import AnalysisProof from './AnalysisProof.astro';
import LogicFigure from './LogicFigure.astro';
import RecallChecklist from './RecallChecklist.astro';
export const learningComponents = {
  LogicFigure,
  RecallChecklist,
  ReasoningFigure,
  AnalysisProof,
  Math,
  MindMap,
  RelationMap,
  StudyTemplate,
  ProcessDiagram,
  LearningFigure,
  QuestionLens,
  NumberDomains,
  ExpressionTrees,
  MatrixComparison,
  Note,
  Exercise,
  Flow,
  Interactive,
  VectorFigure,
  Explorer,
  MatrixProduct,
};
