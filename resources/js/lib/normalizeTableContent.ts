// utils/normalizeTableContent.ts
export function normalizeTableContent(node: any) {
  if (!node) return;

  if (node.type === 'td' || node.type === 'th') {
    node.children?.forEach((p: any) => {
      p.children?.forEach((c: any) => {
        if (!c.text) c.text = ' '; // <-- replace null/empty text
      });
    });
  }

  node.children?.forEach(normalizeTableContent);
}
