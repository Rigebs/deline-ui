export function onClickOutside(
  element: HTMLElement,
  callback: () => void,
  excludeSelector?: string,
): () => void {
  const handler = (event: MouseEvent): void => {
    const target = event.target as Node;
    if (!element.contains(target)) {
      if (excludeSelector && (target as HTMLElement)?.closest?.(excludeSelector)) {
        return;
      }
      callback();
    }
  };

  document.addEventListener('click', handler, true);
  return () => document.removeEventListener('click', handler, true);
}
