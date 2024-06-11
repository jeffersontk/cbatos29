import { sanityClient } from "sanity:client"

export async function postIntentionToEnrollEBD(formData) {
  try {
    const response = await sanityClient.create(formData)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}
