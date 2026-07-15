export function scrollToSection(
  id: string,
  block: ScrollLogicalPosition = "start",
) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block });
}
