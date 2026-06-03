export function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(value?: string | null) {
  if (!value) {
    return '기록 없음';
  }
  return value.replaceAll('-', '.');
}

export function daysSince(value?: string | null) {
  if (!value) {
    return null;
  }
  const start = new Date(`${value}T00:00:00`);
  if (Number.isNaN(start.getTime())) {
    return null;
  }
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = todayStart.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / 86_400_000) + 1);
}
