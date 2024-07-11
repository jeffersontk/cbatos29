import { sanityClient } from "sanity:client"

export async function getCarouselImages() {
  const carousel = await sanityClient.fetch(`*[_type == "carousel"][0]`)
  return carousel
}

export async function getHomeCelula() {
  const homeCelula = await sanityClient.fetch(`*[_type == "homeCelula"][0]`)
  return homeCelula
}

export async function getHomeOffer() {
  const offer = await sanityClient.fetch(`*[_type == "offer"][0]`)
  return offer
}

export async function getEventsPage() {
  const eventsPage = await sanityClient.fetch(`*[_type == "eventsPage"][0]`)
  return eventsPage
}

export async function getEvents() {
  const events = await sanityClient.fetch(`*[_type == "events"]`)
  return events
}

export async function getEventbyId(eventId) {
  const query = `*[_type == "events" && _id == $eventId][0]`
  const params = { eventId }
  const events = await sanityClient.fetch(query, params)
  return events
}

export async function getCells(search) {
  let queryString = `*[_type == "cells"]`
  if (search) {
    queryString = `*[_type == "cells" && (title match "*${search}*" || 
    leader1.name match "*${search}*" ||
    leader2.name match "*${search}*")]`
  }
  const cells = await sanityClient.fetch(queryString)
  return cells
}

export async function getWeHistory() {
  const weHistory = await sanityClient.fetch(`*[_type == "WeHistory"][0]`)
  return weHistory
}

export async function getPastoralTeam() {
  const pastoralTeam = await sanityClient.fetch(`*[_type == "pastoralTeam"][0]`)
  return pastoralTeam
}

export async function getMinistry() {
  const pastoralTeam = await sanityClient.fetch(`*[_type == "ministry"][0]`)
  return pastoralTeam
}

export async function getTestimony() {
  const pastoralTeam = await sanityClient.fetch(`*[_type == "testimony"]`)
  return pastoralTeam
}
