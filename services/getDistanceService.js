
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = angle => (angle * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // To get distance in km

  return d;
}
