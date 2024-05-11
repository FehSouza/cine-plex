export const optionsOneHour = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
  next: { revalidate: 3600 },
}

export const optionsOneDay = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
  next: { revalidate: 86400 },
}
