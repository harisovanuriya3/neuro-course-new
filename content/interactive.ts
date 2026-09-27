export type DiagramNode = { id: string; label: string; explanation: string };
export type DiagramBase = { id: string; title: string; instruction: string; anchor: string };
export type InteractiveLesson = {
  kind: "interactive";
  title: string;
  introduction: string;
  ui: {
    instructions: string; select: string; explanation: string; previous: string;
    next: string; reset: string; step: string; theory: string; returnToCenter: string;
    keyboard: string; active: string; inactive: string; result: string;
  };
  organization: DiagramBase & { root: string; groups: { id: string; title: string; nodes: DiagramNode[] }[] };
  pathway: DiagramBase & { nodes: DiagramNode[]; loop: string };
  synapse: DiagramBase & { modes: { id: string; title: string; note: string; nodes: DiagramNode[] }[] };
  integration: DiagramBase & {
    excitation: string; inhibition: string; neuron: string; note: string;
    outcomes: [string, string, string, string];
  };
};
