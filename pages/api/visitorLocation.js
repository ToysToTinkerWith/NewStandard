const getHeader = (req, names) => {
  for (const name of names) {
    const value = req.headers[name]

    if (Array.isArray(value) && value[0]) {
      return value[0]
    }

    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }
  }

  return ""
}

const decodeHeaderValue = (value) => {
  if (!value) {
    return ""
  }

  try {
    return decodeURIComponent(value.replace(/\+/g, " "))
  } catch {
    return value
  }
}

export default function visitorLocation(req, res) {
  const country = getHeader(req, [
    "x-appengine-country",
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-country-code",
  ]).toUpperCase()

  const region = decodeHeaderValue(
    getHeader(req, [
      "x-appengine-region",
      "x-vercel-ip-country-region",
      "x-region-code",
    ])
  )

  const city = decodeHeaderValue(
    getHeader(req, ["x-appengine-city", "x-vercel-ip-city", "x-city"])
  )

  const cityLatLong = getHeader(req, [
    "x-appengine-citylatlong",
    "x-vercel-ip-city-lat-long",
  ])

  const hasServerGeo = Boolean(country || region || city || cityLatLong)

  res.setHeader("Cache-Control", "no-store, max-age=0")
  res.status(200).json({
    country: country || null,
    region: region || null,
    city: city || null,
    cityLatLong: cityLatLong || null,
    hasServerGeo,
    source: hasServerGeo ? "request_headers" : "client_context",
  })
}
