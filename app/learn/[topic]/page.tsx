import KnowledgeApp from "../../KnowledgeApp";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  return <KnowledgeApp initialTopicSlug={topic} />;
}
