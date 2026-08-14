export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

const canUseGtag = () =>
  typeof window !== "undefined" && Boolean(GA_TRACKING_ID) && Boolean(window.gtag)

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (!canUseGtag()) {
    return
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, params = {} }) => {
  if (!canUseGtag()) {
    return
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    ...params,
  })
}

export const trackVisitorLocationContext = async () => {
  if (!canUseGtag()) {
    return
  }

  const sessionKey = "newstandard_location_context_sent"

  try {
    if (sessionStorage.getItem(sessionKey) === "1") {
      return
    }
  } catch {}

  const clientContext = {
    visitor_timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown",
    visitor_locale: navigator.language || "unknown",
    visitor_languages: Array.isArray(navigator.languages)
      ? navigator.languages.slice(0, 5).join(",")
      : navigator.language || "unknown",
  }

  let serverContext = {}

  try {
    const response = await fetch("/api/visitorLocation", {
      cache: "no-store",
    })

    if (response.ok) {
      serverContext = await response.json()
    }
  } catch {}

  const locationContext = {
    ...clientContext,
    visitor_country: serverContext.country || "unknown",
    visitor_region: serverContext.region || "unknown",
    visitor_city: serverContext.city || "unknown",
    visitor_geo_source: serverContext.source || "client_context",
    visitor_has_server_geo: serverContext.hasServerGeo ? "yes" : "no",
  }

  event({
    action: "visitor_location_context",
    category: "analytics",
    label: locationContext.visitor_timezone,
    params: locationContext,
  })

  try {
    sessionStorage.setItem(sessionKey, "1")
  } catch {}
}
