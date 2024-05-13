import { sanityClient } from "sanity:client";


export async function getCarouselImages(){
    const carousel = await sanityClient.fetch(`*[_type == "carousel"][0]`);
    return carousel
}
export async function getHomeCelula(){
    const homeCelula = await sanityClient.fetch(`*[_type == "homeCelula"][0]`);
    return homeCelula
}
export async function getHomeOffer(){
    const offer = await sanityClient.fetch(`*[_type == "offer"][0]`);
    return offer
}
export async function getCells(search) {
    let queryString = `*[_type == "cells"]`;
    if (search) {
        queryString = `*[_type == "cells" && (title match "*${search}*" || leader1.name match "*${search}*" || leader2.name match "*${search}*")]`;

    }
    const cells = await sanityClient.fetch(queryString);
    return cells;
}
