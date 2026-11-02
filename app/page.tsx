export default function Home() {
  return (
    <main className="app-shell">
      <iframe
        className="app-frame"
        src="/resilio.html"
        title="Resilio emergency energy planner"
        allow="geolocation; clipboard-write"
      />
    </main>
  );
}
