export default async function userLocation(req, res, next) {
  try {
    const userIp = req.headers["x-forwarded-for"] || req.ip;
    const response = await fetch(
      `https://ipinfo.io/${userIp}?token=521669d8ecf547`
    );
    if (response.ok) {
      const location = await response.json();
      req.userLocation = location.country;
      req.userIp = userIp;
    } else {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (err) {
    console.error(err.message);
  }

  next();
}
