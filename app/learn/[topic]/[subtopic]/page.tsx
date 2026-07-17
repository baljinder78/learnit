import KnowledgeApp from "../../../KnowledgeApp";

export default async function SubtopicPage({
  params,
}: {
  params: Promise<{ topic: string; subtopic: string }>;
}) {
  const { topic, subtopic } = await params;
  return <KnowledgeApp initialTopicSlug={topic} initialSubtopicSlug={subtopic} />;
}
